import React from 'react';
import Navbar from "./components/Navbar";
import 'bootstrap/dist/css/bootstrap.css';
import "./index.css";
import Home from './screen/Home';
import Error from "./screen/Error";
import Month from './screen/Month';
import Settings from "./screen/Settings";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/month/:name' element={<Month />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;