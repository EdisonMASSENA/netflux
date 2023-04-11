import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Home from "./components/Home";
import Layout from "./components/Layout";
import Detail from './components/Detail';
import Favs from './components/Favs';


function App() {
  
  return (
    <div className="App" >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='/detail' element={<Detail />} />
            <Route path='/favoris' element={<Favs />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
