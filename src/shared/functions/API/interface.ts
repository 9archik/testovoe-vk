export interface IActiveNewsItem {
	id: number;
	url?: string;
	title?: string;
	time?: number;
	by?: string;
	text?: string;
	descendants?: number;
	type?: string;
	score: number
}