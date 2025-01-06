// components
import ChatListPanel from '../components/chatListPenel/ChatListPanel';
import ChatRoom from '../components/chatRoom/ChatRoom';
import DetailPanel from '../components/detailPanel/DetailPanel';

// customHooks
import { useAppSelector } from '../customHook/reduxTypedHooks';

/**
 * 手機板的layout組件，會依照panelSwitch來切換面板，分別是聊天室列表(ChatListPanel)、聊天室本體(ChatRoom)還有詳情面板(DetailPanel)
 * @returns react component
 */
function MobileLayout() {

    /**
     * @property { "chatListPanel" | "chatRoomPanel" | "detailPanel" } panelSwitch - 不同面板的切換依據
     */
    const panelSwitch = useAppSelector(state => state.panelSwitch.value);

    return (
        <div className="row h-100">
            <div className="col-12 h-100">
                {panelSwitch === "chatListPanel" && <ChatListPanel />}
                {panelSwitch === "chatRoomPanel" && <ChatRoom />}
                {panelSwitch === "detailPanel" && <DetailPanel />}
            </div>
        </div>
    );
}

export default MobileLayout;