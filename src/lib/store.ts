import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import chatReducer from './chatSlice';
import panelSwitchReducer from './panelSwitchSlice';
import layoutSwitchReducer from './layoutSwitchSlice';


const store = configureStore({
    reducer: {
        user: userReducer,
        panelSwitch: panelSwitchReducer,
        chat: chatReducer,
        layoutSwitch: layoutSwitchReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;