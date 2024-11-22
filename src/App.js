import './css/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import MainPage from './pages/MainPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { auth } from './FirebaseConfiguration';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          setUserEmail(user.email);
          setIsAuth(true);
          // ...
          console.log("uid", uid)
        } else {
          setIsAuth(false);
          console.log("user is logged out")
        }
      });
  }, [])

  return (
    <div>
      <BrowserRouter>
          <NavBar auth={isAuth} />
          <Routes>
              <Route path='/' element={<MainPage auth={isAuth} user={userEmail} />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
          </Routes>
      </BrowserRouter>
        </div>
  );
}

export default App;
