import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


interface DesktopMenuProps {
  selectedItem: string | null;
  setSelectedItem: (value: string) => void;
}

const DesktopMenu = ({ selectedItem, setSelectedItem }: DesktopMenuProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { href: "#about", text: "About", scrollId: "about" },
    { href: "#services", text: "Services", scrollId: "services" },
    { href: "#top-posts", text: "Top Posts", scrollId: "top-posts" },
    { href: "#top-providers", text: "Top Providers", scrollId: "top-providers" },
    { href: "#how-it-works", text: "How It Works", scrollId: "how-it-works" },
  ];
  
  const handleClick = (text: string, scrollId: string) => {
    setSelectedItem(text);
    navigate(`/?scrollTo=${scrollId}`);
  };

  return (
    <div className="hidden md:flex space-x-8 justify-start">
      {menuItems.map(({text, scrollId }) => (
        <div key={scrollId} className="relative">
           <button
            onClick={() => handleClick(text, scrollId)}
            className={`text-lg font-medium transition-all duration-300 px-2 py-1 ${
              selectedItem === text
                ? "text-cyan-400"
                : "text-white hover:text-cyan-400"
            }`}
          >
            {text}
          </button>

          {/* underline */}
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
