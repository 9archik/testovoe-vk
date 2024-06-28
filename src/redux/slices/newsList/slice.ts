
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { INewsListSlice, ISetNewsAction } from "./interface";

const initialState: INewsListSlice = {
    filter: 'new',
    top: {
        loading: true,
        error: null,
        list: null,
    },
    best: {
        loading: true,
        error: null,
        list: null,
    },
    new: {
        loading: true,
        error: null,
        list: null,
    }
};


export const newsListSlice = createSlice({
  name: 'newsList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<'best' | 'new' | 'top'>) => {
      state.filter = action.payload
    },
    setNews: (state, action: PayloadAction<ISetNewsAction>) => {
        state[action.payload.type] = action.payload.state
    }
  },
})

export const {setFilter, setNews} = newsListSlice.actions

export default newsListSlice.reducer