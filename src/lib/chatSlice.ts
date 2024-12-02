import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData } from "./userSlice";

// Define a type for the slice state
interface IChatState {
    chatId: string | null,
    chatData: IChatData | null,
    receiverId: string | null,
    receiverData: IUserData | null,
    isLoadingChatData: boolean,
};

export interface IMessage {
    // TODO
    createdAt: string,
    senderId: string,
    text: string,
    imgUrl?: string,
};

export interface IChatData {
    createdAt: number,
    messages: Array<IMessage>,
};

// Define the initial state using that type
const initialState: IChatState = {
    chatId: null,
    chatData: null,
    receiverId: null,
    receiverData: null,
    isLoadingChatData: false,
};

export const chatSlice = createSlice(
    {
        name: "chat",
        initialState,
        reducers: {
            updateChatData: (state, action: PayloadAction<IChatData>) => {
                state.chatData = action.payload;
            },
            updateChatId: (state, action: PayloadAction<string>) => {
                state.chatId = action.payload;
            },
            updateReceiverId: (state, action: PayloadAction<string>) => {
                state.receiverId = action.payload;
            },
            updateReceiverData: (state, action: PayloadAction<IUserData>) => {
                state.receiverData = action.payload;
            },
        }
    }
)

export default chatSlice.reducer;