import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Footer = () => {
  const { user, member } = useAuthStore();

  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold text-white mb-4">
            AAEAR Foundation
          </h2>
          <p className="text-sm">
            Academics Achievers Education and Research Foundation is committed
            to advancing education, research, and innovation for a brighter
            tomorrow.
          </p>
        </div>

        {/* Quick Links + Support */}
        <div className="md:col-span-2 grid grid-cols-2 gap-10">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/" className="hover:text-white">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="hover:text-white">
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/members" className="hover:text-white">
                  Members
                </NavLink>
              </li>
              <li>
                <NavLink to="/documents" className="hover:text-white">
                  Documents
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {user?.role === "admin" ? (
                <>
                  <li>
                    <NavLink to="/admin/dashboard" className="hover:text-white">
                      Admin DashBoard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/admin/members" className="hover:text-white">
                      See Members
                    </NavLink>
                  </li></>
              ) : (
                <>
                  <li>
                    <NavLink to="/donation" className="hover:text-white">
                      Donate
                    </NavLink>
                  </li>

                  {member ? (
                    <NavLink
                      to="/member/"
                      className="hover:text-white"
                    >
                      Member Dashboard
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/joinus"
                      className="hover:text-white"
                    >
                      Join as a Member
                    </NavLink>
                  )}

                </>
              )}

              <li>
                <NavLink to="/contact" className="hover:text-white">
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/licenses" className="hover:text-white">
                  Licenses
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Get in Touch
          </h3>
          <div className="space-y-2 text-sm">
            {/* Address */}
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-400 shrink-0" />
              <span>
                Umrapur, Ibrahimpur, Raebareli 229212, Uttar Pradesh, India
              </span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-gray-400 shrink-0" />
              <a
                href="mailto:academicsachieversfoundation@gmail.com"
                className="truncate max-w-[220px] md:max-w-xs hover:text-white"
                title="academicsachieversfoundation@gmail.com"
              >
                academicsachieversfoundation@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-gray-400 shrink-0" />
              <a
                href="tel:+919026470888"
                className="hover:text-white"
                title="+91 90264 70888"
              >
                +91 90264 70888
              </a>
            </div>
          </div>

          {/* Socials */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="my-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} AAEAR Foundation. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
