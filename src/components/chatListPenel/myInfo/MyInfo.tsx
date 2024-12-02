// import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../customHook/reduxTypedHooks";
import "./myInfo.scss";
import { auth } from "../../../lib/firebase";
import { toast } from "react-toastify";

function MyInfo() {

    const userName = useAppSelector((state) => {
        if (state.user.currentUserData) {
            return state.user.currentUserData.userName;
        }
    });

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
                        <img src="/more.png" alt="" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item as="button"  disabled={true}>修改使用者資料</Dropdown.Item>
                        <Dropdown.Item as="button" className="log-out-btn" onClick={handleLogOut}>登出</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/* <button className="btn">
                    <img src="/more.png" alt="" />
                </button> */}
                <button className="btn">
                    <img src="/edit.png" alt="" />
                </button>
            </div>
        </div>
    );
}

export default MyInfo;