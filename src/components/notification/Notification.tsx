import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// 使用套件 react-toastify，彈出式通知 https://www.npmjs.com/package/react-toastify
function Notification() {
    return (
        <ToastContainer position="bottom-right" autoClose={3000} />
    );
}

export default Notification;