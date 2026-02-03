"use client";

export default function FooterFull() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {/* International Packages */}
        <div>
          <h4 className="font-semibold text-[var(--theme)] mb-4">
            International Packages
          </h4>
          <ul className="space-y-2 text-gray-300">
            <li>Bali</li>
            <li>Dubai</li>
            <li>Maldives</li>
            <li>Singapore</li>
            <li>Thailand</li>
            <li>Vietnam</li>
            <li>Baku</li>
            <li>Almaty</li>
          </ul>
        </div>

        {/* Domestic Packages */}
        <div>
          <h4 className="font-semibold text-[var(--theme)] mb-4">
            Domestic Packages
          </h4>
          <ul className="space-y-2 text-gray-300">
            <li>Andaman</li>
            <li>Himachal</li>
            <li>Kashmir</li>
            <li>Kerala</li>
            <li>Ladakh</li>
            <li>North East</li>
            <li>Rajasthan</li>
            <li>Uttarakhand</li>
          </ul>
        </div>

        {/* Honeymoon Packages */}
        <div>
          <h4 className="font-semibold text-[var(--theme)] mb-4">
            Honeymoon Packages
          </h4>
          <ul className="space-y-2 text-gray-300">
            <li>Singapore</li>
            <li>Baku</li>
            <li>Thailand</li>
            <li>Vietnam</li>
            <li>Himachal</li>
            <li>Kashmir</li>
            <li>Kerala</li>
            <li>North East</li>
          </ul>
        </div>

        {/* Tour By Interest */}
        <div>
          <h4 className="font-semibold text-[var(--theme)] mb-4">
            Tour By Interest
          </h4>
          <ul className="space-y-2 text-gray-300">
            <li>Adventure</li>
            <li>Beach</li>
            <li>Cruise</li>
            <li>Family</li>
            <li>Luxury</li>
            <li>Wildlife</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold text-[var(--theme)] mb-4">Company</h4>
          <ul className="space-y-2 text-gray-300">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Blogs</li>
            <li>Careers</li>
            <li>FAQ's</li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="font-semibold text-[var(--theme)] mb-4">Policies</h4>
          <ul className="space-y-2 text-gray-300">
            <li>Terms & Conditions</li>
            <li>Privacy Policies</li>
            <li>Fraud Alert</li>
            <li>Secure Payment</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} PYT - Plan Your Trip. All Rights
        Reserved.
      </div>
    </footer>
  );
}
