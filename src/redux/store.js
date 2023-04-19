import { configureStore } from '@reduxjs/toolkit';
import visReducer from './visualizationsSlice'
import topicReducer from './topicModelling'
export default configureStore({
  reducer: {
    vis:visReducer,
    topic:topicReducer
  },
});