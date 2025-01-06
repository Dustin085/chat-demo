import "./userInfo.scss";
import { useAppDispatch, useAppSelector } from "../../../customHook/reduxTypedHooks";
import { panelSwitch } from "../../../lib/panelSwitchSlice";

/**
 * 顯示對方的資料，此外在手機板會有一個返回按鍵，可返回至聊天室清單
 * @returns - react component
 */
function UserInfo() {

    /**
     * @property { "mobile" | "desktop" } currentLayout - 從redux取得的state，用來表示現在要使用的layout
     * @property { IUserData } receiverData - 對方的使用者資料
     */
    const currentLayout = useAppSelector(state => state.layoutSwitch.currentLayout);
    const receiverData = useAppSelector(state => state.chat.receiverData);
    const dispatch = useAppDispatch();

    /**
     * 返回聊天室清單
     */
    const handleBackToChatList = () => {
        dispatch(panelSwitch.actions.updateState("chatListPanel"));
    };

    return (
        <div className="user-info">
            {
                currentLayout === "mobile" &&
                <button className="back-to-chat-list-btn outline-secondary" onClick={() => { handleBackToChatList() }}>
                    <img src="./arrowDown.png" alt="" style={{ rotate: "90deg" }} />
                </button>
            }
            <div className="user-info-box">
                <picture className="user-avatar">
                    <img src={import.meta.env.VITE_USER_DEFAULT_AVATAR_URL} alt="" />
                </picture>
                <div className="user-name-box">
                    <h5 className="user-name">{receiverData && receiverData.userName}</h5>
                    <small className="user-status text-muted">狀態列尚未實裝</small>
                </div>
            </div>
            <div className="btn-box">
                <button className="btn">
                    <img src="./phone.png" alt="" />
                </button>
                <button className="btn">
                    <img src="./camera.png" alt="" />
                </button>
                <button className="btn">
                    <img src="./info.png" alt="" />
                </button>
            </div>
        </div >
    );
}

export default UserInfo;