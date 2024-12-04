import DeskTopLayout from "./DeskTopLayout";
import MobileLayout from "./MobileLayout";
import LoginPanel from "../components/loginPanel/LoginPanel";
import { useAppSelector } from "../customHook/reduxTypedHooks";

// interface
import { ReactElement } from "react";

function ChatAppLayout() {

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

    function LoadingUserData() {
        return (
            <div className="h-100" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h2>Loading User Data...</h2>
            </div>
        )
    }
}

export default ChatAppLayout;