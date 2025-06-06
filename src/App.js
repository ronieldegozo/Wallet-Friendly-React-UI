import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react'
import Home from './Home';
import Create from './Create';
import Update from './Update';
import Read from './Read';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<Create />} />
            <Route path='/update/:userId' element={<Update />} />
            <Route path='/read/:userId' element={<Read />} />
          </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App;
