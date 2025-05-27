const Header = () => {
  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">ProFix</div>
        <nav className="hidden md:flex space-x-6">
          <a href="#about" className="text-gray-600 hover:text-blue-600">About</a>
          <a href="#services" className="text-gray-600 hover:text-blue-600">Services</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-blue-600">How it Works</a>
          <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
          <a href="#videogallery" className="text-gray-600 hover:text-blue-600">Gallery</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
