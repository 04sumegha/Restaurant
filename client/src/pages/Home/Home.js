import React from "react"
import Navbar from "../../components/Navbar/Navbar"
import Hero from "../../components/Hero/Hero"
import Features from "../../components/Features/Features"
import Discover from "../../components/Discover/Discover"
import Footer from "../../components/Footer/Footer"

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Discover />
      <Footer />
    </div>
  )
}

export default Home
