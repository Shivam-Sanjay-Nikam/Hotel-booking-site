import './App.css'
import {Route,Routes} from "react-router-dom";
import Header from './components/Header.jsx';
import Login from './components/Login.jsx'
import Home from './components/Home.jsx';
import Register from './components/Register.jsx';
import Index from './components/Index.jsx'
import axios from 'axios';
import { UserContextProvider } from './context/userContext.jsx';
import Profile from './components/Profile.jsx'
axios.defaults.withCredentials=true;
import PlacesFormPage from './components/Placeform.jsx';
import PlacePage from './components/PlacePage.jsx';

function App() {
  return (
    <div className='p-3'>
      <UserContextProvider>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/index' element={<Index/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/places/new' element={<PlacesFormPage/>}/>
        <Route path="/place/:id" element={<PlacePage />} />
      </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App
