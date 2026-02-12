import React from "react";

import HeroSlider from "./components/Hero";
import TravelEnquirySection from "./components/EnquiryForm";

import ContactSection from "./components/Contact";

import InternationalDestinations from "./components/InternationalDestination";
import TripStats from "./components/TripStats";
import DomesticTripsSection from "./components/DomesticTrip";
import WhyPrimevista from "./components/WhyPyt";
function Home() {
  return (
    <div>
      <HeroSlider />

      <DomesticTripsSection />
      <ContactSection />
      <TravelEnquirySection />
      <InternationalDestinations />
      <TripStats />
      <WhyPrimevista />
    </div>
  );
}

export default Home;
