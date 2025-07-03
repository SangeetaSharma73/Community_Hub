import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaHandsHelping,
  FaUsers,
  FaHeadset,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <footer className="bg-gray-100 px-6 py-6 text-gray-700 text-sm">
      <div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6"
        data-aos="fade-up"
      >
        {/* Brand Info */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-pink-500 to-orange-500 mb-2">
            🟣 Community Hub
          </h2>
          <p className="leading-snug text-gray-600 text-sm">
            A safe space where people come together to ask for help and offer
            support. Powered by open hearts & open source.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2 mb-1">
            <FaHandsHelping /> Platform
          </h3>
          <a className="block hover:text-indigo-600">Ask for Help</a>
          <a className="block hover:text-indigo-600">Offer Support</a>
          <a className="block hover:text-indigo-600">Browse Requests</a>
        </div>

        {/* Support + Newsletter */}
        <div className="space-y-2">
          <h3 className="font-semibold flex items-center gap-2 mb-1">
            <FaHeadset /> Support
          </h3>
          <a className="block hover:text-indigo-600">Contact Us</a>
          <a className="block hover:text-indigo-600">FAQs</a>

          {/* Language Selector (condensed) */}
          <div className="mt-3">
            <label className="flex items-center gap-2 font-medium mb-1 text-xs">
              <FaGlobe /> Language
            </label>
            <select className="select select-xs w-full bg-white border border-gray-300 text-xs">
              <option>English</option>
              <option>Español</option>
            </select>
          </div>

          {/* Newsletter (compact) */}
          <div className="mt-2">
            <label className="flex items-center gap-2 font-medium mb-1 text-xs">
              <FaEnvelope /> Newsletter
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-xs w-full bg-white border border-gray-300 text-xs mb-1"
            />
            <button className="btn btn-xs w-full bg-indigo-600 text-white hover:bg-indigo-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} CommunityHelp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
