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


    const demoMesFromOther = {
        avatarUrl: "/avatar.png",
        message: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero harum exercitationem obcaecati voluptatem dolorum aperiam quia excepturi totam quam consequatur magnam, ab aliquam unde quidem illum, nam quos, suscipit debitis?",
        time: "50分鐘之前"
    };

    const demoMesFromMe = {
        message: "Hello World. Nice to meet you too.",
        time: "50分鐘之前"
    };

    const demoMesFromOtherWithImg = {
        avatarUrl: "/avatar.png",
        message: "Look, a picture!",
        imgUrl: "/defaultUserAvatar.jpg",
        time: "50分鐘之前"
    };

    const demoMesFromMeWithImg = {
        message: "Look, the same picture!",
        imgUrl: "/defaultUserAvatar.jpg",
        time: "50分鐘之前"
    }

    return (
        <div className="message-area pe-2">
            {/* <div className="message-item message-from-other">
                <picture className="user-avatar">
                    <img src="/avatar.png" alt="" />
                </picture>
                <div className="message-box">
                    <div className="message">
                        Hello World. You are great!
                    </div>
                    <small className="time text-muted">48分鐘之前</small>
                </div>
            </div> */}
            {
                chatData &&
                chatData.messages.map((message) => {
                    return <Message key={message.createdAt} data={message} fromWho={message.senderId === currentUserData.id ? "me" : "other"} />
                })
            }
            {/* <Message data={demoMesFromOther} fromWho="other" />
            <Message data={demoMesFromMe} fromWho="me" />
            <Message data={demoMesFromOther} fromWho="other" />
            <Message data={demoMesFromMe} fromWho="me" />
            <Message data={demoMesFromOther} fromWho="other" />
            <Message data={demoMesFromMe} fromWho="me" />
            <Message data={demoMesFromOther} fromWho="other" />
            <Message data={demoMesFromMe} fromWho="me" />
            <Message data={demoMesFromOtherWithImg} fromWho="other" />
            <Message data={demoMesFromMeWithImg} fromWho="me" /> */}
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
        return (
            <div className="message-box">
                {imgUrl && <picture className="picture"><img src={imgUrl} alt="" /></picture>}
                <div className="message">{text}</div>
                <small className="time text-muted">{createdAt}</small>
            </div>
        )
    }
}

export default MessageArea;