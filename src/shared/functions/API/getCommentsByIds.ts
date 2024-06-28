import { ICommentListItemAPI } from "../../../components/pageComponents/newsItem/comments/commentItem/commentBlock";

export async function getCommentsByIds(commentIds: number[]) {
	const comments: ICommentListItemAPI[] = [];

	await Promise.all(
		commentIds.map(async (commentId) => {
			try {
				const response = await fetch(
					`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`,
				);
				const commentData = await response.json();

                console.log('comment', commentData)

				if (commentData?.deleted) {
					comments.push({
						deleted: true,
						kids: commentData?.kids && Array.isArray(commentData?.kids) ? commentData?.kids : null,
						id: commentData?.id,
					});
				} else {
					comments.push({
						text: commentData.text,
						by: commentData.by,
						time: commentData.time,
						kids: commentData?.kids && Array.isArray(commentData?.kids) ? commentData?.kids : null,
						id: commentData?.id,
						deleted: false,
					});
				}
			} catch (error) {
				console.error(`Ошибка при получении комментария ${commentId}:`, error);
				return null;
			}
		}),
	);

	return comments;
}

export async function getComments(articleId: number) {
	const comments: ICommentListItemAPI[] = [];

	try {
		const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${articleId}.json`)
			.then()
			.catch();
		if (response.ok) {
			const articleData = await response.json();

			

			if (articleData.kids) {
				await Promise.all(
					articleData.kids.map(async (commentId: number) => {
						const commentResponse = await fetch(
							`https://hacker-news.firebaseio.com/v0/item/${commentId}.json`,
						);
						const commentData = await commentResponse.json();
                        
          

						if (commentData?.deleted) {
							comments.push({
								deleted: true,
								kids:
									commentData?.kids && Array.isArray(commentData?.kids) ? commentData?.kids : null,
								id: commentData?.id,
							});
						} else {
							comments.push({
								text: commentData.text,
								by: commentData.by,
								time: commentData.time,
								kids:
									commentData?.kids && Array.isArray(commentData?.kids) ? commentData?.kids : null,
								id: commentData?.id,
								deleted: false,
                                score: commentData?.score,
                             
							});
						}
					}),
				);
			}

			return comments;
		} else {
			if (response.status >= 500) {
				const error = new Error();
				error.name = 'server_error';
				throw error;
			}
		}
	} catch (error) {
		const err = new Error();
		err.name = 'err_connection';
		throw err;
	}
}
