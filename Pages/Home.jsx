import React from 'react'
import Navbar from '../Components/Navbar'
import About from '../Components/About'
import Header from '../Components/Header'
import Booking from './Userbooking'
import Contact from '../Components/Contact'
import Footer from '../Components/Footer'
import CarReservations from '../Components/Testimonalis'

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <About/>
      
      <Booking/>
      <CarReservations/>
      <Contact/>
      <Footer/>
    
    </div>
  )
}

export default Home
