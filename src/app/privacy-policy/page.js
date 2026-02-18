export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>
          <p className="text-blue-100 text-lg">
            Your privacy and data protection are important to PrimeVistaJourney.
          </p>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          {[
            {
              title: "Information Collection",
              content: `When you access the PrimeVistaJourney website, certain technical details — such as your IP address, browser type, time spent on pages, and navigation patterns — may be automatically collected. This data helps us analyze site traffic and improve user experience.`,
            },
            {
              title: "Use of Personal Information",
              content: `Personal data voluntarily submitted by users (such as name, email, and booking details) will be used solely to process travel services or communicate relevant offers. PrimeVistaJourney shares information only with trusted partners directly involved in fulfilling your bookings and preventing fraudulent activity.`,
            },
            {
              title: "Disclosure Policy",
              content: `PrimeVistaJourney does not sell or share your personal data with unrelated third parties. However, we may disclose limited information if required by law, government order, or to enforce company policies.`,
            },
            {
              title: "Data Security",
              content: `PrimeVistaJourney employs layered protection measures including firewalls, encryption protocols, and secure authentication systems. Servers are located in restricted facilities, and all customer databases and backups are encrypted using unique keys to ensure confidentiality and prevent unauthorized access.`,
            },
            {
              title: "User Rights",
              content: `You may request access, correction, or deletion of your personal information at any time by contacting PrimeVistaJourney’s support team at Info@primevistajourney.com.`,
            },
            {
              title: "Legal Compliance",
              content: `PrimeVistaJourney reserves the right to disclose user data when required by legal authorities or to protect the company’s rights, safety, and integrity.`,
            },
            {
              title: "Policy Updates",
              content: `This Privacy Policy may be revised periodically. Updates will be reflected on our website, and continued use of our services signifies acceptance of the updated terms.`,
            },
          ].map((section, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow-sm border"
            >
              <h2 className="text-xl md:text-2xl font-semibold text-indigo-700 mb-4">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}

          {/* Closing Statement */}
          <div className="bg-indigo-900 text-white p-8 rounded-2xl shadow-lg">
            <p className="leading-relaxed text-lg">
              PrimeVistaJourney remains steadfast in its mission to offer
              ethical, transparent, and customer-centric travel services. By
              continuing to engage with us, you acknowledge that you have read,
              understood, and accepted our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
