// components
import ChatListPanel from '../components/chatListPenel/ChatListPanel';
import ChatRoom from '../components/chatRoom/ChatRoom';
import DetailPanel from '../components/detailPanel/DetailPanel';

// customHooks
import { useAppSelector } from '../customHook/reduxTypedHooks';

function MobileLayout() {

    const panelSwitch = useAppSelector(state => state.panelSwitch.value);

    return (
        <div className="row h-100">
            <div className="col-12 h-100">
                {panelSwitch === "chatListPanel" && < ChatListPanel />}
                {panelSwitch === "chatRoomPanel" && <ChatRoom />}
                {panelSwitch === "detailPanel" && <DetailPanel />}
            </div>
        </div>
    );
}

export default MobileLayout;