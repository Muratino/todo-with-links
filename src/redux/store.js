import { configureStore } from '@reduxjs/toolkit'
import todo from './Slice/todo';
import links from './Slice/links';

export const store = configureStore({
  reducer: {
    todo,
    links
  },
})