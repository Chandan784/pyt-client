import React from "react";

import HeroSlider from "./components/Hero";
import TravelEnquirySection from "./components/EnquiryForm";

import ContactSection from "./components/Contact";
import WhyPYT from "./components/WhyPyt";
import InternationalDestinations from "./components/InternationalDestination";
import TripStats from "./components/TripStats";
import DomesticTripsSection from "./components/DomesticTrip";
function Home() {
  return (
    <div>
      <HeroSlider />

      <DomesticTripsSection />
      <ContactSection />
      <TravelEnquirySection />
      <InternationalDestinations />
      <TripStats />
      <WhyPYT />
    </div>
  );
}

export default Home;
