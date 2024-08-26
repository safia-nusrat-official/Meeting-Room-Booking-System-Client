import React from 'react'
import HeroSection from './heroSection/HeroSection'
import ServiceSection from './ServiceSection'
import FeaturedRooms from './FeaturedRooms'
import WhyChoose from './WhyChoose'

const Home = () => {
  return (
    <section className=''>
      <HeroSection></HeroSection>
      <ServiceSection></ServiceSection>
      <FeaturedRooms></FeaturedRooms>
      <WhyChoose></WhyChoose>
    </section>
  )
}

export default Home