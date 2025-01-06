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

/**
 * 利用userUid來取得userData，若userUid為falsy，則回傳null，回傳的資料使用方式請見下方的userSlice裡面的extraReducers
 * @param { string | undefined } userUid - user的uid，可利用firebase提供的onAuthStateChanged來取得，若為undefined視為未登入
 * @returns { IUserData | null } - user的資料，userUid為undefined的情況下會回傳null
 */
export const fetchUserDataById = createAsyncThunk(
    "users/fetchUserDataById",
    async (userUid: string | undefined, thunkAPI) => {
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
/**
 * @property { IUserData | null } currentUserData - 現在登入者的資料，若為null則代表未登入
 * @property { boolean } isLoadingUserData - 用來確認現在是否正在載入userData，true => loading, false => not loading
 */
const initialState: IUserState = {
    currentUserData: null,
    isLoadingUserData: false,
};

// createSlice
// https://redux-toolkit.js.org/api/createSlice
/**
 * extraReducers裡面有fetchUserDataById成功(fulfilled)時、pending時、rejected時要執行的函式
 * 成功時會把回傳值放入state.currentUserData
 */
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