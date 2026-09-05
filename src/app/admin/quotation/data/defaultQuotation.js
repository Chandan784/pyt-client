const defaultQuotation = {
  branding: {
    company: "Primevista Journey",
    tagline: "Your Journey, Our Responsibility",
    email: "info@primevistajourney.com",
    phone: "+91 98765 43210",
    logo: "",
  },

  customer: {
    name: "Mustakim Khazi",
    email: "mustakim@example.com",
    phone: "+91 98765 43210",
  },

  quotation: {
    number: "PVJ-2026-001",
    date: "31 Aug 2026",
    departure: "15 Sep 2026",
    duration: "5 Nights / 6 Days",
    travellers: "2 Adults",
    destination: "Thailand",
  },

  cover: {
    title: "Quotation For",
    destination: "Thailand",
    image: "",
  },

  stays: [
    {
      id: "hotel-1",
      city: "Bangkok",
      hotel: "Novotel Bangkok",
      category: "4 Star Hotel",
      checkIn: "15 Sep 2026",
      checkOut: "17 Sep 2026",

      rooms: [
        {
          id: "room-1",
          room: "Room 1",
          type: "Deluxe Room",
          guests: "2 Adults",
          meal: "Breakfast Included",
        },
      ],
    },

    {
      id: "hotel-2",
      city: "Pattaya",
      hotel: "Amari Pattaya",
      category: "4 Star Hotel",
      checkIn: "17 Sep 2026",
      checkOut: "20 Sep 2026",

      rooms: [
        {
          id: "room-2",
          room: "Room 1",
          type: "Deluxe Sea View",
          guests: "2 Adults",
          meal: "Breakfast Included",
        },
      ],
    },
  ],

  flights: [
    {
      id: "flight-1",
      airline: "IndiGo",
      flight: "6E 1234",
      from: "Bhubaneswar",
      to: "Bangkok",
      date: "15 Sep 2026",
      departure: "10:30 AM",
      arrival: "04:30 PM",
    },
  ],

  itinerary: [
    {
      id: "day-1",
      day: "01",
      date: "15 Sep 2026",
      title: "Arrival in Bangkok",
      description:
        "Arrive at Bangkok airport and proceed to the hotel. Check-in and spend the evening at leisure.",
      breakfast: "Not Included",
      lunch: "Not Included",
      dinner: "Included",
    },

    {
      id: "day-2",
      day: "02",
      date: "16 Sep 2026",
      title: "Bangkok City Tour",
      description:
        "Enjoy a city tour covering the major attractions of Bangkok followed by free time for shopping.",
      breakfast: "Included",
      lunch: "Included",
      dinner: "Included",
    },

    {
      id: "day-3",
      day: "03",
      date: "17 Sep 2026",
      title: "Bangkok to Pattaya",
      description:
        "Check out from Bangkok and transfer to Pattaya. Check-in at the hotel and enjoy the evening.",
      breakfast: "Included",
      lunch: "Not Included",
      dinner: "Included",
    },

    {
      id: "day-4",
      day: "04",
      date: "18 Sep 2026",
      title: "Pattaya Sightseeing",
      description:
        "Explore Pattaya and enjoy the planned sightseeing activities and attractions.",
      breakfast: "Included",
      lunch: "Included",
      dinner: "Included",
    },

    {
      id: "day-5",
      day: "05",
      date: "19 Sep 2026",
      title: "Leisure Day",
      description:
        "Enjoy a relaxed day at leisure. Optional activities can be arranged on request.",
      breakfast: "Included",
      lunch: "Not Included",
      dinner: "Included",
    },

    {
      id: "day-6",
      day: "06",
      date: "20 Sep 2026",
      title: "Departure",
      description:
        "Check out from the hotel and transfer to the airport for your return journey.",
      breakfast: "Included",
      lunch: "Not Included",
      dinner: "Not Included",
    },
  ],

  inclusions: [
    "Accommodation as mentioned in the itinerary.",
    "Daily breakfast at the hotel.",
    "Airport transfers as mentioned.",
    "Sightseeing as mentioned in the itinerary.",
    "All applicable hotel taxes.",
    "Transportation as per the itinerary.",
  ],

  exclusions: [
    "International airfare unless specifically mentioned.",
    "Personal expenses.",
    "Laundry and telephone expenses.",
    "Travel insurance.",
    "Visa charges.",
    "Any service not mentioned under inclusions.",
  ],

  pricing: {
    packagePerAdult: 45000,
    packageTotal: 90000,
    flightPerAdult: 15000,
    flightTotal: 30000,
  },
};

export default defaultQuotation;