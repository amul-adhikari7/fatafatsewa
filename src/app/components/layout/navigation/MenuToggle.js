import { FaBars, FaTimes } from "react-icons/fa";

/**
 * Button component for toggling the mobile menu
 */
const MenuToggle = ({ isOpen, onClick }) => (
  <button
    className="lg:hidden p-2.5 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-blue-600 transition-all"
    onClick={onClick}
    aria-label={isOpen ? "Close menu" : "Open menu"}>
    {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
  </button>
);

export default MenuToggle;
