import React from 'react'
import HeroCard from './HeroCard/HeroCard';
import QuerryShowCard from './QuerryShowCard/QuerryShowCard';
import PricingSection from './PricingSection/PricingSection';
import DifferenceSection from './DifferenceSection/DifferenceSection';
import Footer from './Footer/Footer';
import "./Home.css";

export default function Home() {
  return (
    <div className='home-page'>
      <HeroCard />
      <QuerryShowCard/>
      <PricingSection/>
      <DifferenceSection/>
      <Footer />
    </div>
  )
}
