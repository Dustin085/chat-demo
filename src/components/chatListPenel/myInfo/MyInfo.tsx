// import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useAppSelector } from "../../../customHook/reduxTypedHooks";
import "./myInfo.scss";
import { auth } from "../../../lib/firebase";
import { toast } from "react-toastify";

/**
 * 顯示使用者資料的區塊，組件內含一個下拉式選單裡面有登出按鈕
 * @returns - react component
 */
function MyInfo() {

    /**
     * @property { string } userName - 從資料庫取得的currentUserData裡面擷取出來的userName(使用者名稱)
     */
    const userName = useAppSelector((state) => {
        if (state.user.currentUserData) {
            return state.user.currentUserData.userName;
        }
    });

    /**
     * 處理登出，登出成功或登出錯誤時會跳出通知
     * @param ev - 點擊事件
     */
    const handleLogOut = (ev: React.MouseEvent) => {
        ev.preventDefault();
        auth.signOut()
            .then(() => {
                toast.success("登出成功");
            })
            .catch((error) => {
                console.log(error);
                if (error instanceof Error) {
                    toast.error(error.message);
                }
            });
    }

    return (
        <div className="my-info">
            <picture className="user-avatar">
                <img src={import.meta.env.VITE_USER_DEFAULT_AVATAR_URL} alt="" />
            </picture>
            <h4 className="user-name">{userName}</h4>
            <div className="btn-box">
                <Dropdown>
                    <Dropdown.Toggle id="dropdown-basic" variant="secondary" >
                        <img src="./more.svg" alt="" style={{ rotate: "90deg", widows: "60%", height: "60%" }} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item as="button" disabled={true}>修改使用者資料</Dropdown.Item>
                        <Dropdown.Item as="button" className="log-out-btn" onClick={handleLogOut}>登出</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/* <button className="btn">
                    <img src="/more.png" alt="" />
                </button> */}
                <button className="btn">
                    <img src="./edit.png" alt="" />
                </button>
            </div>
        </div>
    );
}

export default MyInfo;