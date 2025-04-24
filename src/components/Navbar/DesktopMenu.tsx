import { motion } from "framer-motion";

interface DesktopMenuProps {
  selectedItem: string | null;
  setSelectedItem: (value: string) => void;
}

const DesktopMenu = ({ selectedItem, setSelectedItem }: DesktopMenuProps) => {
  const menuItems = [
    { href: "#about", text: "About" },
    { href: "#services", text: "Services" },
    { href: "#top-posts", text: "Top Posts" },
    { href: "#top-providers", text: "Top Providers" },
    { href: "#how-it-works", text: "How It Works" },
  ];

  return (
    <div className="hidden md:flex space-x-8 justify-start">
      {menuItems.map(({ href, text }) => (
        <div key={href} className="relative">
          <a
            href={href}
            onClick={() => setSelectedItem(text)}
            className={`text-lg font-medium transition-all duration-300 px-2 py-1 ${
              selectedItem === text
                ? 'text-cyan-400'
                : 'text-white hover:text-cyan-400'
            }`}
          >
            {text}
          </a>

          {/* Плавный underline */}
          {selectedItem === text && (
            <motion.div
              layoutId="underline"
              className="absolute left-0 right-0 -bottom-1 h-[2px] bg-cyan-400 rounded-full"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default DesktopMenu;
