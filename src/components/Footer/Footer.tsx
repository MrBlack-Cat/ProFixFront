import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Logo from '../Navbar/Logo';
import LanguageSwitcher from '../Common/LanguageSwitcher';
import ChatWithAdminButton from '../Common/ChatWithAdminButton';
import { useState } from 'react';
import SuggestionModal from '../Common/SuggestionModal';
import { FiMessageSquare } from 'react-icons/fi';

const Footer = () => {
  const navigate = useNavigate();
  const [suggestionOpen, setSuggestionOpen] = useState(false);

  return (
    <footer className="relative bg-gradient-to-tr from-[#152e2f] to-[#593f64] text-white overflow-hidden pt-20 pb-10 px-6">
      <div className="absolute inset-6 bg-white/5 backdrop-blur-md rounded-3xl shadow-inner z-0" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        {/* Logo and Actions */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <button onClick={() => navigate('/')} className="focus:outline-none">
            <Logo />
          </button>
          <p className="text-sm text-gray-200 opacity-80">
            Your trusted freelance platform.
          </p>

          <div className="flex flex-col gap-2 mt-2 w-full max-w-[220px]">
            <LanguageSwitcher />
            <ChatWithAdminButton />
            <button
              onClick={() => setSuggestionOpen(true)}
              className="flex items-center justify-center gap-2 text-sm bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-full transition-all shadow-md"
            >
              <FiMessageSquare className="text-lg" />
              Feedback & Suggestion
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-white text-lg font-semibold mb-2">Quick Links</h3>
          <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
          <a href="#services" className="text-gray-300 hover:text-white transition">Services</a>
          <a href="#top-posts" className="text-gray-300 hover:text-white transition">Top Posts</a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition">How It Works</a>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <h3 className="text-white text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-gray-300 text-sm">support@profix.com</p>
          <p className="text-gray-300 text-sm">+1 234 567 890</p>
          <div className="flex gap-4 mt-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 text-2xl transition">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 text-2xl transition">
              <FaFacebook />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 text-2xl transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="relative z-10 w-full mt-12">
        <hr className="border-t border-white/30 w-full mb-2" />
        <p className="text-center text-xs text-white/70">
          © 2025 ProFix. All rights reserved.
        </p>
      </div>

      {/* Modal */}
      <SuggestionModal isOpen={suggestionOpen} onClose={() => setSuggestionOpen(false)} />
    </footer>
  );
};

export default Footer;
