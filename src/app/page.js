import React from "react";
import Navbar from "./components/Navbar";
import HeroSlider from "./components/Hero";
import TravelEnquirySection from "./components/EnquiryForm";
import FooterFull from "./components/FooterFull";
import DomesticTripsSimple from "./components/DomesticTrip";
import ContactSection from "./components/Contact";
function Home() {
  return (
    <div>
      <Navbar />
      <HeroSlider />
      <DomesticTripsSimple />
      <ContactSection />
      <TravelEnquirySection />
      <FooterFull />
    </div>
  );
}

export default Home;
