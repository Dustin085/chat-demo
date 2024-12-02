import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPanelSwitch {
    value: "chatListPanel" | "chatRoomPanel" | "detailPanel"
}

// Define the initial state using that type
const initialState: IPanelSwitch = {
    value: "chatListPanel"
};

export const panelSwitch = createSlice(
    {
        name: "panelSwitch",
        initialState,
        reducers: {
            // payload裡面的type為IPanelSwitch.value
            updateState: (state, action: PayloadAction<IPanelSwitch["value"]>) => {
                state.value = action.payload;
            }
        }
    }
);

export const { updateState } = panelSwitch.actions;

export default panelSwitch.reducer;