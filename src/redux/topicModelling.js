import { createSlice } from "@reduxjs/toolkit";

export const topicSlice = createSlice({
  name: "topic",
  initialState: {
    loading: false,
    newTopics: null,
    oldTopics: null,
    fetchFailed: false,
  },
  reducers: {
    fetchFailed: (state) => {
      state.fetchFailed = true;
      state.loading = false;
      state.newTopics = null;
      state.oldTopics = null;
    },
    fetchStarted: (state) => {
      state.loading = true;
      state.fetchFailed = false;
      state.newTopics = null;
      state.oldTopics = null;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.fetchFailed = false;
      state.newTopics = action.payload.newTopics;
      state.oldTopics = action.payload.oldTopics;
    },
  },
});
export const { fetchFailed, fetchStarted, fetchSuccess } = topicSlice.actions;
export default topicSlice.reducer;
