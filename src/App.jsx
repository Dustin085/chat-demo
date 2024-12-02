import './App.scss';
import 'bootstrap/dist/js/bootstrap';
import { useState, useEffect } from 'react';

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

function App() {

  const [windowSize, setWindowSize] = useState("mobile");
  const breakPointMd = 769;

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
  }, []);

  // 確認現在的視窗寬度
  function checkWindowSize() {
    if (window.innerWidth < breakPointMd) {
      setWindowSize("mobile");
    } else {
      setWindowSize("desktop");
    }
  }

  return (
    <div className="root-wrap vh-100 d-flex justify-content-center align-items-center">
      <div className="root-layout container-md rounded border">
        <ChatAppLayout windowSize={windowSize} />
      </div>
      <Notification />
    </div>
  )
}

export default App
