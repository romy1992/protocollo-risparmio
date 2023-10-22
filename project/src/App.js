import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useGlobalContext } from './context/context';
import "./index.css";
import Error from "./screen/Error";
import Home from './screen/Home';
import LoginForm from './screen/LoginForm';
import Month from './screen/Month';
import Settings from "./screen/Settings";

function App() {
  const { stateLogin } = useGlobalContext()
  return (
    <BrowserRouter>
      {stateLogin.isLogged && <Navbar />}
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/home/:email' element={<Home />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/month/:name' element={<Month />} />
        <Route path='/error' element={<Error />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;