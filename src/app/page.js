import React from "react";

import HeroSlider from "./components/Hero";
import TravelEnquirySection from "./components/EnquiryForm";

import ContactSection from "./components/Contact";
import TravelEnquiryPopup from "./components/TravelEnquiryForm";

import InternationalDestinations from "./components/InternationalDestination";
import TripStats from "./components/TripStats";
import DomesticTripsSection from "./components/DomesticTrip";
import WhyPrimevista from "./components/WhyPyt";
import ReviewImageSection from "./components/Reviews";
import WhatsAppFloat from "./components/WhatsappFloat";
function Home() {
  return (
    <div>
      <HeroSlider />
      <DomesticTripsSection />
      <ContactSection />
      <InternationalDestinations />
      <TravelEnquirySection />
      <TripStats />
      <ReviewImageSection />
      <WhyPrimevista />
      <TravelEnquiryPopup/>
      <WhatsAppFloat/>
    </div>
  );
}

export default Home;
