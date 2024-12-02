import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// firebase
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// toastify
import { toast } from 'react-toastify';

// create Thunk
// 參考文件
// https://redux-toolkit.js.org/api/createAsyncThunk
// https://vocus.cc/article/64ae5ad7fd8978000102017e
export const fetchUserDataById = createAsyncThunk(
    "users/fetchUserDataById",
    async (userUid: string, thunkAPI) => {
        if (!userUid) { return null };
        try {
            const docRef = doc(db, "users", userUid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                throw new Error("找不到使用者uid: " + userUid);
            };
        } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                toast.error(error.message);
            };
            return null;
        }
    }
);

// Define a type for the slice state
interface IUserState {
    // currentUser: User | null,
    currentUserData: IUserData | null,
    isLoadingUserData: boolean
};

export interface IUserData {
    id: string,
    block: Array<string>,
    email: string,
    userName: string
};

// Define the initial state using that type
const initialState: IUserState = {
    // currentUser: null,
    currentUserData: null,
    isLoadingUserData: false,
};

// createSlice
// https://redux-toolkit.js.org/api/createSlice
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // updateUser: (state, action: PayloadAction<{ currentUser: User | null }>) => {
        //     state.currentUser = action.payload.currentUser
        // },
    },
    extraReducers: (builder) => {
        builder.
            addCase(fetchUserDataById.fulfilled, (state, action) => {
                state.currentUserData = action.payload as IUserData;
                state.isLoadingUserData = false;
            }).addCase(fetchUserDataById.pending, (state) => {
                state.isLoadingUserData = true;
            }).addCase(fetchUserDataById.rejected, (state) => {
                state.isLoadingUserData = false;
            })
    }
});

// Action creators are generated for each case reducer function
// export const { updateUser } = userSlice.actions;

export default userSlice.reducer;

// TODO
// 1.找一個除了any(currentUserData)之外更好的type