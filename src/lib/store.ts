import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import panelSwitchReducer from './panelSwitchSlice';
import chatReducer from './chatSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        panelSwitch: panelSwitchReducer,
        chat: chatReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;