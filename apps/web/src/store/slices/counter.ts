import { createSlice } from '@reduxjs/toolkit';

type CounterState = {
  value: number;
};

const initialState = {
  value: 0,
} as CounterState;

const counter = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    reset: () => initialState,
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement, reset } = counter.actions;
export default counter.reducer;
