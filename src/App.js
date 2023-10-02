import React, { useState, useEffect, useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/AuthContext';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   // hanya di eksekusi jika dependencies nya berubah, dalam hal ini dependencies nya kosong, ketika cycle kedua dia tidak berubah krn memang kosong, cek video 145
  //   const storedUserLoggedIn = localStorage.getItem('isLoggedIn');
  //   if (storedUserLoggedIn === '1') setIsLoggedIn(true);
  // }, []);

  // const loginHandler = (email, password) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem('isLoggedIn', '1');
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem('isLoggedIn');
  //   setIsLoggedIn(false);
  // };

  const ctx = useContext(AuthContext);

  return (
    // <AuthContext.Provider value={{ isLoggedIn, onLogout: logoutHandler }}>
    <React.Fragment>
      <MainHeader />
      <main>
        {/* Di dua component di bawah ini tetap menggunakan props untuk meneruskan handler dan tidak menggunakan useContext() API karena memang direct di gunakan dan tidak hanya diteruskan */}
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
      {/* </AuthContext.Provider> */}
    </React.Fragment>
  );
}

export default App;
