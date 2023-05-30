import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../pages/loginPage/LoginPage';
import HomePage from '../pages/homePage/HomePage'
import NavigationBar from '../pages/homePage/NavigationBar';
function App() {
  return (
    <BrowserRouter>
    <Routes>
     <Route path="/" element={<LoginPage />} />
     <Route path="/:id" element={<NavigationBar />} >
     <Route path="/:id/home" element={<HomePage />} />
     </Route>
     </Routes>
    </BrowserRouter>
  );
}

export default App;
