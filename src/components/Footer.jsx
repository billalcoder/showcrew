// import { FaArrowUp } from "react-icons/fa";

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
        <div>
          <h2 className="font-bold mb-4 uppercase tracking-widest">Store Policies</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Homepage</a></li>
            <li><a href="#" className="hover:text-gray-300">Watches</a></li>
            <li><a href="#" className="hover:text-gray-300">Ladies Watches</a></li>
            <li><a href="#" className="hover:text-gray-300">Sunglasses</a></li>
            <li><a href="#" className="hover:text-gray-300">Men's Kicks</a></li>
            <li><a href="#" className="hover:text-gray-300">Handbags</a></li>
            <li><a href="#" className="hover:text-gray-300">Women's Kicks</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact Information</a></li>
          </ul>
        </div>

        {/* Main Menu */}
        <div>
          <h2 className="font-bold mb-4 uppercase tracking-widest">Main Menu</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-gray-300">Refund Policy</a></li>
            <li><a href="#" className="hover:text-gray-300">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-gray-300">Terms and Conditions</a></li>
            <li><a href="#" className="hover:text-gray-300">Contact Information</a></li>
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
