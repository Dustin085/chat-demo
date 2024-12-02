import { useEffect, useState } from "react";
import "./chatList.scss";

// firebase
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { IUserData } from "../../../lib/userSlice";

// custom hooks
import { useAppDispatch, useAppSelector } from "../../../customHook/reduxTypedHooks";
import { chatSlice } from "../../../lib/chatSlice";
import { panelSwitch } from "../../../lib/panelSwitchSlice";

type ChatListItem = {
    user?: IUserData,
    isSeen?: Boolean,
    chatId: string,
    receiverId: string,
    lastMessage: string,
    updateAt: Date
};

function ChatList() {

    const demoList = [
        {
            id: 1,
            avatarUrl: "/avatar.png",
            name: "Cool Guy",
            lastMessage: "Hello World. I like your app."
        },
        {
            id: 2,
            avatarUrl: "/avatar.png",
            name: "Cool Guy",
            lastMessage: "Hello World"
        },
        {
            id: 3,
            avatarUrl: "/avatar.png",
            name: "Cool Guy",
            lastMessage: "Hello World"
        },
        {
            id: 4,
            avatarUrl: "/avatar.png",
            name: "Cool Guy",
            lastMessage: "Hello World"
        },
        {
            id: 5,
            avatarUrl: "/avatar.png",
            name: "Cool Guy",
            lastMessage: "Hello World"
        },
        {
            id: 6,
            avatarUrl: "/avatar.png",
            name: "Cool Guy",
            lastMessage: "Hello World"
        },
        {
            id: 7,
            avatarUrl: "/avatar.png",
            name: "Cool Guy",
            lastMessage: "Hello World"
        },
        {
            id: 8,
            avatarUrl: "/avatar.png",
            name: "Cool Guy",
            lastMessage: "Hello World"
        },
        {
            id: 9,
            avatarUrl: "/avatar.png",
            name: "Cool Guy",
            lastMessage: "Hello World"
        },
        {
            id: 10,
            avatarUrl: "/avatar.png",
            name: "Cool Guy",
            lastMessage: "Hello World"
        }
    ]

    const [chatList, setChatList] = useState<Array<ChatListItem> | undefined>();

    const currentUser = useAppSelector(state => state.user.currentUserData) as IUserData;

    useEffect(() => {
        // 基本上currentUser一定存在才會到這個頁面
        if (!currentUser?.id) {
            return;
        }

        // 監聽，當資料發生改變時觸發callback function
        const unsub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
            // 紀錄回傳資料
            const resChatList = res.data()?.chats as Array<ChatListItem>;
            // 利用回傳資料中的receiverId來取得對方使用者的資料，並且加入到一開始取得的資料裡
            const promise = resChatList.map(async (item: ChatListItem) => {
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data() as IUserData;

                return { ...item, user };
            });
            // 等待全部的promise解析
            const chatData = await Promise.all(promise);
            // 設定state
            setChatList(chatData);
        });

        // 解除監聽
        return () => {
            unsub();
        }
    }, [currentUser?.id]);


    return (
        <div className="chat-list">
            {
                chatList?.map((data) => {
                    return <ChatListItem key={data.receiverId} data={data} />
                })
            }
        </div>
    );


    function ChatListItem({ data }: { data: ChatListItem }) {
        const { lastMessage, chatId, isSeen = true } = data;

        const dispatch = useAppDispatch();

        const handleChatSelect = async () => {
            // 將isSeen改成true
            if (chatList) {
                // 將資料還原成只有userChats的狀態
                const userChats = chatList.map(item => {
                    const { user, ...rest } = item;
                    return rest;
                });
                const chatIndex = userChats.findIndex(item => item.chatId === chatId);
                userChats[chatIndex].isSeen = true;
                const userChatsRef = doc(db, "userChats", currentUser.id);
                try {
                    await updateDoc(userChatsRef, {
                        chats: userChats,
                    });
                    dispatch(chatSlice.actions.updateChatId(chatId));
                    dispatch(panelSwitch.actions.updateState("chatRoomPanel"));
                } catch (error) {
                    console.log(error);
                }
            };
        };

        return (
            <div className="chat-list-item p-2" onClick={() => { handleChatSelect() }} style={{ backgroundColor: isSeen === true ? "transparent" : "rgba(111, 134, 236, 0.75)" }}>
                <picture className="user-avatar">
                    <img src={import.meta.env.VITE_USER_DEFAULT_AVATAR_URL} alt="" />
                </picture>
                <div className="message-content">
                    <h5 className="user-name">{data.user?.userName}</h5>
                    <p className="last-message text-muted">{lastMessage || "暫無聊天訊息"}</p>
                </div>
            </div >
        )
    }
}



export default ChatList;