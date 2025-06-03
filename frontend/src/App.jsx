import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/home-page/Home';
import Cart from './pages/cart-page/Cart';
import PlaceOrder from './pages/placeOrder/PlaceOrder';
import { Routes, Route } from 'react-router-dom'; 
import Cursor1 from './components/Cursor1';
import Footer from './components/Footer/Footer';
import { useState } from 'react';
import LoginPopup from './components/loginpopup/LoginPopup';

const App = () => {

  const [showLogin, setShowLogin] = useState(false);
  

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>

        <Navbar setShowLogin={setShowLogin}/>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
      </Routes>

     
    </div>
     <Footer/>
     </>
  );
};

export default App;
