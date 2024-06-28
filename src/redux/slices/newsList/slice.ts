
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { INewsListSlice } from "./interface";

const initialState: INewsListSlice = {
    filter: 'new',

};


export const newsListSlice = createSlice({
  name: 'newsList',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<'best' | 'new' | 'top'>) => {
      state.filter = action.payload
    },

  },
})

export const {setFilter} = newsListSlice.actions

export default newsListSlice.reducer