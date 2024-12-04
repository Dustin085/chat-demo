import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ILayoutSwitch {
    currentLayout: "mobile" | "desktop"
}

// Define the initial state using that type
const initialState: ILayoutSwitch = {
    currentLayout: "mobile",
};

export const layoutSwitch = createSlice(
    {
        name: "layoutSwitch",
        initialState,
        reducers: {
            // payload裡面的type為IPanelSwitch.value
            updateState: (state, action: PayloadAction<ILayoutSwitch["currentLayout"]>) => {
                state.currentLayout = action.payload;
            }
        }
    }
);

export const { updateState } = layoutSwitch.actions;

export default layoutSwitch.reducer;