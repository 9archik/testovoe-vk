import { INewsCard } from "../../../components/UI/newsCard/interface";
export interface INewsListState{
    loading: boolean,
    error: string | null;
    list: INewsCard[] | null
}
export interface INewsListSlice {
    filter: 'best' | 'new' | 'top',
    top: INewsListState,
    best: INewsListState,
    new: INewsListState,
}


export interface ISetNewsAction{
    type: INewsListSlice['filter'],
    state: INewsListState
}