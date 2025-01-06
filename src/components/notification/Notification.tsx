import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/**
 * 使用套件 react-toastify，彈出式通知 https://www.npmjs.com/package/react-toastify
 * @returns - react-toastify的彈出式通知組件(ToastContainer)
 */
function Notification() {
    return (
        <ToastContainer position="bottom-right" autoClose={3000} />
    );
}

export default Notification;