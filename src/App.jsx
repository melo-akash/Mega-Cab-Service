import React from 'react'

import Header from './Components/Header'
import About from './Components/About'

import Testimonalis from './Components/Testimonalis'
import Contact from './Components/Contact'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Components/Footer'
import Booking from './Pages/Userbooking'


function App() {
  return (
    <div className='w-full  overflow-hidden'>
      <ToastContainer/>
      
      <Header/>
      <About/>
      
      <Booking/>
      <Testimonalis/>
      <Contact/>
      <Footer/>
      
      
    </div>
  )
}

export default App
