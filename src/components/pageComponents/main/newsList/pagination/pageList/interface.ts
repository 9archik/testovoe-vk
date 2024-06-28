export interface IPageList{
    countPages: number;
    onClickBtn: (num: number) => void
    activePage: number;
}