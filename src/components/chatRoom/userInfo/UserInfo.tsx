import "./userInfo.scss";
import { useAppDispatch, useAppSelector } from "../../../customHook/reduxTypedHooks";
import { panelSwitch } from "../../../lib/panelSwitchSlice";


function UserInfo() {

    const currentLayout = useAppSelector(state => state.layoutSwitch.currentLayout);
    const receiverData = useAppSelector(state => state.chat.receiverData);
    const dispatch = useAppDispatch();

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