import { useState } from "react";
import "./searchbar.scss";
import { Button, Form, Modal } from "react-bootstrap";

// firebase
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../lib/firebase";

// toast
import { toast } from "react-toastify";

// interface
import { IUserData } from "../../../lib/userSlice";

// custom hooks
import useInputData from "../../../customHook/useInputData";
import { useAppSelector } from "../../../customHook/reduxTypedHooks";

function Searchbar() {

    const demoUserList = [
        {
            id: "1",
            name: "Dustin",
            avatarUrl: "/avatar.png"
        },
        {
            id: "2",
            name: "Ninja",
            avatarUrl: "/avatar.png"
        }
    ];

    // 如果能夠執行到這裡currentUserData就一定存在(登入狀態)，故使用as(型別斷言)
    const currentUserData = useAppSelector(state => state.user.currentUserData) as IUserData;

    // 開關加入新使用者的彈出視窗
    const [showAddNewUserModal, setShowAddNewUserModal] = useState<boolean>(false);
    // 搜尋新使用者時的資料，之後使用api取得
    const [searchUserList, setSearchUserList] = useState<Array<IUserData> | null>(null);

    const handleShowModal = () => { setShowAddNewUserModal(true) };
    const handleCloseModal = () => { setShowAddNewUserModal(false) };

    const { inputs, handleInputChange } = useInputData({ searchUserName: "" });

    const handleSearchUser = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        try {
            // 取得collection
            const userRef = collection(db, "users");
            // 建立query，上面那行是必須要輸入的關鍵字與userName相同才會搜尋得到，下面那行只要前幾個字相同即可，firebase沒有提供搜尋資料庫的字串是否包含某字段的搜尋方式...
            // const q = query(userRef, where("userName", "==", inputs.searchUserName));
            const q = query(userRef, where("userName", ">=", inputs.searchUserName), where("userName", "<=", inputs.searchUserName + "\uf8ff"), where("id", "!=", currentUserData.id));
            // 執行query
            const querySnapShot = await getDocs(q);
            // 取用query結果
            if (!querySnapShot.empty) {
                const queryResult: IUserData[] = [];
                querySnapShot.forEach(doc => {
                    queryResult.push(doc.data() as IUserData);
                    // console.log(queryResult);
                });
                setSearchUserList(queryResult);
            } else {
                toast.warning("查無此使用者")
                setSearchUserList(null);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="searchbar-box">
            <input type="text" className="search-input form-control" placeholder="搜尋" />
            <button className="add-new-user-btn btn btn-outline-secondary" onClick={handleShowModal}>
                <img src="./plus.png" alt="" />
            </button>
            {/* 按下新增使用者按鈕後會出現的Modal */}
            <Modal show={showAddNewUserModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>加入新的使用者</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSearchUser}>
                        <div style={{ display: "flex", columnGap: "12px" }}>
                            <Form.Control
                                name="searchUserName"
                                value={inputs.searchUserName}
                                onChange={handleInputChange}
                                placeholder="請輸入使用者名稱..."
                            ></Form.Control>
                            <Button type="submit" variant="primary" style={{ flexShrink: 0 }}>搜尋</Button>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="justify-content-start">
                    <UserList data={searchUserList} />
                    {/* <Button variant="primary">加入好友</Button>
                    <Button variant="secondary" onClick={handleCloseModal}>關閉視窗</Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

function UserList({ data }: { data: Array<IUserData> | null }) {
    return (
        <ul className="user-list">
            {
                data?.map((userData) => {
                    return <UserListItem key={userData.id} userData={userData} />
                })
            }
        </ul>
    )
}

function UserListItem({ userData }: { userData: IUserData }) {
    const { userName } = userData;

    // 如果能夠執行到這裡currentUserData就一定存在(登入狀態)，故使用as(型別斷言)
    const currentUserData = useAppSelector(state => state.user.currentUserData) as IUserData;

    const handleNewChat = async () => {
        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userChats");

        try {
            // 新增chats資料
            const newChatRef = doc(chatRef);
            await setDoc(newChatRef, {
                createdAt: Date.now(),
                messages: [],
            });
            // 新增userChats資料
            // 在對方的userChats/chats裡面新增chat資料
            await updateDoc(doc(userChatsRef, userData.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: currentUserData.id,
                    updateAt: Date.now(),
                })
            });
            // 在我方這邊新增chat資料
            await updateDoc(doc(userChatsRef, currentUserData.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    lastMessage: "",
                    receiverId: userData.id,
                    updateAt: Date.now(),
                })
            });
            toast.success("新增聊天室成功");
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <li className="user-list-item">
            <div className="user-info">
                <picture className="avatar"><img src={import.meta.env.VITE_USER_DEFAULT_AVATAR_URL} alt="" /></picture>
                <h5 className="user-name m-0">{userName}</h5>
            </div>
            <Button variant="primary" onClick={handleNewChat}>新增聊天室</Button>
        </li>
    )
}

export default Searchbar;