import { useEffect, useRef } from "react";
import "./messageArea.scss";
import { useAppSelector } from "../../../customHook/reduxTypedHooks";
import { IMessage } from "../../../lib/chatSlice";
import { IUserData } from "../../../lib/userSlice";

function MessageArea() {

    const messageAreaEndLocation = useRef<HTMLDivElement | null>(null);
    const chatData = useAppSelector(state => state.chat.chatData);
    const currentUserData = useAppSelector(state => state.user.currentUserData) as IUserData;

    // 自動滾動至底
    useEffect(() => {
        if (messageAreaEndLocation.current) {
            messageAreaEndLocation.current.scrollIntoView({ behavior: "smooth" });
        };
    }, [chatData]);

    return (
        <div className="message-area pe-2">
            {
                chatData &&
                chatData.messages.map((message) => {
                    return <Message key={message.createdAt} data={message} fromWho={message.senderId === currentUserData.id ? "me" : "other"} />
                })
            }
            {/* 用來定位訊息區最尾端 */}
            <div className="end-location" ref={messageAreaEndLocation}></div>
        </div>
    );
}

function Message({ data, fromWho }: {
    data: IMessage,
    fromWho: "me" | "other"
}) {
    const { createdAt, text, imgUrl } = data;

    return (
        <>
            {fromWho === "other" && <MessageFromOther />}
            {fromWho === "me" && <MessageFromMe />}
        </>
    )

    function MessageFromOther() {
        return (
            <div className="message-item message-from-other">
                <picture className="user-avatar">
                    <img src={import.meta.env.VITE_USER_DEFAULT_AVATAR_URL} alt="" />
                </picture>
                <MessageBox />
            </div>
        )
    }

    function MessageFromMe() {
        return (
            <div className="message-item message-from-me">
                <MessageBox />
            </div>
        )
    }

    function MessageBox() {
        const covertTimeFromMsecToLocalString = (time: number): string => {
            let result = "";
            const createdAtDate = new Date(time);
            const nowTime = new Date();
            // 判斷是否是今天的訊息
            if (createdAtDate.getFullYear() === nowTime.getFullYear() &&
                createdAtDate.getMonth() === nowTime.getMonth() &&
                createdAtDate.getDate() === nowTime.getDate()) {
                result = `今天 ${createdAtDate.toLocaleTimeString(undefined, { timeStyle: "short" })}`;
            } else {
                // 如果是同一年就不顯示年份
                if (createdAtDate.getFullYear() === nowTime.getFullYear()) {
                    result = new Date(time).toLocaleString(undefined, {
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                    });
                } else {
                    result = new Date(time).toLocaleDateString(undefined, { dateStyle: "short", timeStyle: "short" })
                }
            };
            return result;
        };
        const stringTime = covertTimeFromMsecToLocalString(Number(createdAt));
        return (
            <div className="message-box">
                {imgUrl && <picture className="picture"><img src={imgUrl} alt="" /></picture>}
                <div className="message">{text}</div>
                <small className="time text-muted">{stringTime}</small>
            </div>
        )
    }
}

export default MessageArea;