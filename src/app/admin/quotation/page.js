"use client";

import { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

/* ========================================================================== */
/* BRANDING                                                                   */
/* ========================================================================== */

const BRAND = {
  company: "PrimeVistaJourney",
  displayName: "PrimeVista Journey",
  tagline: "Travel Beyond Horizons",
  phone: "+91 81784 20122",
  email: "info@primevistajourney.com",
  website: "",
  orange: "#f15a24",
  dark: "#242424",
  gray: "#666666",
  light: "#f4f4f4",
  border: "#dddddd",
};

/* ========================================================================== */
/* DEFAULT DATA                                                               */
/* ========================================================================== */

const DEFAULT_QUOTATION = {
  customer: {
    name: "Mustakim Khazi",
    email: "mustakim@example.com",
    phone: "+91 98765 43210",
  },

  quotation: {
    number: "PVJ-2026-001",
    date: "15 Nov 2025",
    departure: "20 Apr 2026",
    duration: "5 nights, 6 days",
    travellers: "2 Adults",
    destination: "Thailand",
    inclusionsLabel: "Landpackage Hotel Flight",
  },

  cover: {
    title: "Perfect Itinerary for your trip!",
    destination: "THAILAND",
    image: "",
  },

  stays: [
    {
      id: "hotel-1",
      city: "Krabi",
      hotel: "GLOW Ao Nang Krabi",
      category: "4 Star",
      checkIn: "20 Apr 2026",
      checkOut: "22 Apr 2026",
      rooms: [
        {
          id: "room-1",
          room: "Room 1",
          type: "1 X Superior King",
          guests: "2 Adults",
          meal: "Breakfast",
        },
      ],
    },

    {
      id: "hotel-2",
      city: "Phuket",
      hotel: "Ramada by Wyndham Phuket Deevana",
      category: "4 Star",
      checkIn: "23 Apr 2026",
      checkOut: "25 Apr 2026",
      rooms: [
        {
          id: "room-2",
          room: "Room 1",
          type: "1 X Deluxe Balcony",
          guests: "2 Adults",
          meal: "Breakfast",
        },
      ],
    },
  ],

  flights: [
    {
      id: "flight-1",
      airline: "Thai Airways",
      flight: "TG 123",
      from: "Delhi",
      to: "Phuket",
      date: "20 Apr 2026",
      departure: "10:30",
      arrival: "16:20",
    },

    {
      id: "flight-2",
      airline: "Thai Airways",
      flight: "TG 456",
      from: "Phuket",
      to: "Delhi",
      date: "25 Apr 2026",
      departure: "18:30",
      arrival: "22:40",
    },
  ],

  itinerary: [
    {
      id: "day-1",
      day: "01",
      date: "20 Apr 2026",
      title: "Arrival at Phuket - Transfer to Krabi",
      description:
        "Upon arrival at Phuket Airport, meet our local tour coordinator who will meet and greet you at the specified area and transfer you to your Krabi hotel. Check in to your hotel and relax. Rest of the day is free at your own leisure.",
      breakfast: "Not Included",
      lunch: "Not Included",
      dinner: "Not Included",
    },

    {
      id: "day-2",
      day: "02",
      date: "21 Apr 2026",
      title:
        "Full Day Krabi Four Island Tour by Long Tail Boat With Lunch",
      description:
        "After breakfast, proceed for Krabi Four Island Day Trip. Explore Koh Tup, Koh Gai, Koh Poda and Phra Nang Cave Beach via boat. Enjoy the scenic islands, swimming, snorkeling and lunch at Koh Poda Island.",
      breakfast: "Included",
      lunch: "Included",
      dinner: "Not Included",
    },

    {
      id: "day-3",
      day: "03",
      date: "22 Apr 2026",
      title:
        "Transfer from Krabi to Phuket + Half Day Phuket City Tour",
      description:
        "Take breakfast, check out from the hotel and proceed towards Phuket. On arrival, check in to your hotel. Later enjoy a half-day Phuket City Tour covering Patong, Karon, Kata Beach, Karon viewpoint, Chalong Temple and Phuket Old Town.",
      breakfast: "Included",
      lunch: "Not Included",
      dinner: "Not Included",
    },

    {
      id: "day-4",
      day: "04",
      date: "23 Apr 2026",
      title: "Phi Phi Island Tour by Speedboat With Lunch",
      description:
        "Begin your day with hotel pickup and proceed to the marina. Visit Maya Bay, Monkey Beach, Pileh Cove, Viking Cave, Loh Samah Bay and Phi Phi Don Island. Enjoy lunch and snorkeling before returning to Phuket.",
      breakfast: "Included",
      lunch: "Included",
      dinner: "Not Included",
    },

    {
      id: "day-5",
      day: "05",
      date: "24 Apr 2026",
      title: "Visit to Tiger Kingdom",
      description:
        "Today morning visit Tiger Kingdom at Phuket. Enjoy the experience and photography opportunities. Return back to your hotel in the evening for overnight stay.",
      breakfast: "Included",
      lunch: "Not Included",
      dinner: "Not Included",
    },

    {
      id: "day-6",
      day: "06",
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
    packagePerAdult: "42300",
    packageTotal: "84600",
    flightPerAdult: "22500",
    flightTotal: "45000",
  },
};

/* ========================================================================== */
/* FIXED POLICIES                                                             */
/* ========================================================================== */

const PAYMENT_POLICY = [
  "Advance Booking Fee - At the time of booking, 25% of total package cost or token amount of Rs 10,000/- is required.",
  "Flight amount is required at the time of booking to ensure confirmed booking of flights mentioned in the quotation.",
  "Payment slabs vary by destination and hotel deadlines. The accounts department will provide the applicable payment slab. 30 days from the date of departure: 100% of total package cost.",
  "The token amount is non-refundable.",
  "The remaining balance must be settled as per the specified payment schedule.",
  "The booking stands liable to be cancelled if 100% payment is not received before 30 days from the date of departure.",
  "Booking policy may change depending upon the travel period and destinations opted for. 100% payment may be required in advance for specific destinations or high-end hotels.",
];

const REFUND_POLICY = [
  "If you cancel your holiday, cancellation shall be effective only on receipt of a written notification or an e-mail from the person who made the booking.",
  "Prior to 30 days or more: Booking Fee of Rs. 10,000/-.",
  "Between 30-20 days ahead of departure: 50% of tour cost.",
  "Between 20-15 days of departure: 75% of tour cost.",
  "15 days to date of departure: 100% of tour cost.",
  "In case of no show: 100% of tour cost.",
  "No refund shall be made in case of non-refundable flights.",
  "If we change or cancel your holiday, we reserve the right to make changes where necessary and will advise you at the earliest possible date.",
  "If booked travel arrangements cannot be provided due to reasons beyond our control, we shall first try to offer alternative dates if the tour has not commenced.",
  "If the tour has already commenced, refund shall be calculated on a pro-rata basis depending on the portion of the tour utilized.",
  "Our liability shall be limited to refunding the tour fees charged by PrimeVistaJourney.",
  "After confirmation of services, any request to change travel arrangements must be made in writing. All costs incurred due to amendments will be borne by the customer.",
];

const IMPORTANT_TERMS = [
  "PrimeVistaJourney is committed to ensuring complete transparency in its operations. A universal cancellation policy and terms apply to all bookings made with us.",
  "Due to third-party supplier constraints including airlines, hotels and transport providers, PrimeVistaJourney must adhere to their policies.",
  "All cancellation and rescheduling fees are determined by the respective suppliers and will be communicated during booking.",
  "Hotels are responsible for providing hotel-related services including accommodation, amenities and customer service. PrimeVistaJourney acts as an intermediary.",
  "Guests are recommended to independently verify hotel location, room types and facilities.",
  "Standard hotel check-in is 2:00 PM and check-out is 12:00 PM. Early check-in and late check-out are subject to availability and additional charges.",
  "Airlines are responsible for changes, rescheduling or cancellation of flight schedules. PrimeVistaJourney acts only as an intermediary for flight bookings.",
  "Passengers must stay updated with airline notifications and directly contact airlines where required.",
  "Some hotels may require deposits or collect taxes at check-in. Such payments are outside the control of PrimeVistaJourney.",
  "PrimeVistaJourney takes customer privacy and data security seriously and uses appropriate security measures to protect customer information.",
  "By making a booking with PrimeVistaJourney, the customer acknowledges and accepts these terms.",
];

const CANCELLATION_POLICY = [
  "30-15 days prior to the starting of the tour: 100% of Package Cost, except flights as flight cancellation policies differ from airline to airline.",
  "30-45 days prior to the starting of the tour: 65% of Package Cost, except flights as flight cancellation policies differ from airline to airline.",
  "45-60 days prior to the starting of the tour: 25% of Package Cost, except flights as flight cancellation policies differ from airline to airline.",
  "In case of No Show: 100% of Package Cost.",
  "A token amount of Rs. 10,000 is required to confirm the booking and is non-refundable under any circumstances.",
  "In very exceptional cases, a credit note may be issued for future travel.",
];

const AIRLINE_REFUND_POLICY = [
  "This policy outlines the procedures and guidelines for requesting refunds for airline tickets booked through PrimeVistaJourney.",
  "PrimeVistaJourney is not liable for airline refunds because the refund process is subject to the individual policies and regulations of the respective airlines.",
  "Refund eligibility is determined solely by the airline's policies and fare rules.",
  "Passengers are responsible for understanding the terms and conditions associated with the ticket purchased.",
  "Passengers will receive booking confirmation containing airline, fare conditions and cancellation or refund information.",
  "To request a refund, customers can contact PrimeVistaJourney. We can coordinate with the airline for the refund, but the final refund amount depends entirely on airline policy.",
  "Processing time for refunds varies among airlines and may take several weeks or months.",
  "Online transaction charges of 2.5% will not be refunded.",
  "Hotel refunds will follow the hotel's cancellation policy.",
  "Train ticket cancellations will follow the applicable railway policy.",
  "Flight ticket cancellations will follow the applicable airline policy.",
  "In case the trip is cancelled after commencement, refund will be restricted to the amount recoverable from hotels, contractors and other suppliers.",
];

const LIABILITY_POLICY = [
  "After finalization of the tour or service cost, any increase in entrance fees for monuments or museums, taxes, fuel costs or guide charges in the destination country will be charged as additional expenses.",
  "Liability of PrimeVistaJourney is limited to the extent of the booking amount received from the customer.",
  "In case of delay or cancellation of flights due to unforeseen circumstances, PrimeVistaJourney will offer the best alternate arrangements. No additional compensation will be payable.",
  "Full payment does not automatically assure package booking and acceptance by PrimeVistaJourney.",
  "Booking is confirmed and accepted only when booking vouchers are issued.",
  "In case booking is not accepted, the full refund will be made to the customer or adjusted against an alternate booking as desired by the customer.",
  "In case of unavailability of the specified hotel, alternate accommodation of a similar category may be provided.",
  "Availability and prices are not guaranteed until full payment is received for the package.",
  "GST is payable at the applicable rate of the total package price.",
];

/* ========================================================================== */
/* MAIN PAGE                                                                  */
/* ========================================================================== */

export default function QuotationPage() {
  const quotationRef = useRef(null);

  const [data, setData] = useState(DEFAULT_QUOTATION);

  const [activeSection, setActiveSection] =
    useState("customer");

  const [loading, setLoading] = useState(false);

  /* ------------------------------------------------------------------------ */
  /* SIMPLE UPDATE                                                            */
  /* ------------------------------------------------------------------------ */

  const update = (section, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  /* ------------------------------------------------------------------------ */
  /* ARRAY UPDATE                                                             */
  /* ------------------------------------------------------------------------ */

  const updateArrayItem = (
    section,
    id,
    field,
    value
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: prev[section].map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item
      ),
    }));
  };

  /* ======================================================================== */
  /* HOTELS                                                                   */
  /* ======================================================================== */

  const addHotel = () => {
    const hotel = {
      id: makeId("hotel"),
      city: "New City",
      hotel: "Hotel Name",
      category: "4 Star",
      checkIn: "",
      checkOut: "",
      rooms: [],
    };

    setData((prev) => ({
      ...prev,
      stays: [...prev.stays, hotel],
    }));
  };

  const deleteHotel = (id) => {
    setData((prev) => ({
      ...prev,
      stays: prev.stays.filter(
        (item) => item.id !== id
      ),
    }));
  };

  /* ======================================================================== */
  /* ROOMS                                                                    */
  /* ======================================================================== */

  const addRoom = (hotelId) => {
    const room = {
      id: makeId("room"),
      room: `Room ${
        getHotelRoomCount(data, hotelId) + 1
      }`,
      type: "1 X Deluxe Room",
      guests: "2 Adults",
      meal: "Breakfast",
    };

    setData((prev) => ({
      ...prev,
      stays: prev.stays.map((hotel) =>
        hotel.id === hotelId
          ? {
              ...hotel,
              rooms: [
                ...hotel.rooms,
                room,
              ],
            }
          : hotel
      ),
    }));
  };

  const updateRoom = (
    hotelId,
    roomId,
    field,
    value
  ) => {
    setData((prev) => ({
      ...prev,
      stays: prev.stays.map((hotel) =>
        hotel.id === hotelId
          ? {
              ...hotel,
              rooms: hotel.rooms.map(
                (room) =>
                  room.id === roomId
                    ? {
                        ...room,
                        [field]: value,
                      }
                    : room
              ),
            }
          : hotel
      ),
    }));
  };

  const deleteRoom = (
    hotelId,
    roomId
  ) => {
    setData((prev) => ({
      ...prev,
      stays: prev.stays.map((hotel) =>
        hotel.id === hotelId
          ? {
              ...hotel,
              rooms: hotel.rooms.filter(
                (room) =>
                  room.id !== roomId
              ),
            }
          : hotel
      ),
    }));
  };

  /* ======================================================================== */
  /* FLIGHTS                                                                  */
  /* ======================================================================== */

  const addFlight = () => {
    const flight = {
      id: makeId("flight"),
      airline: "Airline",
      flight: "Flight",
      from: "",
      to: "",
      date: "",
      departure: "",
      arrival: "",
    };

    setData((prev) => ({
      ...prev,
      flights: [
        ...prev.flights,
        flight,
      ],
    }));
  };

  const deleteFlight = (id) => {
    setData((prev) => ({
      ...prev,
      flights: prev.flights.filter(
        (item) => item.id !== id
      ),
    }));
  };

  /* ======================================================================== */
  /* ITINERARY                                                                */
  /* ======================================================================== */

  const addItinerary = () => {
    const dayNumber =
      data.itinerary.length + 1;

    const item = {
      id: makeId("day"),
      day: String(dayNumber).padStart(
        2,
        "0"
      ),
      date: "",
      title: "New Day",
      description:
        "Add your itinerary description here.",
      breakfast: "Not Included",
      lunch: "Not Included",
      dinner: "Not Included",
    };

    setData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        item,
      ],
    }));
  };

  const deleteItinerary = (id) => {
    setData((prev) => ({
      ...prev,
      itinerary:
        prev.itinerary.filter(
          (item) => item.id !== id
        ),
    }));
  };

  /* ======================================================================== */
  /* INCLUSION / EXCLUSION                                                    */
  /* ======================================================================== */

  const addInclusion = () => {
    setData((prev) => ({
      ...prev,
      inclusions: [
        ...prev.inclusions,
        "New inclusion",
      ],
    }));
  };

  const updateInclusion = (
    index,
    value
  ) => {
    setData((prev) => ({
      ...prev,
      inclusions:
        prev.inclusions.map(
          (item, i) =>
            i === index
              ? value
              : item
        ),
    }));
  };

  const deleteInclusion = (
    index
  ) => {
    setData((prev) => ({
      ...prev,
      inclusions:
        prev.inclusions.filter(
          (_, i) => i !== index
        ),
    }));
  };

  const addExclusion = () => {
    setData((prev) => ({
      ...prev,
      exclusions: [
        ...prev.exclusions,
        "New exclusion",
      ],
    }));
  };

  const updateExclusion = (
    index,
    value
  ) => {
    setData((prev) => ({
      ...prev,
      exclusions:
        prev.exclusions.map(
          (item, i) =>
            i === index
              ? value
              : item
        ),
    }));
  };

  const deleteExclusion = (
    index
  ) => {
    setData((prev) => ({
      ...prev,
      exclusions:
        prev.exclusions.filter(
          (_, i) => i !== index
        ),
    }));
  };

  /* ======================================================================== */
  /* IMAGE UPLOAD                                                             */
  /* ======================================================================== */

  const selectCover = (event) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    const url =
      URL.createObjectURL(file);

    setData((prev) => ({
      ...prev,
      cover: {
        ...prev.cover,
        image: url,
      },
    }));
  };

  /* ======================================================================== */
  /* TOTAL                                                                    */
  /* ======================================================================== */

  const total = useMemo(() => {
    return (
      Number(
        data.pricing.packageTotal || 0
      ) +
      Number(
        data.pricing.flightTotal || 0
      )
    );
  }, [data.pricing]);

  /* ======================================================================== */
  /* PDF DOWNLOAD                                                             */
  /* ======================================================================== */

  const downloadPDF = async () => {
    if (!quotationRef.current) {
      alert("Quotation preview not found.");
      return;
    }

    try {
      setLoading(true);

      await waitForImages(
        quotationRef.current
      );

      const pages =
        quotationRef.current.querySelectorAll(
          ".pdf-page"
        );

      if (!pages.length) {
        throw new Error(
          "No A4 pages found."
        );
      }

      const customerName =
        data.customer.name
          ?.trim()
          .replace(
            /[^a-zA-Z0-9 ]/g,
            ""
          )
          .replace(/\s+/g, "-") ||
        "Customer";

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
      });

      for (
        let index = 0;
        index < pages.length;
        index++
      ) {
        const page = pages[index];

        /*
         * Force the browser to paint the page
         * before html2canvas captures it.
         */
        await new Promise((resolve) =>
          requestAnimationFrame(() =>
            requestAnimationFrame(resolve)
          )
        );

        const canvas =
          await html2canvas(page, {
            scale: 2,

            backgroundColor:
              "#ffffff",

            useCORS: true,

            allowTaint: true,

            logging: false,

            width: 794,

            height: 1123,

            windowWidth: 794,

            windowHeight: 1123,

            scrollX: 0,

            scrollY: 0,
          });

        const image =
          canvas.toDataURL(
            "image/jpeg",
            0.96
          );

        if (index > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          image,
          "JPEG",
          0,
          0,
          210,
          297,
          undefined,
          "FAST"
        );
      }

      pdf.save(
        `${customerName}-Quotation.pdf`
      );
    } catch (error) {
      console.error(
        "PDF GENERATION ERROR:",
        error
      );

      alert(
        "Unable to generate PDF.\n\n" +
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  /* ======================================================================== */
  /* UI                                                                       */
  /* ======================================================================== */

  return (
    <div className="min-h-screen bg-slate-100">

      {/* ================================================================ */}
      {/* HEADER                                                           */}
      {/* ================================================================ */}

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">

        <div className="flex h-[72px] items-center justify-between px-6">

          <div>
            <h1 className="text-xl font-extrabold text-slate-900">
              Quotation Builder
            </h1>

            <p className="text-xs text-slate-500">
              {BRAND.company} • Live A4
              quotation
            </p>
          </div>

          <button
            type="button"
            onClick={downloadPDF}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              backgroundColor:
                BRAND.orange,
            }}
          >
            <DownloadIcon />

            {loading
              ? "Generating..."
              : "Download PDF"}
          </button>

        </div>

      </header>

      {/* ================================================================ */}
      {/* LEFT + RIGHT                                                     */}
      {/* ================================================================ */}

      <div className="grid lg:grid-cols-[480px_1fr]">

        {/* ============================================================ */}
        {/* BUILDER                                                       */}
        {/* ============================================================ */}

        <aside className="h-[calc(100vh-72px)] overflow-y-auto border-r border-slate-200 bg-white">

          <div className="space-y-4 p-5">

            {/* CUSTOMER */}

            <BuilderSection
              title="Customer Details"
              icon={<UserIcon />}
              active={
                activeSection ===
                "customer"
              }
              onClick={() =>
                toggleSection(
                  activeSection,
                  setActiveSection,
                  "customer"
                )
              }
            >

              <div className="space-y-3">

                <Input
                  label="Customer Name"
                  value={
                    data.customer.name
                  }
                  onChange={(value) =>
                    update(
                      "customer",
                      "name",
                      value
                    )
                  }
                />

                <Input
                  label="Email"
                  value={
                    data.customer.email
                  }
                  onChange={(value) =>
                    update(
                      "customer",
                      "email",
                      value
                    )
                  }
                />

                <Input
                  label="Phone"
                  value={
                    data.customer.phone
                  }
                  onChange={(value) =>
                    update(
                      "customer",
                      "phone",
                      value
                    )
                  }
                />

              </div>

            </BuilderSection>

            {/* QUOTATION */}

            <BuilderSection
              title="Quotation & Trip"
              icon={<DocumentIcon />}
              active={
                activeSection ===
                "quotation"
              }
              onClick={() =>
                toggleSection(
                  activeSection,
                  setActiveSection,
                  "quotation"
                )
              }
            >

              <div className="grid grid-cols-2 gap-3">

                <Input
                  label="Quotation No."
                  value={
                    data.quotation.number
                  }
                  onChange={(value) =>
                    update(
                      "quotation",
                      "number",
                      value
                    )
                  }
                />

                <Input
                  label="Created On"
                  value={
                    data.quotation.date
                  }
                  onChange={(value) =>
                    update(
                      "quotation",
                      "date",
                      value
                    )
                  }
                />

                <Input
                  label="Departure"
                  value={
                    data.quotation
                      .departure
                  }
                  onChange={(value) =>
                    update(
                      "quotation",
                      "departure",
                      value
                    )
                  }
                />

                <Input
                  label="Duration"
                  value={
                    data.quotation
                      .duration
                  }
                  onChange={(value) =>
                    update(
                      "quotation",
                      "duration",
                      value
                    )
                  }
                />

                <Input
                  label="Travellers"
                  value={
                    data.quotation
                      .travellers
                  }
                  onChange={(value) =>
                    update(
                      "quotation",
                      "travellers",
                      value
                    )
                  }
                />

                <Input
                  label="Destination"
                  value={
                    data.quotation
                      .destination
                  }
                  onChange={(value) =>
                    update(
                      "quotation",
                      "destination",
                      value
                    )
                  }
                />

                <div className="col-span-2">
                  <Input
                    label="Inclusions Label"
                    value={
                      data.quotation
                        .inclusionsLabel
                    }
                    onChange={(value) =>
                      update(
                        "quotation",
                        "inclusionsLabel",
                        value
                      )
                    }
                  />
                </div>

              </div>

            </BuilderSection>

            {/* COVER */}

            <BuilderSection
              title="Cover"
              icon={<ImageIcon />}
              active={
                activeSection ===
                "cover"
              }
              onClick={() =>
                toggleSection(
                  activeSection,
                  setActiveSection,
                  "cover"
                )
              }
            >

              <div className="space-y-4">

                <Input
                  label="Cover Heading"
                  value={
                    data.cover.title
                  }
                  onChange={(value) =>
                    update(
                      "cover",
                      "title",
                      value
                    )
                  }
                />

                <Input
                  label="Destination"
                  value={
                    data.cover
                      .destination
                  }
                  onChange={(value) =>
                    update(
                      "cover",
                      "destination",
                      value
                    )
                  }
                />

                <FileInput
                  label="Cover Image"
                  onChange={selectCover}
                />

                {data.cover.image && (
                  <img
                    src={data.cover.image}
                    alt=""
                    className="h-32 w-full rounded-xl object-cover"
                  />
                )}

              </div>

            </BuilderSection>

            {/* STAYS */}

            <BuilderSection
              title="Stays"
              icon={<HotelIcon />}
              active={
                activeSection ===
                "stays"
              }
              onClick={() =>
                toggleSection(
                  activeSection,
                  setActiveSection,
                  "stays"
                )
              }
            >

              <AddButton
                label="Add Hotel"
                onClick={addHotel}
              />

              <div className="mt-4 space-y-4">

                {data.stays.map(
                  (hotel, hotelIndex) => (

                    <div
                      key={hotel.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >

                      <div className="mb-4 flex items-center justify-between">

                        <div className="flex items-center gap-3">

                          <div
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                            style={{
                              backgroundColor:
                                BRAND.orange,
                            }}
                          >
                            {hotelIndex + 1}
                          </div>

                          <div>
                            <p className="text-sm font-bold">
                              {hotel.hotel ||
                                "Hotel"}
                            </p>

                            <p className="text-[11px] text-slate-500">
                              {hotel.city ||
                                "City"}
                            </p>
                          </div>

                        </div>

                        <IconButton
                          title="Delete hotel"
                          danger
                          onClick={() =>
                            deleteHotel(
                              hotel.id
                            )
                          }
                        >
                          <TrashIcon />
                        </IconButton>

                      </div>

                      <div className="grid grid-cols-2 gap-3">

                        <Input
                          label="Hotel"
                          value={
                            hotel.hotel
                          }
                          onChange={(
                            value
                          ) =>
                            updateArrayItem(
                              "stays",
                              hotel.id,
                              "hotel",
                              value
                            )
                          }
                        />

                        <Input
                          label="City"
                          value={
                            hotel.city
                          }
                          onChange={(
                            value
                          ) =>
                            updateArrayItem(
                              "stays",
                              hotel.id,
                              "city",
                              value
                            )
                          }
                        />

                        <Input
                          label="Category"
                          value={
                            hotel.category
                          }
                          onChange={(
                            value
                          ) =>
                            updateArrayItem(
                              "stays",
                              hotel.id,
                              "category",
                              value
                            )
                          }
                        />

                        <Input
                          label="Check In"
                          value={
                            hotel.checkIn
                          }
                          onChange={(
                            value
                          ) =>
                            updateArrayItem(
                              "stays",
                              hotel.id,
                              "checkIn",
                              value
                            )
                          }
                        />

                        <Input
                          label="Check Out"
                          value={
                            hotel.checkOut
                          }
                          onChange={(
                            value
                          ) =>
                            updateArrayItem(
                              "stays",
                              hotel.id,
                              "checkOut",
                              value
                            )
                          }
                        />

                      </div>

                      {/* ROOMS */}

                      <div className="mt-5 border-t border-slate-200 pt-4">

                        <div className="mb-3 flex items-center justify-between">

                          <span className="text-xs font-bold text-slate-700">
                            Rooms
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              addRoom(
                                hotel.id
                              )
                            }
                            className="text-xs font-bold"
                            style={{
                              color:
                                BRAND.orange,
                            }}
                          >
                            + Add Room
                          </button>

                        </div>

                        <div className="space-y-3">

                          {hotel.rooms.map(
                            (room) => (

                              <div
                                key={
                                  room.id
                                }
                                className="rounded-xl border border-slate-200 bg-white p-3"
                              >

                                <div className="mb-3 flex items-center justify-between">

                                  <span className="text-xs font-bold">
                                    {room.room}
                                  </span>

                                  <IconButton
                                    title="Delete room"
                                    danger
                                    onClick={() =>
                                      deleteRoom(
                                        hotel.id,
                                        room.id
                                      )
                                    }
                                  >
                                    <TrashIcon />
                                  </IconButton>

                                </div>

                                <div className="grid grid-cols-2 gap-2">

                                  <Input
                                    label="Room"
                                    value={
                                      room.room
                                    }
                                    onChange={(
                                      value
                                    ) =>
                                      updateRoom(
                                        hotel.id,
                                        room.id,
                                        "room",
                                        value
                                      )
                                    }
                                  />

                                  <Input
                                    label="Room Type"
                                    value={
                                      room.type
                                    }
                                    onChange={(
                                      value
                                    ) =>
                                      updateRoom(
                                        hotel.id,
                                        room.id,
                                        "type",
                                        value
                                      )
                                    }
                                  />

                                  <Input
                                    label="Guests"
                                    value={
                                      room.guests
                                    }
                                    onChange={(
                                      value
                                    ) =>
                                      updateRoom(
                                        hotel.id,
                                        room.id,
                                        "guests",
                                        value
                                      )
                                    }
                                  />

                                  <Input
                                    label="Meal"
                                    value={
                                      room.meal
                                    }
                                    onChange={(
                                      value
                                    ) =>
                                      updateRoom(
                                        hotel.id,
                                        room.id,
                                        "meal",
                                        value
                                      )
                                    }
                                  />

                                </div>

                              </div>

                            )
                          )}

                          {hotel.rooms
                            .length ===
                            0 && (
                            <EmptySmall
                              text="No rooms added"
                            />
                          )}

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            </BuilderSection>

            {/* FLIGHTS */}

            <BuilderSection
              title="Flights"
              icon={<FlightIcon />}
              active={
                activeSection ===
                "flights"
              }
              onClick={() =>
                toggleSection(
                  activeSection,
                  setActiveSection,
                  "flights"
                )
              }
            >

              <AddButton
                label="Add Flight"
                onClick={addFlight}
              />

              <div className="mt-4 space-y-4">

                {data.flights.map(
                  (flight, index) => (

                    <div
                      key={flight.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >

                      <div className="mb-4 flex items-center justify-between">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                            <FlightIcon />
                          </div>

                          <div>
                            <p className="text-sm font-bold">
                              {flight.airline ||
                                "New Flight"}
                            </p>

                            <p className="text-[11px] text-slate-500">
                              {flight.flight ||
                                "Flight"}
                            </p>
                          </div>

                        </div>

                        <IconButton
                          title="Delete flight"
                          danger
                          onClick={() =>
                            deleteFlight(
                              flight.id
                            )
                          }
                        >
                          <TrashIcon />
                        </IconButton>

                      </div>

                      <div className="grid grid-cols-2 gap-3">

                        {[
                          [
                            "airline",
                            "Airline",
                          ],
                          [
                            "flight",
                            "Flight",
                          ],
                          [
                            "from",
                            "From",
                          ],
                          [
                            "to",
                            "To",
                          ],
                          [
                            "date",
                            "Date",
                          ],
                          [
                            "departure",
                            "Departure",
                          ],
                          [
                            "arrival",
                            "Arrival",
                          ],
                        ].map(
                          ([
                            field,
                            label,
                          ]) => (

                            <Input
                              key={
                                field
                              }
                              label={
                                label
                              }
                              value={
                                flight[
                                  field
                                ]
                              }
                              onChange={(
                                value
                              ) =>
                                updateArrayItem(
                                  "flights",
                                  flight.id,
                                  field,
                                  value
                                )
                              }
                            />

                          )
                        )}

                      </div>

                    </div>

                  )
                )}

              </div>

            </BuilderSection>

            {/* ITINERARY */}

            <BuilderSection
              title="Itinerary"
              icon={<MapIcon />}
              active={
                activeSection ===
                "itinerary"
              }
              onClick={() =>
                toggleSection(
                  activeSection,
                  setActiveSection,
                  "itinerary"
                )
              }
            >

              <AddButton
                label="Add Itinerary Day"
                onClick={
                  addItinerary
                }
              />

              <div className="mt-4 space-y-4">

                {data.itinerary.map(
                  (item) => (

                    <div
                      key={item.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >

                      <div className="mb-4 flex items-center justify-between">

                        <div>

                          <p className="text-sm font-bold">
                            Day{" "}
                            {item.day}
                          </p>

                          <p className="text-[11px] text-slate-500">
                            {item.title}
                          </p>

                        </div>

                        <IconButton
                          title="Delete day"
                          danger
                          onClick={() =>
                            deleteItinerary(
                              item.id
                            )
                          }
                        >
                          <TrashIcon />
                        </IconButton>

                      </div>

                      <div className="space-y-3">

                        <div className="grid grid-cols-2 gap-3">

                          <Input
                            label="Day"
                            value={
                              item.day
                            }
                            onChange={(
                              value
                            ) =>
                              updateArrayItem(
                                "itinerary",
                                item.id,
                                "day",
                                value
                              )
                            }
                          />

                          <Input
                            label="Date"
                            value={
                              item.date
                            }
                            onChange={(
                              value
                            ) =>
                              updateArrayItem(
                                "itinerary",
                                item.id,
                                "date",
                                value
                              )
                            }
                          />

                        </div>

                        <Input
                          label="Title"
                          value={
                            item.title
                          }
                          onChange={(
                            value
                          ) =>
                            updateArrayItem(
                              "itinerary",
                              item.id,
                              "title",
                              value
                            )
                          }
                        />

                        <Textarea
                          label="Description"
                          value={
                            item.description
                          }
                          onChange={(
                            value
                          ) =>
                            updateArrayItem(
                              "itinerary",
                              item.id,
                              "description",
                              value
                            )
                          }
                        />

                        <div className="grid grid-cols-3 gap-2">

                          <SelectInput
                            label="Breakfast"
                            value={
                              item.breakfast
                            }
                            options={[
                              "Included",
                              "Not Included",
                            ]}
                            onChange={(
                              value
                            ) =>
                              updateArrayItem(
                                "itinerary",
                                item.id,
                                "breakfast",
                                value
                              )
                            }
                          />

                          <SelectInput
                            label="Lunch"
                            value={
                              item.lunch
                            }
                            options={[
                              "Included",
                              "Not Included",
                            ]}
                            onChange={(
                              value
                            ) =>
                              updateArrayItem(
                                "itinerary",
                                item.id,
                                "lunch",
                                value
                              )
                            }
                          />

                          <SelectInput
                            label="Dinner"
                            value={
                              item.dinner
                            }
                            options={[
                              "Included",
                              "Not Included",
                            ]}
                            onChange={(
                              value
                            ) =>
                              updateArrayItem(
                                "itinerary",
                                item.id,
                                "dinner",
                                value
                              )
                            }
                          />

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            </BuilderSection>

            {/* INCLUSIONS */}

            <BuilderSection
              title="Inclusions"
              icon={<CheckIcon />}
              active={
                activeSection ===
                "inclusions"
              }
              onClick={() =>
                toggleSection(
                  activeSection,
                  setActiveSection,
                  "inclusions"
                )
              }
            >

              <AddButton
                label="Add Inclusion"
                onClick={
                  addInclusion
                }
                green
              />

              <div className="mt-4 space-y-2">

                {data.inclusions.map(
                  (item, index) => (

                    <EditableListItem
                      key={index}
                      value={item}
                      onChange={(value) =>
                        updateInclusion(
                          index,
                          value
                        )
                      }
                      onDelete={() =>
                        deleteInclusion(
                          index
                        )
                      }
                    />

                  )
                )}

              </div>

            </BuilderSection>

            {/* EXCLUSIONS */}

            <BuilderSection
              title="Exclusions"
              icon={<XIcon />}
              active={
                activeSection ===
                "exclusions"
              }
              onClick={() =>
                toggleSection(
                  activeSection,
                  setActiveSection,
                  "exclusions"
                )
              }
            >

              <AddButton
                label="Add Exclusion"
                onClick={
                  addExclusion
                }
                red
              />

              <div className="mt-4 space-y-2">

                {data.exclusions.map(
                  (item, index) => (

                    <EditableListItem
                      key={index}
                      value={item}
                      onChange={(value) =>
                        updateExclusion(
                          index,
                          value
                        )
                      }
                      onDelete={() =>
                        deleteExclusion(
                          index
                        )
                      }
                    />

                  )
                )}

              </div>

            </BuilderSection>

            {/* FARE */}

            <BuilderSection
              title="Fare Summary"
              icon={<MoneyIcon />}
              active={
                activeSection ===
                "fare"
              }
              onClick={() =>
                toggleSection(
                  activeSection,
                  setActiveSection,
                  "fare"
                )
              }
            >

              <div className="grid grid-cols-2 gap-3">

                <Input
                  label="Package / Adult"
                  type="number"
                  value={
                    data.pricing
                      .packagePerAdult
                  }
                  onChange={(value) =>
                    update(
                      "pricing",
                      "packagePerAdult",
                      value
                    )
                  }
                />

                <Input
                  label="Package Total"
                  type="number"
                  value={
                    data.pricing
                      .packageTotal
                  }
                  onChange={(value) =>
                    update(
                      "pricing",
                      "packageTotal",
                      value
                    )
                  }
                />

                <Input
                  label="Flight / Adult"
                  type="number"
                  value={
                    data.pricing
                      .flightPerAdult
                  }
                  onChange={(value) =>
                    update(
                      "pricing",
                      "flightPerAdult",
                      value
                    )
                  }
                />

                <Input
                  label="Flight Total"
                  type="number"
                  value={
                    data.pricing
                      .flightTotal
                  }
                  onChange={(value) =>
                    update(
                      "pricing",
                      "flightTotal",
                      value
                    )
                  }
                />

              </div>

            </BuilderSection>

            {/* FIXED POLICIES */}

            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-500">
                  <LockIcon />
                </div>

                <div>

                  <p className="text-sm font-bold text-slate-800">
                    Fixed Policies
                  </p>

                  <p className="text-[11px] text-slate-500">
                    Automatically included
                    in every quotation
                  </p>

                </div>

              </div>

              <p className="mt-3 text-[11px] leading-5 text-slate-600">
                Payment, refund,
                cancellation, airline
                refund, liability and
                important terms are
                fixed and do not need
                to be entered again.
              </p>

            </div>

          </div>

        </aside>

        {/* ============================================================ */}
        {/* PREVIEW                                                       */}
        {/* ============================================================ */}

        <main className="h-[calc(100vh-72px)] overflow-y-auto bg-slate-200 p-8">

          <div className="mx-auto max-w-[900px]">

            <div className="mb-6 flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Live Preview
                </h2>

                <p className="text-xs text-slate-500">
                  This is the exact A4
                  document used for PDF
                  generation.
                </p>

              </div>

              <div className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-sm">
                A4 • {countPreviewPages(data)}
                {" "}
                Pages
              </div>

            </div>

            {/* ====================================================== */}
            {/* PDF DOCUMENT                                           */}
            {/* ====================================================== */}

            <div
              ref={quotationRef}
              className="quotation-document"
            >

              {/* COVER */}

              <CoverPage
                data={data}
              />

              {/* STAYS */}

              <StaysPage
                data={data}
              />

              {/* FLIGHTS */}

              <FlightsPage
                data={data}
              />

              {/* ITINERARY
                  2 DAYS PER PAGE
              */}

              {chunk(
                data.itinerary,
                2
              ).map(
                (items, index) => (

                  <ItineraryPage
                    key={
                      `itinerary-${index}`
                    }
                    items={items}
                    data={data}
                  />

                )
              )}

              {/* INCLUSIONS */}

              <InclusionsPage
                data={data}
              />

              {/* FARE */}

              <FarePage
                data={data}
                total={total}
              />

              {/* POLICIES */}

              <PolicyPage
                title="Payment Policy"
                items={
                  PAYMENT_POLICY
                }
                data={data}
              />

              <PolicyPage
                title="Refund Policy"
                items={
                  REFUND_POLICY
                }
                data={data}
              />

              <PolicyPage
                title="Policy & Important Terms"
                items={
                  IMPORTANT_TERMS
                }
                data={data}
              />

              <PolicyPage
                title="Cancellation Policy"
                items={
                  CANCELLATION_POLICY
                }
                data={data}
              />

              <PolicyPage
                title="Airline Refund Policy"
                items={
                  AIRLINE_REFUND_POLICY
                }
                data={data}
              />

              <PolicyPage
                title="Our Liabilities & Limitations"
                items={
                  LIABILITY_POLICY
                }
                data={data}
              />

              {/* FINAL */}

              <FinalPage data={data} />

            </div>

          </div>

        </main>

      </div>

      {/* ================================================================ */}
      {/* PDF CSS                                                         */}
      {/* ================================================================ */}

      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        /*
         * IMPORTANT:
         * PDF pages use PX instead of mm.
         *
         * 794 x 1123 is approximately A4
         * at 96 DPI.
         *
         * This keeps html2canvas capture
         * predictable.
         */

        .quotation-document {
          width: 794px;
          background: #ffffff;
          color: #242424;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        .pdf-page {
          position: relative;

          width: 794px;
          height: 1123px;

          min-width: 794px;
          max-width: 794px;

          min-height: 1123px;
          max-height: 1123px;

          overflow: hidden;

          background: #ffffff;

          page-break-after: always;
          break-after: page;

          page-break-inside: avoid;
          break-inside: avoid;
        }

        .pdf-page:last-child {
          page-break-after: auto;
          break-after: auto;
        }

        .pdf-footer {
          position: absolute;

          left: 49px;
          right: 49px;
          bottom: 28px;

          height: 18px;

          display: flex;
          align-items: center;
          justify-content: space-between;

          border-top: 1px solid #e4e4e4;

          padding-top: 7px;

          font-size: 8px;

          color: #777777;
        }

        .pdf-content {
          padding-left: 49px;
          padding-right: 49px;
          padding-top: 45px;
          padding-bottom: 60px;
        }

        .pdf-section-title {
          margin: 0;
          font-size: 27px;
          line-height: 1.05;
          font-weight: 800;
          color: #242424;
        }

        .pdf-section-line {
          width: 100px;
          height: 3px;
          margin-top: 12px;
          background: #f15a24;
        }

        .pdf-orange {
          color: #f15a24;
        }

        .pdf-orange-bg {
          background-color: #f15a24;
        }

        .pdf-gray-bg {
          background-color: #f4f4f4;
        }

        .pdf-blue-bg {
          background-color: #eaf6ff;
        }

        .pdf-green-bg {
          background-color: #edf9f0;
        }

        .pdf-red-bg {
          background-color: #fff0f1;
        }

        /*
         * Avoid any Tailwind generated modern
         * color functions inside PDF content.
         */

        .quotation-document,
        .quotation-document * {
          --tw-ring-color: transparent !important;
        }

        @page {
          size: A4;
          margin: 0;
        }

        @media print {

          body {
            margin: 0;
            padding: 0;
            background: white;
          }

          .quotation-document {
            width: 794px;
          }

          .pdf-page {
            margin: 0;
            box-shadow: none;
          }

        }

      `}</style>

    </div>
  );
}

/* ========================================================================== */
/* COVER PAGE                                                                 */
/* ========================================================================== */
function CoverPage({ data }) {
  return (
    <section
      className="pdf-page"
      style={{
        width: "210mm",
        minHeight: "297mm",
        background: "#fff",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#222",
        overflow: "hidden",
      }}
    >
      {/* =====================================================
          HERO IMAGE
      ====================================================== */}

      <div
        style={{
          position: "relative",
          width: "100%",
          height: 655,
          overflow: "hidden",
        }}
      >
        {data.cover.image ? (
          <img
            src={data.cover.image}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: BRAND.orange,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                color: "#fff",
                fontSize: 50,
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              {data.cover.destination}
            </div>
          </div>
        )}

        {/* DARK OVERLAY */}

        {data.cover.image && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.18)",
            }}
          />
        )}

        {/* =================================================
            HERO TEXT
        ================================================== */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          {/* SCRIPT TITLE */}

          <div
            style={{
              color: "#ff5722",
              fontFamily:
                "'Brush Script MT', 'Segoe Script', cursive",
              fontSize: 70,
              lineHeight: 0.9,
              fontWeight: 500,
              transform: "rotate(-2deg)",
              textShadow:
                "0 1px 2px rgba(0,0,0,0.25)",
            }}
          >
            {data.cover.title}
          </div>

          {/* DESTINATION */}

          <div
            style={{
              marginTop: 20,
              color: "#fff",
              fontSize: 50,
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            {data.cover.destination}
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div
        style={{
          padding: "24px 30px 25px",
        }}
      >
        {/* =================================================
            CUSTOMER TITLE
        ================================================== */}

        <div>
          <div
            style={{
              fontSize: 18,
              lineHeight: 1.2,
              fontWeight: 700,
              color: "#222",
            }}
          >
            {data.customer.name}

            <span
              style={{
                fontWeight: 400,
                color: "#777",
              }}
            >
              {" "}
              {data.quotation.duration} trip to
            </span>
          </div>

          <div
            style={{
              marginTop: 5,
              fontSize: 42,
              lineHeight: 1,
              fontWeight: 800,
              color: BRAND.orange,
            }}
          >
            {data.quotation.destination}
          </div>
        </div>

        {/* =================================================
            TRIP INFORMATION TABLE
        ================================================== */}

        <div
          style={{
            marginTop: 27,
            border: "1px solid #ccc",
            borderRadius: 9,
            overflow: "hidden",
          }}
        >
          {/* DEPARTURE */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "27% 73%",
              minHeight: 39,
              borderBottom: "1px solid #ddd",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 10px",
                background: "#f4f4f4",
                fontSize: 14,
                fontWeight: 700,
                color: "#444",
              }}
            >
              DEPARTURE:
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 12px",
                fontSize: 14,
              }}
            >
              {data.quotation.departure}
            </div>
          </div>

          {/* DURATION */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "27% 73%",
              minHeight: 39,
              borderBottom: "1px solid #ddd",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 10px",
                background: "#f4f4f4",
                fontSize: 14,
                fontWeight: 700,
                color: "#444",
              }}
            >
              DURATION:
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 12px",
                fontSize: 14,
              }}
            >
              {data.quotation.duration}
            </div>
          </div>

          {/* TRAVELLERS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "27% 73%",
              minHeight: 39,
              borderBottom: "1px solid #ddd",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 10px",
                background: "#f4f4f4",
                fontSize: 14,
                fontWeight: 700,
                color: "#444",
              }}
            >
              TRAVELLERS:
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 12px",
                fontSize: 14,
              }}
            >
              {data.quotation.travellers}
            </div>
          </div>

          {/* INCLUSIONS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "27% 73%",
              minHeight: 48,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "7px 10px",
                background: "#f4f4f4",
                fontSize: 14,
                fontWeight: 700,
                color: "#444",
              }}
            >
              INCLUSIONS:
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "7px 12px",
                fontSize: 13,
              }}
            >
              {data.quotation.inclusionsLabel
                .split(" ")
                .map((item, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "3px 10px",
                      border: "1px solid #ccc",
                      background: "#f5f5f5",
                      fontSize: 12,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item}
                  </span>
                ))}
            </div>
          </div>
        </div>

        {/* =================================================
            CURATED BY
        ================================================== */}

        <div
          style={{
            marginTop: 12,
            border: "1px solid #d8c9c0",
            borderRadius: 8,
            background: "#fff3eb",
            padding: "12px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            Curated by
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            {/* CURATOR */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 11,
              }}
            >
              {/* BRAND PLACEHOLDER */}

              <div
                style={{
                  width: 80,
                  height: 80,
                  background: "#e5e5e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: BRAND.orange,
                  flexShrink: 0,
                }}
              >
                PVJ
              </div>

              <div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {BRAND.displayName}
                </div>

                <div
                  style={{
                    marginTop: 2,
                    fontSize: 14,
                  }}
                >
                  Call: {BRAND.phone}
                </div>

                <div
                  style={{
                    marginTop: 2,
                    fontSize: 14,
                  }}
                >
                  Email: {BRAND.email}
                </div>
              </div>
            </div>

            {/* CREATED DATE */}

            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                whiteSpace: "nowrap",
              }}
            >
              Quotation Created on{" "}
              {data.quotation.date}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/* STAYS PAGE                                                                 */
/* ========================================================================== */

function StaysPage({ data }) {
  return (
    <section className="pdf-page">

      <div className="pdf-content">

        <SectionTitle title="STAYS" />

        <div
          style={{
            marginTop: 30,
          }}
        >

          {data.stays.map(
            (hotel, index) => (

              <div
                key={hotel.id}
                style={{
                  marginBottom: 22,
                  overflow: "hidden",
                  backgroundColor:
                    "#f4f4f4",
                }}
              >

                {/* HOTEL HEADER */}

                <div
                  style={{
                    padding:
                      "17px 18px 13px",
                  }}
                >

                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "flex-start",
                      justifyContent:
                        "space-between",
                    }}
                  >

                    <div>

                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 800,
                        }}
                      >
                        {hotel.hotel}
                      </div>

                      <div
                        style={{
                          marginTop: 4,
                          fontSize: 10,
                          color: "#666666",
                        }}
                      >
                        {hotel.city}
                      </div>

                      <div
                        style={{
                          marginTop: 5,
                          fontSize: 10,
                          fontWeight: 700,
                          color:
                            BRAND.orange,
                        }}
                      >
                        {hotel.category}
                      </div>

                    </div>

                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 16,
                        display: "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center",
                        color: "#ffffff",
                        fontWeight: 800,
                        fontSize: 12,
                        backgroundColor:
                          BRAND.orange,
                      }}
                    >
                      {index + 1}
                    </div>

                  </div>

                  <div
                    style={{
                      marginTop: 11,
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                  >
                    Check-In:{" "}
                    {hotel.checkIn}
                    {" | "}
                    Check-Out:{" "}
                    {hotel.checkOut}
                  </div>

                </div>

                {/* ROOMS */}

                {hotel.rooms.map(
                  (room) => (

                    <div
                      key={room.id}
                      style={{
                        padding:
                          "13px 18px",
                        backgroundColor:
                          "#eaf6ff",
                        borderTop:
                          "1px solid #ffffff",
                      }}
                    >

                      <div
                        style={{
                          display: "flex",
                          alignItems:
                            "center",
                          justifyContent:
                            "space-between",
                        }}
                      >

                        <div>

                          <div
                            style={{
                              fontSize: 10,
                              fontWeight: 800,
                              color:
                                "#146b8c",
                            }}
                          >
                            {room.room}
                          </div>

                          <div
                            style={{
                              marginTop: 4,
                              fontSize: 10,
                            }}
                          >
                            {room.type}
                          </div>

                          <div
                            style={{
                              marginTop: 3,
                              fontSize: 9,
                              color:
                                "#666666",
                            }}
                          >
                            {room.guests}
                          </div>

                        </div>

                        <div
                          style={{
                            padding:
                              "5px 10px",
                            borderRadius: 20,
                            backgroundColor:
                              "#ffffff",
                            fontSize: 8,
                            fontWeight: 700,
                            color:
                              "#146b8c",
                          }}
                        >
                          {room.meal}
                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            )
          )}

        </div>

        {/* NOTE */}

        <div
          style={{
            marginTop: 15,
            padding: 12,
            backgroundColor:
              "#fff0f1",
            color: "#a23845",
            fontSize: 10,
            fontWeight: 700,
          }}
        >
          Note : Rooms and rates are
          subject to availability.
        </div>

      </div>

      <Footer />

    </section>
  );
}

/* ========================================================================== */
/* FLIGHTS PAGE                                                               */
/* ========================================================================== */
function FlightsPage({ data }) {
  return (
    <section
      className="pdf-page"
      style={{
        width: "210mm",
        minHeight: "297mm",
        backgroundColor: "#ffffff",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#222222",
        overflow: "hidden",
      }}
    >
      <div
        className="pdf-content"
        style={{
          padding: "38px 38px 30px",
        }}
      >
        {/* =====================================================
            SECTION TITLE
        ====================================================== */}

        <SectionTitle title="FLIGHTS" />

        {/* =====================================================
            FLIGHTS
        ====================================================== */}

        <div
          style={{
            marginTop: 38,
          }}
        >
          {data.flights.map((flight, index) => (
            <FlightCard
              key={flight.id || index}
              flight={flight}
              index={index}
            />
          ))}
        </div>

        {/* =====================================================
            PRICE NOTE
        ====================================================== */}

        <div
          style={{
            marginTop: 8,
            padding: "9px 11px",
            backgroundColor: "#f9d9dc",
            color: "#a23845",
            fontSize: 10,
            lineHeight: 1.2,
          }}
        >
          Note : Prices are dynamic and can change at any point
          of time.
        </div>
      </div>

      <Footer />
    </section>
  );
}

function FlightCard({ flight, index }) {
  return (
    <div
      style={{
        marginBottom: index === 0 ? 10 : 0,
      }}
    >
      {/* =====================================================
          ROUTE HEADER
      ====================================================== */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT */}

        <div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 800,
              color: "#222222",
              lineHeight: 1.2,
            }}
          >
            {flight.from} → {flight.to}
          </div>

          <div
            style={{
              marginTop: 4,
              fontSize: 9,
              color: "#777777",
            }}
          >
            {flight.date ||
              flight.departureDate ||
              ""}
            {flight.date || flight.departureDate
              ? " "
              : ""}
            {flight.stops || "Non Stop"}
            {flight.duration
              ? ` • ${flight.duration}`
              : ""}
          </div>
        </div>

        {/* RIGHT */}

        <div
          style={{
            textAlign: "right",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "3px 7px",
              backgroundColor: "#d71920",
              color: "#ffffff",
              fontSize: 6.5,
              fontWeight: 800,
              borderRadius: 2,
            }}
          >
            NON REFUNDABLE
          </div>

          <div
            style={{
              marginTop: 5,
              fontSize: 8,
              color: "#0877bd",
              fontWeight: 700,
            }}
          >
            View Fare Rules
          </div>
        </div>
      </div>

      {/* =====================================================
          AIRLINE ROW
      ====================================================== */}

      <div
        style={{
          marginTop: 17,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* AIRLINE */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          {/* AIRLINE LOGO PLACEHOLDER */}

          <div
            style={{
              width: 23,
              height: 23,
              backgroundColor: "#d71920",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 6,
              fontWeight: 800,
            }}
          >
            ✈
          </div>

          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                color: "#333333",
              }}
            >
              {flight.airline}
              {flight.flight
                ? ` ${flight.flight}`
                : ""}
            </div>

            <div
              style={{
                marginTop: 2,
                fontSize: 7,
                color: "#777777",
              }}
            >
              320 | Operated by{" "}
              {flight.airline}
            </div>
          </div>
        </div>

        {/* CABIN */}

        <div
          style={{
            fontSize: 8,
            color: "#555555",
          }}
        >
          {flight.cabin ||
            flight.class ||
            "Economy"}{" "}
          ›{" "}
          <span
            style={{
              color: "#478b82",
              fontWeight: 700,
            }}
          >
            Eco
          </span>
        </div>
      </div>

      {/* =====================================================
          FLIGHT TIMELINE
      ====================================================== */}

      <div
        style={{
          marginTop: 12,
          padding: "10px 10px 8px",
          backgroundColor: "#f3f3f3",
        }}
      >
        {/* DEPARTURE */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "42px 14px 1fr",
            alignItems: "center",
            minHeight: 25,
          }}
        >
          {/* TIME */}

          <div
            style={{
              fontSize: 9,
              fontWeight: 800,
            }}
          >
            {flight.departureTime ||
              flight.departure ||
              "--:--"}
          </div>

          {/* DOT */}

          <div
            style={{
              position: "relative",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 9,
                height: 9,
                border: "1.5px solid #aaa",
                borderRadius: "50%",
                backgroundColor: "#fff",
                zIndex: 2,
              }}
            />

            <div
              style={{
                position: "absolute",
                top: 8,
                bottom: -8,
                width: 1,
                borderLeft:
                  "1px dotted #aaa",
              }}
            />
          </div>

          {/* AIRPORT */}

          <div
            style={{
              fontSize: 8.5,
              color: "#444444",
            }}
          >
            <strong>
              {flight.from}
            </strong>{" "}
            {flight.fromAirport ||
              flight.fromName ||
              ""}
          </div>
        </div>

        {/* DURATION */}

        <div
          style={{
            marginLeft: 55,
            marginTop: -1,
            marginBottom: 1,
            fontSize: 8,
            color: "#555555",
          }}
        >
          {flight.duration || ""}
        </div>

        {/* ARRIVAL */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "42px 14px 1fr",
            alignItems: "center",
            minHeight: 25,
          }}
        >
          {/* TIME */}

          <div
            style={{
              fontSize: 9,
              fontWeight: 800,
            }}
          >
            {flight.arrivalTime ||
              flight.arrival ||
              "--:--"}
          </div>

          {/* DOT */}

          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: 9,
                height: 9,
                border: "1.5px solid #aaa",
                borderRadius: "50%",
                backgroundColor: "#fff",
              }}
            />
          </div>

          {/* AIRPORT */}

          <div
            style={{
              fontSize: 8.5,
              color: "#444444",
            }}
          >
            <strong>
              {flight.to}
            </strong>{" "}
            {flight.toAirport ||
              flight.toName ||
              ""}
          </div>
        </div>

        {/* =================================================
            BAGGAGE
        ================================================== */}

        <div
          style={{
            marginTop: 8,
            paddingTop: 7,
            borderTop:
              "1px solid #dddddd",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            fontSize: 7.5,
            color: "#555555",
          }}
        >
          <div>
            <span
              style={{
                fontSize: 10,
                marginRight: 5,
              }}
            >
              🧳
            </span>

            <strong>
              Cabin Baggage:
            </strong>{" "}
            {flight.cabinBaggage ||
              "7 Kgs / ADULT"}
          </div>

          <div>
            <span
              style={{
                fontSize: 10,
                marginRight: 5,
              }}
            >
              🧳
            </span>

            <strong>
              Check-in Baggage:
            </strong>{" "}
            {flight.checkInBaggage ||
              "20 Kgs / ADULT"}
          </div>
        </div>
      </div>

      {/* DIVIDER BETWEEN FLIGHTS */}

      <div
        style={{
          height: 1,
          backgroundColor: "#dddddd",
          marginTop: 7,
        }}
      />
    </div>
  );
}
/* ========================================================================== */
/* ITINERARY PAGE                                                             */
/* ========================================================================== */

function ItineraryPage({
  items,
  data,
}) {
  return (
    <section className="pdf-page">

      <div className="pdf-content">

        <SectionTitle title="ITINERARY" />

        <div
          style={{
            marginTop: 26,
          }}
        >

          {items.map(
            (item, index) => (

              <div
                key={item.id}
                style={{
                  paddingBottom:
                    index <
                    items.length - 1
                      ? 42
                      : 0,
                  marginBottom:
                    index <
                    items.length - 1
                      ? 38
                      : 0,
                  borderBottom:
                    index <
                    items.length - 1
                      ? "1px solid #eeeeee"
                      : "none",
                }}
              >

                {/* DATE / DAY */}

                <div
                  style={{
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "space-between",
                  }}
                >

                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#333333",
                    }}
                  >
                    {item.date}
                  </div>

                  <div
                    style={{
                      fontSize: 28,
                      lineHeight: 1,
                      fontWeight: 800,
                      color: "#333333",
                    }}
                  >
                    Day {item.day}
                  </div>

                </div>

                {/* TITLE */}

                <div
                  style={{
                    marginTop: 13,
                    fontSize: 18,
                    lineHeight: 1.25,
                    fontWeight: 800,
                    color:
                      BRAND.orange,
                  }}
                >
                  {item.title}
                </div>

                {/* DESCRIPTION */}

                <div
                  style={{
                    marginTop: 13,
                    fontSize: 10,
                    lineHeight: 1.55,
                    color: "#333333",
                  }}
                >
                  {item.description}
                </div>

                {/* MEALS */}

                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    gap: 25,
                    fontSize: 9,
                  }}
                >

                  <MealLine
                    icon="B"
                    label="Breakfast"
                    value={
                      item.breakfast
                    }
                  />

                  <MealLine
                    icon="L"
                    label="Lunch"
                    value={
                      item.lunch
                    }
                  />

                  <MealLine
                    icon="D"
                    label="Dinner"
                    value={
                      item.dinner
                    }
                  />

                </div>

              </div>

            )
          )}

        </div>

      </div>

      <Footer />

    </section>
  );
}

/* ========================================================================== */
/* INCLUSIONS PAGE                                                            */
/* ========================================================================== */

function InclusionsPage({ data }) {
  return (
    <section className="pdf-page">

      <div className="pdf-content">

        <SectionTitle title="INCLUSIONS & EXCLUSIONS" />

        <div
          style={{
            marginTop: 35,
            display: "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap: 22,
          }}
        >

          {/* INCLUSIONS */}

          <div>

            <div
              style={{
                padding: "13px 15px",
                backgroundColor:
                  "#edf9f0",
                color: "#287341",
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              ✓ Inclusions
            </div>

            <div
              style={{
                padding: 17,
                backgroundColor:
                  "#f8f8f8",
              }}
            >

              {data.inclusions.map(
                (item, index) => (

                  <ListLine
                    key={index}
                    icon="✓"
                    color="#2d8a4a"
                    value={item}
                  />

                )
              )}

            </div>

          </div>

          {/* EXCLUSIONS */}

          <div>

            <div
              style={{
                padding: "13px 15px",
                backgroundColor:
                  "#fff0f1",
                color: "#a23845",
                fontSize: 15,
                fontWeight: 800,
              }}
            >
              × Exclusions
            </div>

            <div
              style={{
                padding: 17,
                backgroundColor:
                  "#f8f8f8",
              }}
            >

              {data.exclusions.map(
                (item, index) => (

                  <ListLine
                    key={index}
                    icon="×"
                    color="#b13c48"
                    value={item}
                  />

                )
              )}

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </section>
  );
}

/* ========================================================================== */
/* FARE PAGE                                                                  */
/* ========================================================================== */

function FarePage({
  data,
  total,
}) {
  return (
    <section className="pdf-page">

      <div className="pdf-content">

        <SectionTitle title="FARE SUMMARY" />

        <div
          style={{
            marginTop: 32,
          }}
        >

          <FareRow
            label="Travellers"
            value={
              data.quotation
                .travellers
            }
          />

          <FareRow
            label="Per Adult"
            value={money(
              data.pricing
                .packagePerAdult
            )}
          />

          <FareRow
            label="Package Total"
            value={money(
              data.pricing
                .packageTotal
            )}
          />

          <div
            style={{
              height: 16,
            }}
          />

          <FareRow
            label="Travellers"
            value={
              data.quotation
                .travellers
            }
          />

          <FareRow
            label="Per Adult"
            value={money(
              data.pricing
                .flightPerAdult
            )}
          />

          <FareRow
            label="Flight Total"
            value={money(
              data.pricing
                .flightTotal
            )}
          />

          {/* TOTAL */}

          <div
            style={{
              marginTop: 35,
              padding: "22px 25px",
              display: "flex",
              alignItems:
                "center",
              justifyContent:
                "space-between",
              backgroundColor:
                BRAND.orange,
              color: "#ffffff",
            }}
          >

            <div>

              <div
                style={{
                  fontSize: 9,
                  fontWeight: 800,
                  letterSpacing: 1,
                  opacity: 0.8,
                }}
              >
                TOTAL QUOTATION VALUE
              </div>

              <div
                style={{
                  marginTop: 5,
                  fontSize: 28,
                  fontWeight: 800,
                }}
              >
                {money(total)}
              </div>

            </div>

            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textAlign: "right",
              }}
            >
              {data.quotation
                .travellers}
            </div>

          </div>

        </div>

      </div>

      <Footer />

    </section>
  );
}

/* ========================================================================== */
/* POLICY PAGE                                                                */
/* ========================================================================== */

function PolicyPage({
  title,
  items,
}) {
  return (
    <section className="pdf-page">

      <div className="pdf-content">

        <SectionTitle title={title} />

        <div
          style={{
            marginTop: 30,
            fontSize: 10,
            lineHeight: 1.45,
            color: "#333333",
          }}
        >

          {items.map(
            (item, index) => (

              <div
                key={index}
                style={{
                  marginBottom: 11,
                }}
              >
                {item}
              </div>

            )
          )}

        </div>

      </div>

      <Footer />

    </section>
  );
}

/* ========================================================================== */
/* FINAL PAGE                                                                 */
/* ========================================================================== */

function FinalPage({ data }) {
  return (
    <section className="pdf-page">

      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding:
            "60px 49px",
        }}
      >

        <div
          style={{
            fontSize: 29,
            lineHeight: 1,
            fontWeight: 800,
            color: BRAND.orange,
          }}
        >
          {BRAND.company}
        </div>

        <div
          style={{
            marginTop: 8,
            fontSize: 10,
            letterSpacing: 2,
            color: "#777777",
          }}
        >
          {BRAND.tagline}
        </div>

        <div
          style={{
            marginTop: 45,
            fontSize: 32,
            lineHeight: 1.15,
            fontWeight: 800,
            color: "#242424",
          }}
        >
          Discover the magic
          <br />
          of travel
        </div>

        <div
          style={{
            marginTop: 12,
            fontSize: 14,
            color: "#777777",
          }}
        >
          and make every moment
          unforgettable.
        </div>

        <div
          style={{
            marginTop: 55,
            width: 410,
            padding: 28,
            textAlign: "left",
            backgroundColor:
              "#fff7f2",
            borderLeft:
              `4px solid ${BRAND.orange}`,
          }}
        >

          <div
            style={{
              fontSize: 9,
              fontWeight: 800,
              letterSpacing: 1,
              color: "#999999",
            }}
          >
            CONTACT US
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 15,
              fontWeight: 800,
            }}
          >
            {BRAND.company}
          </div>

          <div
            style={{
              marginTop: 14,
              fontSize: 10,
            }}
          >
            ☎ {BRAND.phone}
          </div>

          <div
            style={{
              marginTop: 7,
              fontSize: 10,
            }}
          >
            ✉ {BRAND.email}
          </div>

        </div>

      </div>

      <Footer />

    </section>
  );
}

/* ========================================================================== */
/* SECTION TITLE                                                              */
/* ========================================================================== */

function SectionTitle({ title }) {
  return (
    <div>

      <h2 className="pdf-section-title">
        {title}
      </h2>

      <div className="pdf-section-line" />

    </div>
  );
}

/* ========================================================================== */
/* FOOTER                                                                     */
/* ========================================================================== */

function Footer() {
  return (
    <div className="pdf-footer">

      <span>
        {BRAND.company} |{" "}
        {BRAND.tagline}
      </span>

      <span>
        {BRAND.phone} •{" "}
        {BRAND.email}
      </span>

    </div>
  );
}

/* ========================================================================== */
/* COVER INFO                                                                 */
/* ========================================================================== */

function CoverInfo({
  label,
  value,
}) {
  return (
    <div
      style={{
        padding: "11px 13px",
        backgroundColor:
          "#f4f4f4",
      }}
    >

      <div
        style={{
          fontSize: 7,
          fontWeight: 800,
          color: "#999999",
          letterSpacing: 0.5,
        }}
      >
        {label}
      </div>

      <div
        style={{
          marginTop: 4,
          fontSize: 9,
          fontWeight: 700,
        }}
      >
        {value}
      </div>

    </div>
  );
}

/* ========================================================================== */
/* FLIGHT CELL                                                                */
/* ========================================================================== */

function FlightCell({
  value,
  bold,
}) {
  return (
    <div
      style={{
        padding: "13px 8px",
        fontWeight: bold
          ? 700
          : 400,
      }}
    >
      {value || "-"}
    </div>
  );
}

/* ========================================================================== */
/* MEAL LINE                                                                  */
/* ========================================================================== */

function MealLine({
  icon,
  label,
  value,
}) {
  const included =
    value
      ?.toLowerCase()
      .includes("included");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}
    >

      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: 9,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:
            included
              ? "#edf9f0"
              : "#f4f4f4",
          color: included
            ? "#287341"
            : "#888888",
          fontSize: 7,
          fontWeight: 800,
        }}
      >
        {icon}
      </span>

      <span>
        <strong>
          {label}:
        </strong>{" "}
        {value}
      </span>

    </div>
  );
}

/* ========================================================================== */
/* LIST LINE                                                                  */
/* ========================================================================== */

function ListLine({
  icon,
  color,
  value,
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems:
          "flex-start",
        gap: 8,
        marginBottom: 10,
        fontSize: 9,
        lineHeight: 1.45,
      }}
    >

      <span
        style={{
          color,
          fontWeight: 800,
          fontSize: 12,
          lineHeight: 1,
        }}
      >
        {icon}
      </span>

      <span>
        {value}
      </span>

    </div>
  );
}

/* ========================================================================== */
/* FARE ROW                                                                   */
/* ========================================================================== */

function FareRow({
  label,
  value,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "55% 45%",
        marginBottom: 2,
        backgroundColor:
          "#f4f4f4",
        fontSize: 11,
      }}
    >

      <div
        style={{
          padding: "14px 15px",
          fontWeight: 700,
        }}
      >
        {label}
      </div>

      <div
        style={{
          padding: "14px 15px",
        }}
      >
        {value}
      </div>

    </div>
  );
}

/* ========================================================================== */
/* BUILDER SECTION                                                            */
/* ========================================================================== */

function BuilderSection({
  title,
  icon,
  active,
  onClick,
  children,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">

      <button
        type="button"
        onClick={onClick}
        className={`flex w-full items-center justify-between px-4 py-4 text-left transition ${
          active
            ? "bg-orange-50"
            : "bg-white hover:bg-slate-50"
        }`}
      >

        <span className="flex items-center gap-3">

          <span
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              active
                ? "bg-orange-100 text-orange-500"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {icon}
          </span>

          <span className="text-sm font-bold text-slate-800">
            {title}
          </span>

        </span>

        <span className="text-xs text-slate-400">
          {active ? "▲" : "▼"}
        </span>

      </button>

      {active && (
        <div className="border-t border-slate-100 p-4">
          {children}
        </div>
      )}

    </div>
  );
}

/* ========================================================================== */
/* INPUT                                                                      */
/* ========================================================================== */

function Input({
  label,
  value,
  onChange,
  type = "text",
}) {
  return (
    <label className="block">

      <span className="mb-1.5 block text-[11px] font-semibold text-slate-500">
        {label}
      </span>

      <input
        type={type}
        value={value ?? ""}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      />

    </label>
  );
}

/* ========================================================================== */
/* TEXTAREA                                                                   */
/* ========================================================================== */

function Textarea({
  label,
  value,
  onChange,
}) {
  return (
    <label className="block">

      <span className="mb-1.5 block text-[11px] font-semibold text-slate-500">
        {label}
      </span>

      <textarea
        rows={5}
        value={value ?? ""}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs leading-5 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      />

    </label>
  );
}

/* ========================================================================== */
/* SELECT                                                                     */
/* ========================================================================== */

function SelectInput({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <label className="block">

      <span className="mb-1.5 block text-[11px] font-semibold text-slate-500">
        {label}
      </span>

      <select
        value={value ?? ""}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="w-full rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-[10px] outline-none focus:border-orange-400"
      >

        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        )}

      </select>

    </label>
  );
}

/* ========================================================================== */
/* FILE INPUT                                                                 */
/* ========================================================================== */

function FileInput({
  label,
  onChange,
}) {
  return (
    <label className="block">

      <span className="mb-1.5 block text-[11px] font-semibold text-slate-500">
        {label}
      </span>

      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 bg-white text-[11px] file:mr-3 file:border-0 file:bg-orange-500 file:px-3 file:py-2 file:text-[11px] file:font-bold file:text-white"
      />

    </label>
  );
}

/* ========================================================================== */
/* ADD BUTTON                                                                 */
/* ========================================================================== */

function AddButton({
  label,
  onClick,
  green,
  red,
}) {
  let background =
    BRAND.orange;

  if (green) {
    background = "#16a34a";
  }

  if (red) {
    background = "#dc2626";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white transition hover:opacity-90"
      style={{
        backgroundColor:
          background,
      }}
    >
      <span className="text-base">
        +
      </span>

      {label}

    </button>
  );
}

/* ========================================================================== */
/* ICON BUTTON                                                                */
/* ========================================================================== */

function IconButton({
  children,
  onClick,
  danger,
  title,
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
        danger
          ? "bg-red-50 text-red-500 hover:bg-red-100"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      {children}
    </button>
  );
}

/* ========================================================================== */
/* EDITABLE LIST ITEM                                                         */
/* ========================================================================== */

function EditableListItem({
  value,
  onChange,
  onDelete,
}) {
  return (
    <div className="flex gap-2">

      <input
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-orange-400"
      />

      <IconButton
        danger
        title="Delete"
        onClick={onDelete}
      >
        <TrashIcon />
      </IconButton>

    </div>
  );
}

/* ========================================================================== */
/* EMPTY                                                                      */
/* ========================================================================== */

function EmptySmall({ text }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-[11px] text-slate-400">
      {text}
    </div>
  );
}

/* ========================================================================== */
/* ICONS                                                                      */
/* ========================================================================== */

function UserIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle
        cx="12"
        cy="8"
        r="4"
      />
      <path d="M4 21c0-4 3-7 8-7s8 3 8 7" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h6" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
      />
      <circle
        cx="8.5"
        cy="8.5"
        r="1.5"
      />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

function HotelIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 21V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v16" />
      <path d="M3 13h18M7 9h3M14 9h3M7 17h3M14 17h3" />
    </svg>
  );
}

function FlightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M2 16h20" />
      <path d="M12 3v13" />
      <path d="m5 9 7 4 7-4" />
      <path d="m5 16 2 5M19 16l-2 5" />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m9 18-6 3V6l6-3 6 3 6-3v15l-6 3z" />
      <path d="M9 3v15M15 6v15" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function MoneyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect
        x="4"
        y="10"
        width="16"
        height="11"
        rx="2"
      />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 15H6L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

/* ========================================================================== */
/* HELPERS                                                                    */
/* ========================================================================== */

function makeId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

function getHotelRoomCount(
  data,
  hotelId
) {
  const hotel = data.stays.find(
    (item) =>
      item.id === hotelId
  );

  return hotel?.rooms?.length || 0;
}

function toggleSection(
  active,
  setActive,
  section
) {
  setActive(
    active === section
      ? null
      : section
  );
}

function chunk(array, size) {
  const result = [];

  for (
    let i = 0;
    i < array.length;
    i += size
  ) {
    result.push(
      array.slice(
        i,
        i + size
      )
    );
  }

  return result;
}

function money(value) {
  return `INR ${Number(
    value || 0
  ).toLocaleString("en-IN")}`;
}

function countPreviewPages(data) {
  const itineraryPages =
    Math.ceil(
      data.itinerary.length / 2
    );

  return (
    1 + // cover
    1 + // stays
    1 + // flights
    itineraryPages +
    1 + // inclusions
    1 + // fare
    6 + // policies
    1 // final
  );
}

async function waitForImages(
  container
) {
  const images =
    Array.from(
      container.querySelectorAll(
        "img"
      )
    );

  await Promise.all(
    images.map((img) => {

      if (img.complete) {
        return Promise.resolve();
      }

      return new Promise(
        (resolve) => {
          img.onload =
            resolve;

          img.onerror =
            resolve;
        }
      );
    })
  );
}