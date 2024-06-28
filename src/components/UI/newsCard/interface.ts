export interface INewsCard {
    header: string;
    date: string;
    author: string;
    onClick: () => void;
    rating: number;
}