import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminDashboard from './Admin/AdminDashboard.jsx';
import Drivers from './Admin/Drivers.jsx';
import Booking from './Admin/Booking.jsx';

import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import CarForm from './Admin/CarForm.jsx';
import VanManagement from './Admin/VanForm.jsx';
import CarList from './Admin/CarList.jsx';

import Feedback from './Pages/Feedback.jsx';
import Profile from './Pages/Profile.jsx';
import Reservation from './Pages/Reservation.jsx';
import Userbooking from './Pages/Userbooking.jsx'
import AdminLogin from './Admin/AdminLogin.jsx';
import AdminRegister from './Admin/AdminRegister.jsx';
import AuthPopup from './Pages/AuthPopup.jsx';
import Cart from './Pages/Cart.jsx';
import AdminUserManagement from './Admin/AdminUserManagement.jsx';
import AddFeedback from './Pages/AddFeedback.jsx';
import ViewFeedback from './Admin/ViewFeedback.jsx';
import Home from './Pages/Home.jsx';
import AdminProfile from './Admin/AdminProfile.jsx';
import UserDetails from './Admin/UserDetails.jsx';










createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ToastContainer/>
  
    <Routes>
      <Route path="/admin"  element={<AdminDashboard />}/>
      <Route path="/" element={<App />} />
      <Route path="/driver" element={<Drivers />} />
      <Route path="/book" element={<Booking />} />
      
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />  
      <Route path="/carform"  element={<CarForm/>} /> 
      
      
      <Route path="/vans" element={<VanManagement/>} />
      <Route path="/carlist" element={<CarList/>} />

      <Route path="/addfeedback" element={<AddFeedback/>}/>
      <Route path="/feedbacks" element={<ViewFeedback/>} />
      
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/reservation" element={<Reservation/>} />

      
      <Route path="/booking" element={<Userbooking/>} />
      <Route path="admin/login" element={<AdminLogin/>} />
      <Route path="admin/profile" element={<AdminProfile/>}/>
      <Route path="admin/register" element={<AdminRegister/>} />
      <Route path="/auth" element={<AuthPopup/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/admin/user" element={<AdminUserManagement/>} />
      <Route path="#" element={<Home/>}/>
      <Route path="/customers" element={<UserDetails/>} />
      
      
      
      
      
    </Routes>
    
    
  </BrowserRouter>,
)
