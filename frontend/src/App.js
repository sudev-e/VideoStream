import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import Home from './pages/Home';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Register';

function App() {
  return (
     <>
     <Router>
      <div>
        <Routes>
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Register/>}/>
        <Route path='/'>
        <Route index element={<Home type="getall" />} />
        <Route path="trends" element={<Home type="trend" />} />
        </Route>
        </Routes>
     </div>

     </Router>
     <ToastContainer/>
     </>
  );
}

export default App;
