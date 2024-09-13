import React from 'react'
import HeroSection from './heroSection/HeroSection'
import ServiceSection from './ServiceSection'
import FeaturedRooms from './FeaturedRooms'
import WhyChoose from './WhyChoose'
import TestimonialSection from './Testimonials'
import HowItWorks from './HowItWorks'
import BackToTopBtn from '@/components/shared/BackToTopBtn'

const Home = () => {
  return (
    <section className=''>
      <BackToTopBtn></BackToTopBtn>
      <HeroSection></HeroSection>
      <ServiceSection></ServiceSection>
      <FeaturedRooms></FeaturedRooms>
      <WhyChoose></WhyChoose>
      <TestimonialSection></TestimonialSection>
      <HowItWorks></HowItWorks>
    </section>
  )
}

export default Home