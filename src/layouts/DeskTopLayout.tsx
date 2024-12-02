// components
import ChatListPanel from '../components/chatListPenel/ChatListPanel';
import ChatRoom from '../components/chatRoom/ChatRoom';
import DetailPanel from '../components/detailPanel/DetailPanel';

function DeskTopLayout() {
    return (
        <div className="row h-100">
            <div className="col-3 h-100"><ChatListPanel /></div>
            <div className="col-6 h-100"><ChatRoom /></div>
            <div className="col-3 h-100"><DetailPanel /></div>
        </div>
    );
}

export default DeskTopLayout;