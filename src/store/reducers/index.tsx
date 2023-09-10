import { createSlice } from "@reduxjs/toolkit";
import data from '../data/celebrities.json';
const SelectedItem = createSlice({
    name: "selectedItem",
    initialState: { id: -1, editingItem: null},
    reducers: {
        setSelectedItem(state, action) {
            state.id = action.payload.id;
        },
        editingItem(state, action) {
            state.editingItem = action.payload.id;
        }
    }
})
const UserSlice = createSlice({
    name: "user",
    initialState: data,
    reducers: {
        update(state, action) {
            return state = action.payload.data;
        },
        delete(state, action) {
            return state = action.payload.data;
        }
    }
});
export { SelectedItem, UserSlice};