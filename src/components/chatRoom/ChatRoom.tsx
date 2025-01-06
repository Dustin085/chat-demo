import { useEffect } from "react";
import "./chatRoom.scss";

// redux toolkits
import { chatSlice, IChatData } from "../../lib/chatSlice";

// firebase
import { doc, getDoc, onSnapshot, query } from "firebase/firestore";
import { db } from "../../lib/firebase";

// component
import UserInfo from "./userInfo/UserInfo";
import MessageArea from "./messageArea/MessageArea";
import InputArea from "./inputArea/InputArea";

// custom hooks
import { useAppDispatch, useAppSelector } from "../../customHook/reduxTypedHooks";

// interface
import { IUserData } from "../../lib/userSlice";

/**
 * 聊天室主體，包含一個輸入框、聊天訊息區還有對方的資料
 * @returns - react component
 */
function ChatRoom() {

    const chatId = useAppSelector(state => state.chat.chatId);
    const currentUserData = useAppSelector(state => state.user.currentUserData) as IUserData;
    const dispatch = useAppDispatch();

    // 取得聊天訊息
    useEffect(() => {
        if (chatId) {
            /**
             * 取得對方(聊天對象)的資料
             */
            const getReceiverData = async () => {
                const userChatsRef = doc(db, "userChats", currentUserData.id as string);
                const userChatsSnapShot = await getDoc(userChatsRef);
                if (userChatsSnapShot.exists()) {
                    const userChatsData = userChatsSnapShot.data();

                    const chatIndex = userChatsData.chats.findIndex((chat: { chatId: string; }) => chat.chatId === chatId);
                    const receiverId = userChatsData.chats[chatIndex].receiverId;

                    const userRef = doc(db, "users", receiverId);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        dispatch(chatSlice.actions.updateReceiverData(userSnap.data() as IUserData));
                    };
                    dispatch(chatSlice.actions.updateReceiverId(userChatsData.chats[chatIndex].receiverId as string));
                }
            };
            getReceiverData();

            /**
             * 監聽資料庫的聊天室資料，已達到即時改變聊天訊息
             */
            const unSub = onSnapshot(
                doc(db, "chats", chatId),
                (res) => {
                    dispatch(chatSlice.actions.updateChatData(res.data() as IChatData));
                    // console.log(res.data());
                });

            return () => {
                unSub();
            };
        };
    }, [chatId]);

    if (!chatId) {
        return (
            <div className="chat-room-box" style={{ alignItems: "center", justifyContent: "center" }}>
                <h2>請選擇聊天室</h2>
            </div>
        )
    }

    return (
        <div className="chat-room-box">
            <UserInfo />
            <MessageArea />
            <InputArea />
        </div>
    );
}

export default ChatRoom;