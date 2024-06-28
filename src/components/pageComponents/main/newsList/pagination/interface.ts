export interface IPagination {
    onClickPrev: () => void
    onClickNext: () => void;
    onClickNum: (num: number) => void
    countPages: number;
    activePage: number;
}