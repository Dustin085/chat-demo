import DeskTopLayout from "./DeskTopLayout";
import MobileLayout from "./MobileLayout";
import LoginPanel from "../components/loginPanel/LoginPanel";
import { useAppSelector } from "../customHook/reduxTypedHooks";

// interface
import { ReactElement } from "react";

/**
 * ChatApp的主體組件，依照不同情況return不同組件，未登入時顯示登入面板，已登入時依照currentLayout去決定使用的RWD模式
 * @returns - react component
 */
function ChatAppLayout() {

    /**
     * @property { "mobile" | "desktop" } currentLayout - 從redux取得的state，用來表示現在要使用的layout
     * @property { IUserData | null } currentUserData - 現在登入的使用者的資料，若為null代表未登入
     * @property { boolean } isLoadingUserData - 代表現在是否在載入使用者資料
     * 
     * @property { ReactElement | null } rwdLayout - 現在應該要使用的layout component
     */
    const currentLayout = useAppSelector(state => state.layoutSwitch.currentLayout);
    const currentUserData = useAppSelector((state) => state.user.currentUserData);
    const isLoadingUserData = useAppSelector((state) => state.user.isLoadingUserData);

    let rwdLayout: ReactElement | null = null;
    if (currentLayout === "desktop") {
        rwdLayout = <DeskTopLayout />
    } else if (currentLayout === "mobile") {
        rwdLayout = <MobileLayout />
    };

    // 如果正在Loading
    if (isLoadingUserData) {
        return <LoadingUserData />;
    };

    return (
        <>
            {currentUserData ? rwdLayout : <LoginPanel />}
        </>
    );

    /**
     * 用來顯示正在loading使用者資料的組件
     * @returns - react component
     */
    function LoadingUserData() {
        return (
            <div className="h-100" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h2>Loading User Data...</h2>
            </div>
        )
    }
}

export default ChatAppLayout;