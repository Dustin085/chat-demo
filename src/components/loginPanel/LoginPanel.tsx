import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import "./loginPanel.scss";

// react-bootstrap
import { Button } from "react-bootstrap";

// firebase
import { auth, db } from "../../lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// custom hooks
import useInputData from "../../customHook/useInputData";

function loginPanel() {

    const [fromSwitch, setFromSwitch] = useState<"login" | "register">("login");
    const [isLoading, setIsLoading] = useState(false);

    const brandName = "Chat Demo";

    return (
        <div className="login-panel">
            <h2 className="title">
                {fromSwitch === "login" && `歡迎使用${brandName}`}
                {fromSwitch === "register" && `註冊新的${brandName}帳號`}
            </h2>
            {fromSwitch === "login" && <LoginForm />}
            {fromSwitch === "register" && <RegisterForm />}
        </div>
    );



    function LoginForm() {

        const { inputs, handleInputChange } = useInputData({ email: "", password: "" });

        const handleLogin = async (ev: FormEvent<HTMLFormElement>) => {
            ev.preventDefault();

            const { email, password } = inputs;

            setIsLoading(true);

            try {
                const res = await signInWithEmailAndPassword(auth, email, password);
                toast.success("成功登入");
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                    toast.error(error.message);
                };
            } finally {
                setIsLoading(false);
            };
            // console.log(inputs);
            // toast.success("Welcome!!");
        };

        return (
            <form action="" onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        name="email"
                        value={inputs.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">密碼</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={inputs.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">記住我的登入資訊</label>
                </div>
                <div className=" btn-box mb-3">
                    {/* <button type="submit" className="btn btn-primary login-btn">登入</button> */}
                    <Button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>{isLoading ? "Loading..." : "登入"}</Button>
                </div>
                <div className="btn-box">
                    {/* <button type="button" className="btn btn-secondary btn-sm login-btn" onClick={() => { setFromSwitch("register") }}>註冊新帳號</button> */}
                    <Button type="button" className="btn btn-secondary btn-sm login-btn" onClick={() => { setFromSwitch("register") }}>註冊新帳號</Button>
                </div>
            </form>
        )
    }

    function RegisterForm() {

        const { inputs, handleInputChange } = useInputData({ email: "", userName: "", password: "", passwordCheck: "" })

        const handleRegister = async (ev: FormEvent<HTMLFormElement>) => {
            ev.preventDefault();

            const { email, userName, password, passwordCheck } = inputs;
            // 開始Loading
            setIsLoading(true);

            try {
                if (password !== passwordCheck) throw new Error("請確認兩次輸入的密碼相同");
                const res = await createUserWithEmailAndPassword(auth, email, password);

                // 建立user基本資料
                await setDoc(doc(db, "users", res.user.uid), {
                    userName,
                    email,
                    id: res.user.uid,
                    blocked: []
                });

                // 建立user聊天室
                await setDoc(doc(db, "userChats", res.user.uid), {
                    chats: []
                });

                toast.success("帳號建立成功!");
                setFromSwitch("login");

            } catch (error) {
                console.log(error);
                if (error instanceof Error) {
                    toast.error(error.message);
                };
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <form action="" onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        name="email"
                        value={inputs.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">使用者名稱</label>
                    <input
                        type="text"
                        className="form-control"
                        id="userName"
                        aria-describedby="emailHelp"
                        name="userName"
                        value={inputs.userName}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">密碼</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={inputs.password}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="passwordCheck" className="form-label">確認密碼</label>
                    <input
                        type="password"
                        className="form-control"
                        id="passwordCheck"
                        name="passwordCheck"
                        value={inputs.passwordCheck}
                        onChange={handleInputChange}
                    />
                </div>
                <div className=" btn-box mb-3">
                    {/* <button type="submit" className="btn btn-primary login-btn">註冊</button> */}
                    <Button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>{isLoading ? "Loading..." : "註冊"}</Button>
                </div>
                <div className="btn-box">
                    <button type="button" className="btn btn-secondary btn-sm login-btn" onClick={() => { setFromSwitch("login") }}>使用已有帳號登入</button>
                </div>
            </form>
        )
    }
}

export default loginPanel;