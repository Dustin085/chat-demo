import "./chatListPanel.scss";

// component
import ChatList from "./chatList/ChatList";
import MyInfo from "./myInfo/MyInfo";
import Searchbar from "./searchbar/Searchbar";

/**
 * 聊天室列表面板，有顯示使用者自己資料的區塊(MyInfo)、搜尋其他使用者的區塊(Searchbar)和之前建立的聊天室(ChatList)
 * @returns - react component
 */
function ChatListPanel() {
    return (
        <div className="chat-list-panel h-100">
            <MyInfo />
            <Searchbar />
            <ChatList />
        </div>
    );
}

export default ChatListPanel;