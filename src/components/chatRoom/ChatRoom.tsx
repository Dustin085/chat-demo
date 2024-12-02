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


function ChatRoom() {

    const chatId = useAppSelector(state => state.chat.chatId);
    const currentUserData = useAppSelector(state => state.user.currentUserData) as IUserData;
    const dispatch = useAppDispatch();

    // 取得聊天訊息
    useEffect(() => {
        if (chatId) {
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

            const unSub = onSnapshot(
                doc(db, "chats", chatId),
                (res) => {
                    // 現在似乎會不正常的觸發好幾次，似乎只是開發工具重播時的影響，有待觀察
                    dispatch(chatSlice.actions.updateChatData(res.data() as IChatData));
                    // console.log(res.data());
                });

            return () => {
                unSub();
            };
        };
    }, [chatId]);

    return (
        <div className="chat-room-box">
            <UserInfo />
            <MessageArea />
            <InputArea />
        </div>
    );
}

export default ChatRoom;