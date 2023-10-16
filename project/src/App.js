import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
import Error from "./screen/Error";
import Home from './screen/Home';
import Month from './screen/Month';
import Settings from "./screen/Settings";
import LoginForm from './screen/LoginForm';
import { useGlobalContext } from './context/context';

function App() {
  const { isLogged } = useGlobalContext()
  return (
    <BrowserRouter>
      {isLogged && <Navbar />}
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/home/:email' element={<Home />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/month/:name' element={<Month />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;