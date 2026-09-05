const defaultQuotation = {
  customer: {
    name: "Mustakim Khazi",
    email: "",
    phone: "",
  },

  quotation: {
    destination: "Thailand",
    departureDate: "20 Apr 2026",
    duration: "5 nights, 6 days",
    travellers: "2 Adults",
    quotationDate: "15 Nov 2025",
    consultant: "PrimeVista Journey",
    consultantPhone: "+91 81784 20122",
    consultantEmail: "info@primevistajourney.com",
  },

  cover: {
    title: "6 days in",
    destination: "THAILAND",
    nights: [
      {
        count: 2,
        label: "Nights in",
        place: "Krabi",
      },
      {
        count: 3,
        label: "Nights in",
        place: "Phuket",
      },
    ],
  },

  inclusionsTags: [
    "Landpackage",
    "Hotel",
    "Flight",
  ],

  stays: [
    {
      hotel: "GLOW Ao Nang Krabi",
      city: "Krabi",
      category: "4 Star",
      checkIn: "20 Apr 2026",
      checkOut: "22 Apr 2026",
      rooms: [
        {
          room: "Room 1",
          type: "1 X Superior King",
          adults: "2 Adults",
          breakfast: "Included",
          lunch: "Not Included",
          dinner: "Not Included",
        },
      ],
    },

    {
      hotel: "Ramada by Wyndham Phuket Deevana",
      city: "Phuket",
      category: "4 Star",
      checkIn: "23 Apr 2026",
      checkOut: "25 Apr 2026",
      rooms: [
        {
          room: "Room 1",
          type: "1 X Deluxe Balcony",
          adults: "2 Adults",
          breakfast: "Included",
          lunch: "Not Included",
          dinner: "Not Included",
        },
      ],
    },
  ],

  flights: [
    {
      airline: "",
      flightNumber: "",
      from: "",
      to: "",
      departure: "",
      arrival: "",
    },
  ],

  itinerary: [
    {
      day: "Day 1",
      date: "20 Apr 2026",
      title: "Arrival at Phuket - Transfer to Krabi",
      description:
        "Upon arrival at Phuket Airport, meet our local tour coordinator who will meet and greet you at the specified area and transfer you to your Krabi hotel. Check in to your hotel and relax. Rest of the day is free at your own leisure.",
      breakfast: "Not Included",
      lunch: "Not Included",
      dinner: "Not Included",
    },

    {
      day: "Day 2",
      date: "21 Apr 2026",
      title: "Full Day Krabi Four Island Tour by Long Tail Boat With Lunch",
      description:
        "After breakfast, proceed for Krabi Four Island Day Trip. Explore Koh Tup, Koh Gai, Koh Poda and Phra Nang Cave Beach via boat. Enjoy the scenic islands, swimming, snorkeling and lunch at Koh Poda Island.",
      breakfast: "Included",
      lunch: "Included",
      dinner: "Not Included",
    },

    {
      day: "Day 3",
      date: "22 Apr 2026",
      title: "Transfer from Krabi to Phuket + Half Day Phuket City Tour",
      description:
        "Take breakfast, check out from the hotel and proceed towards Phuket. On arrival, check in to your hotel. Later enjoy a half-day Phuket City Tour covering Patong, Karon, Kata Beach, Karon viewpoint, Chalong Temple and Phuket Old Town.",
      breakfast: "Included",
      lunch: "Not Included",
      dinner: "Not Included",
    },

    {
      day: "Day 4",
      date: "23 Apr 2026",
      title: "Phi Phi Island Tour by Speedboat With Lunch",
      description:
        "Begin your day with hotel pickup and proceed to the marina. Visit Maya Bay, Monkey Beach, Pileh Cove, Viking Cave, Loh Samah Bay and Phi Phi Don Island. Enjoy lunch and snorkeling before returning to Phuket.",
      breakfast: "Included",
      lunch: "Included",
      dinner: "Not Included",
    },

    {
      day: "Day 5",
      date: "24 Apr 2026",
      title: "Visit to Tiger Kingdom",
      description:
        "Today morning visit Tiger Kingdom at Phuket. Enjoy the experience and photography opportunities. Return back to your hotel in the evening for overnight stay.",
      breakfast: "Included",
      lunch: "Not Included",
      dinner: "Not Included",
    },

    {
      day: "Day 6",
      date: "25 Apr 2026",
      title: "Departure from Phuket",
      description:
        "After breakfast, checkout from your hotel. You will be picked up and transferred to the airport to catch your flight back home. Your trip ends with sweet memories.",
      breakfast: "Included",
      lunch: "Not Included",
      dinner: "Not Included",
    },
  ],

  inclusions: [
    "Accommodation",
    "Breakfast",
    "Airfare",
    "Return Airport transfer",
    "All tours and transfers",
    "5% GST",
    "Sightseeing as per the itinerary",
  ],

  exclusions: [
    "5% TCS",
    "Any additional meals other than mentioned in the inclusive column",
    "Visa charges",
  ],

  pricing: {
    packageTravellers: "2 Adults",
    packagePerAdult: 42300,
    packageTotal: 84600,

    flightTravellers: "2 Adults",
    flightPerAdult: 22500,
    flightTotal: 45000,
  },
};

export default defaultQuotation;