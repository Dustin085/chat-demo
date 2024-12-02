import "./chatListPanel.scss";

// component
import ChatList from "./chatList/ChatList";
import MyInfo from "./myInfo/MyInfo";
import Searchbar from "./searchbar/Searchbar";

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