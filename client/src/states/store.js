import { configureStore, combineReducers } from '@reduxjs/toolkit';
import genderReducer from './state';
import { cartQtySlice } from './state';

const rootReducer = combineReducers({
    gender: genderReducer,
    cartQty: cartQtySlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
