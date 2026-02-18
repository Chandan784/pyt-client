export default function TermsPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms & Conditions
          </h1>
          <p className="text-blue-100 text-lg">
            Please read these terms carefully before using PrimeVistaJourney
            services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Section Block Component */}
          {[
            {
              title: "1. General",
              content: `These Terms and Conditions (“Terms”) constitute a binding agreement between the user (“you”) and PrimeVistaJourney. By accessing our website, services, or booking channels, you acknowledge that you have read, understood, and agreed to these Terms.`,
            },
            {
              title: "2. Scope of Services",
              content: `PrimeVistaJourney provides travel-related services including customized itineraries, accommodation, transport, visa support, flight bookings, and guided experiences. All bookings are governed by the respective terms of third-party service providers.`,
            },
            {
              title: "3. Bookings and Payments",
              list: [
                "Bookings are confirmed only through official PrimeVistaJourney communication channels.",
                "Payment must be made as specified at the time of booking via approved methods (credit/debit card, UPI, or bank transfer).",
                "Delay or failure to make payment within the stipulated period may lead to cancellation.",
                "Prices are subject to changes in exchange rates, taxes, or supplier-imposed surcharges.",
              ],
            },
            {
              title: "4. Cancellations and Refunds",
              list: [
                "All cancellation requests must be submitted in writing or via official email.",
                "Refunds depend on the service provider’s terms and PrimeVistaJourney administrative charges.",
                "Non-refundable components (e.g., special fares or promotional bookings) are not eligible for refunds.",
                "Refunds, if applicable, will be processed after deductions and may be subject to supplier delays.",
              ],
            },
            {
              title: "5. Modifications or Rescheduling",
              list: [
                "Modifications are subject to availability and may attract additional charges.",
                "PrimeVistaJourney reserves the right to alter itineraries due to unforeseen circumstances such as weather conditions, governmental restrictions, or operational challenges.",
              ],
            },
            {
              title: "6. Responsibilities and Liabilities",
              list: [
                "PrimeVistaJourney acts solely as an intermediary between travelers and service providers.",
                "We are not liable for third-party negligence or service failures.",
                "We are not responsible for cancellations, losses, or delays caused by natural disasters, strikes, or emergencies.",
                "We are not liable for injury, property loss, or personal inconvenience during travel.",
                "Travel insurance is strongly recommended for all clients.",
              ],
            },
            {
              title: "7. Traveler Responsibilities",
              list: [
                "Provide accurate and up-to-date information during booking.",
                "Possess valid travel documents (passport, visa, permits, etc.).",
                "Adhere to destination laws, customs, and regulations.",
                "Maintain decorum and accountability throughout the trip.",
              ],
            },
            {
              title: "8. Force Majeure",
              content: `PrimeVistaJourney is not liable for failure or delay in obligations resulting from uncontrollable events such as natural calamities, wars, pandemics, government actions, or civil unrest.`,
            },
            {
              title: "9. Intellectual Property",
              content: `All logos, text, images, and materials on PrimeVistaJourney’s website are proprietary. Unauthorized reproduction, modification, or commercial use of any content is strictly prohibited.`,
            },
            {
              title: "10. Privacy and Data Protection",
              content: `All user data is collected, stored, and processed in accordance with PrimeVistaJourney’s Privacy Policy.`,
            },
            {
              title: "11. Governing Law",
              content: `These Terms shall be governed by the laws of India. Any disputes will fall under the exclusive jurisdiction of competent Indian courts.`,
            },
            {
              title: "12. Amendments",
              content: `PrimeVistaJourney reserves the right to amend these Terms without prior notice. Continued use of our services implies acceptance of such revisions.`,
            },
          ].map((section, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow-sm border"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-indigo-700 mb-4">
                {section.title}
              </h2>

              {section.content && (
                <p className="text-gray-600 leading-relaxed">
                  {section.content}
                </p>
              )}

              {section.list && (
                <ul className="list-disc pl-6 space-y-2 text-gray-600">
                  {section.list.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
