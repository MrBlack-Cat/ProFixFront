import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Logo from '../Navbar/Logo';
import LanguageSwitcher from '../Common/LanguageSwitcher';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative py-16 bg-gradient-to-tr from-[#396a70] to-[#bea6c2] overflow-hidden flex flex-col items-center">
      
      <div className="absolute top-[5%] left-[5%] w-[90%] h-[90%] bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl"></div>

      {/* Kontent */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
        
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <button onClick={() => navigate('/')} className="focus:outline-none">
            <Logo />
          </button>
          <p className="text-gray-700 text-sm text-center md:text-left">
            Your trusted freelance platform.
          </p>
          <LanguageSwitcher />
        </div>

        {/* Nav */}
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-[#122E34] font-bold mb-2">Quick Links</h3>
          <a href="#about" className="text-gray-700 hover:text-cyan-700 text-sm transition">About</a>
          <a href="#services" className="text-gray-700 hover:text-cyan-700 text-sm transition">Services</a>
          <a href="#top-posts" className="text-gray-700 hover:text-cyan-700 text-sm transition">Top Posts</a>
          <a href="#how-it-works" className="text-gray-700 hover:text-cyan-700 text-sm transition">How It Works</a>
        </div>

        {/* Contact  */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <h3 className="text-[#122E34] font-bold mb-2">Contact Us</h3>
          <p className="text-gray-700 text-sm">support@profix.com</p>
          <p className="text-gray-700 text-sm">+1 234 567 890</p>
          <div className="flex gap-4 mt-4">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500 text-2xl">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600 text-2xl">
              <FaFacebook />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700 text-2xl">
              <FaLinkedin />
            </a>
          </div>
        </div>

      </div>

      <div className="relative z-10 w-full text-center text-xs text-gray-600 mt-12">
        © 2025 ProFix. All rights reserved.
      </div>

    </footer>
  );
};

export default Footer;
