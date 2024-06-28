import { INewsListSlice, ISetNewsAction } from "../../../redux/slices/newsList/interface";

export async function fetchStories(type: ISetNewsAction['type']): Promise<number[]> {
	try {
		const response = await fetch(`https://hacker-news.firebaseio.com/v0/${type}stories.json`)
			.then()
			.catch();
		if (response.ok) {
			const data = await response.json();
			return data
		} else {
			const error = new Error();

			if (response.status >= 500) {
				error.name = 'server_error';
			}
			throw error;
		}
	} catch (error) {
		const err = error as Error;

		if (err.message === 'Failed to fetch' || err.message.includes('NetworkError')) {
			err.name = 'err_connection';
			err.message = 'err_connection';

			throw err;
		}

		throw err;
	}
}

export async function fetchNewsDetails(storyIds: number[]): Promise<any> {
	const promises = storyIds.map((id) =>
		fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) => res.json()),
	);
	return Promise.all(promises);
}

export async function getNews(type: ISetNewsAction['type']) {
	try {
		const storyIds = await fetchStories(type);
		const newsDetails = await fetchNewsDetails(storyIds);
		return newsDetails;
	} catch (error) {
		const err = error as Error;
		throw err;
	}
}