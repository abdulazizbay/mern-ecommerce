import { createSlice } from '@reduxjs/toolkit';

// Gender Slice
const initialState = {
    gender: ["girls", "men"],
};

const genderSlice = createSlice({
    name: 'gender',
    initialState,
    reducers: {
        setGender: (state, action) => {
            state.gender = [action.payload];
        },
    },
});

export const { setGender } = genderSlice.actions;

export default genderSlice.reducer;




// Cart Quantity Slice
const initialStateCart = {
    cartQty: null
};

const cartQtySlice = createSlice({
    name: 'cartQty',
    initialState: initialStateCart, // Corrected the initialization here
    reducers: {
        setCartQty: (state, action) => {
            state.cartQty = action.payload;
        },
    },
});

export const { setCartQty } = cartQtySlice.actions;

export { cartQtySlice };
