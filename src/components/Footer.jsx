// import { FaArrowUp } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Top Footer */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo */}
        <div>
          <h1 className="text-4xl font-signature">ShoeCrew</h1>
        </div>

        {/* Store Policies */}
    

        {/* Main Menu */}
        <div>
          <h2 className="font-bold mb-4 uppercase tracking-widest">Main Menu</h2>
          <ul className="space-y-2">
            <li><Link to={`PrivacyPolicy`} className="hover:text-gray-300">Privacy Policy</Link></li>
            <li><Link to={`ReturnRefundPolicy`} className="hover:text-gray-300">Refund Policy</Link></li>
            <li><Link to={`ShippingPolicy`} className="hover:text-gray-300">Shipping Policy</Link></li>
            <li><Link to={`TermsAndConditions`} className="hover:text-gray-300">Terms and Conditions</Link></li>
            <li><Link to={`Contact`} className="hover:text-gray-300">Contact Information</Link></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h2 className="font-bold mb-4 uppercase tracking-widest">ShoeCrew</h2>
          <p className="text-gray-300">
            ShoeCrew — We deal in men's and women's collections.  
            We sell imported watches, sunglasses, handbags, and clothing.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-800 text-gray-400 text-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} Built with ❤️ by ShoeCrew Team
          </p>
          <a
            href="#"
            className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition"
            title="Back to Top"
          >
            {/* <FaArrowUp /> */}
          </a>
        </div>
      </div>
    </footer>
  );
}
