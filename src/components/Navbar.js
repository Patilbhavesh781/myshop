import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar({ onToggleSidebar, sidebarOpen }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <header className="bg-yellow-400 p-4 flex justify-between items-center shadow-md sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button className="sm:hidden" onClick={onToggleSidebar}>
          {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <motion.img
          src="/logo.png"
          alt="Infill Filament Logo"
          width={120}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>

      <motion.input
        type="text"
        placeholder="Search filaments..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="hidden sm:block w-1/3 px-3 py-2 rounded-md border border-gray-300 shadow-sm"
        whileFocus={{ scale: 1.05 }}
      />

      <div className="flex gap-2">
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/login")}
          className="bg-white text-black px-4 py-2 rounded-md shadow"
        >Login</motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/signup")}
          className="bg-white text-black px-4 py-2 rounded-md shadow"
        >Signup</motion.button>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
          className="bg-black text-white px-4 py-2 rounded-md shadow-lg"
        >Cart (0)</motion.button>
      </div>
    </header>
  );
}
