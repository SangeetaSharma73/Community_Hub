import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="border-t border-base-300 mt-10 px-4 sm:px-6 md:px-10 py-10 md:py-14 text-neutral">
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10"
        data-aos="fade-up"
      >
        <div className="flex flex-col items-start max-w-md">
          <a className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-400 drop-shadow-sm">
            <span className="hidden md:inline-block">🟣 </span>Community Hub
          </a>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-600">
            A safe and supportive community where people come together to ask
            for help, offer assistance, and make a difference. Built with React,
            Tailwind CSS, and DaisyUI to connect hearts through technology.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm sm:text-base">
          <div>
            <span className="footer-title text-base md:text-lg font-semibold">
              Platform
            </span>
            <a className="link link-hover block mt-2">Ask for Help</a>
            <a className="link link-hover block">Offer Support</a>
            <a className="link link-hover block">Browse Requests</a>
            <a className="link link-hover block">How It Works</a>
          </div>

          <div>
            <span className="footer-title text-base md:text-lg font-semibold">
              Community
            </span>
            <a className="link link-hover block mt-2">Success Stories</a>
            <a className="link link-hover block">Community Blog</a>
            <a className="link link-hover block">Events & Meetups</a>
            <a className="link link-hover block">Volunteer</a>
          </div>

          <div>
            <span className="footer-title text-base md:text-lg font-semibold">
              Support
            </span>
            <a className="link link-hover block mt-2">Contact Us</a>
            <a className="link link-hover block">FAQs</a>
            <a className="link link-hover block">Trust & Safety</a>
            <a className="link link-hover block">Report a Problem</a>
          </div>

          <div>
            <span className="footer-title text-base md:text-lg font-semibold">
              Stay Connected
            </span>
            <select className="select select-sm w-full mt-2">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
              <option>Deutsch</option>
            </select>

            <span className="footer-title mt-6 block text-base md:text-lg font-semibold">
              Newsletter
            </span>
            <input
              type="email"
              placeholder="Your email"
              className="input input-sm w-full mt-2"
            />
            <button className="btn btn-sm mt-2 w-full">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-xs sm:text-sm md:text-base text-gray-500">
        <p>
          © {new Date().getFullYear()} CommunityHelp. Built to connect people
          with compassion. All rights reserved. Empowered by open hearts and
          open source.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
