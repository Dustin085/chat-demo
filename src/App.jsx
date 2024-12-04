import './App.scss';
import 'bootstrap/dist/js/bootstrap';
import { useEffect } from 'react';

// firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';

// components
import Notification from './components/notification/Notification';

// layouts
import ChatAppLayout from './layouts/ChatAppLayout';

// redux
import { fetchUserDataById } from './lib/userSlice';

// custom hooks
import { useAppDispatch } from './customHook/reduxTypedHooks'
import { layoutSwitch } from './lib/layoutSwitchSlice';

function App() {


  // const [windowSize, setWindowSize] = useState("mobile");
  const breakPointMd = 1280;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // below line is equal to user ? user.uid : undefined
      dispatch(fetchUserDataById(user?.uid));
    })
    // 解除eventListener
    return unsubscribe;
  }, [dispatch]);

  // RWD
  useEffect(() => {
    // 初始化
    checkWindowSize();
    // 隨視窗寬度改變state
    window.addEventListener("resize", () => {
      checkWindowSize();
    });
    // 確認現在的視窗寬度
    function checkWindowSize() {
      if (window.innerWidth < breakPointMd) {
        dispatch(layoutSwitch.actions.updateState("mobile"));
      } else {
        dispatch(layoutSwitch.actions.updateState("desktop"));
      }
    };
  }, [dispatch]);



  return (
    <div className="root-wrap vh-100 d-flex justify-content-center align-items-center">
      <div className="root-layout container-md rounded border">
        <ChatAppLayout />
      </div>
      <Notification />
    </div>
  )
}

export default App
