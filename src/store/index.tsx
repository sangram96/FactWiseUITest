import { configureStore } from "@reduxjs/toolkit";
import { UserSlice, SelectedItem } from "./reducers";
const store = configureStore({
    reducer: {
        userReducer: UserSlice.reducer,
        selectedItem: SelectedItem.reducer,
    }
});
export default store;