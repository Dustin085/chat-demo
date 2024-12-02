import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import "./inputArea.scss";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useAppSelector } from "../../../customHook/reduxTypedHooks";

function InputArea() {

    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [inputText, setInputText] = useState("");

    const emojiClickHandler = (ev: { emoji: string }) => {
        setInputText(prevState => { return prevState + ev.emoji });
    };

    const chatId = useAppSelector(state => state.chat.chatId);
    const currentUser = useAppSelector(state => state.user.currentUserData);
    const receiverId = useAppSelector(state => state.chat.receiverId) as string;

    const handleSendMessage = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (inputText === "") return;
        if (!chatId) return;
        if (!currentUser) return;

        try {
            // 建立新的message物件到chat
            await updateDoc(doc(db, "chats", chatId), {
                messages: arrayUnion({
                    senderId: currentUser.id,
                    text: inputText,
                    createdAt: Date.now(),
                })
            });

            // 更新userChats的資料
            const updateUserChatsByUserId = async (userId: string) => {
                const userChatsRef = doc(db, "userChats", userId);
                const userChatSnapShot = await getDoc(userChatsRef);
                if (userChatSnapShot.exists()) {
                    const userChatsData = userChatSnapShot.data();

                    const chatIndex = userChatsData.chats.findIndex((chat: { chatId: string; }) => chat.chatId === chatId);
                    userChatsData.chats[chatIndex].lastMessage = inputText;
                    // currentUser傳出的，故在currentUser這邊是已讀(seen)狀態
                    userChatsData.chats[chatIndex].isSeen = userId === currentUser.id;
                    userChatsData.chats[chatIndex].updateAt = Date.now();
                    await updateDoc(userChatsRef, {
                        chats: userChatsData.chats,
                    });
                };
            };
            // 更新currentUser的userChats
            updateUserChatsByUserId(currentUser.id);
            // 更新對方的userChats
            updateUserChatsByUserId(receiverId);

        } catch (error) {
            console.log(error);
        } finally {
            // 清空文字
            setInputText("");
        }
    };

    return (
        <form action="" onSubmit={handleSendMessage}>

            <div className="input-area p-2 p-md-3">
                <button className="custom-btn"><img src="/img.png" alt="" /></button>
                <button className="custom-btn"><img src="/camera.png" alt="" /></button>
                <button className="custom-btn"><img src="/mic.png" alt="" /></button>
                <input
                    type="text"
                    className="form-control"
                    placeholder="請輸入訊息"
                    value={inputText}
                    onChange={ev => { setInputText(ev.target.value) }}

                />
                <div className="custom-btn emoji-btn"
                    onClick={() => { setIsEmojiPickerOpen((prevState) => !prevState) }}>
                    <img src="/emoji.png" alt="" />
                    <div className="emoji-picker">
                        <EmojiPicker
                            open={isEmojiPickerOpen}
                            onEmojiClick={emojiClickHandler}
                        />
                    </div>
                </div>
                <button className="btn btn-primary" >發送</button>
            </div>
        </form>
    );
}

export default InputArea;