import { createSlice } from '@reduxjs/toolkit';

interface ExpensesState {
    page: number;
    limit: number;
}

const initialState: ExpensesState = {
    page: 1,
    limit: 10,
};

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        incrementPage(state, action) {
            state.page  = action.payload;
        },
    },
});

export const { incrementPage } = expensesSlice.actions;
export default expensesSlice.reducer;
