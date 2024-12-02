import { toast } from "react-toastify";
import { auth } from "../../lib/firebase";
import "./detailPanel.scss";

function DetailPanel() {

    const handleLogout = () => {
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
    };

    return (
        <div className="detail-panel">
            <h2>DetailPanel</h2>
            <p>建構中</p>
            <div className="btn-box">
                <button type="button" className="btn btn-danger">封鎖此使用者</button>
                <button type="button" className="btn btn-primary" onClick={handleLogout}>登出</button>
            </div>
        </div>
    );
}

export default DetailPanel;