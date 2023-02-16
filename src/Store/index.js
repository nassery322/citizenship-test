import { configureStore } from '@reduxjs/toolkit';

import testSlice from './testSlice';


const store = configureStore({
  reducer: { tests: testSlice },
});

export default store;
