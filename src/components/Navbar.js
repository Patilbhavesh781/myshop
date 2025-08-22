import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, User, LogIn, Search } from "lucide-react";
import { motion } from "framer-motion";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useCart } from "../context/CartContext";
import Toast from "./Toast";

export default function Navbar({ onToggleSidebar, sidebarOpen, search, setSearch }) {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleCartClick = () => {
    if (!user) {
      setToast("⚠️ Please login to access the cart!");
      return;
    }
    navigate("/cart");
  };

  return (
    <>
      {toast && <Toast message={toast} type="error" onClose={() => setToast("")} />}
      <header className="bg-yellow-400 p-4 flex justify-between items-center shadow-md sticky top-0 z-40">
        {/* Logo & Sidebar */}
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

        {/* Desktop search (centered, fixed width) */}
        <div className="hidden sm:flex flex-1 justify-center">
          <motion.input
            type="text"
            placeholder="Search filaments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3 px-3 py-2 rounded-md border border-gray-300 shadow-sm"
          />
        </div>

        {/* User & Cart */}
        <div className="flex gap-2 items-center relative">
          {/* Mobile search */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 rounded-md bg-white shadow"
            >
              <Search size={20} />
            </button>
            {searchOpen && (
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="ml-2 w-32 px-2 py-1 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                autoFocus
              />
            )}
          </div>

          {user ? (
            <>
              <span className="hidden sm:flex items-center bg-white px-4 py-2 rounded-md shadow max-w-xs truncate">
                Hello, {user.email}
              </span>

              <div className="sm:hidden relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="bg-white p-2 rounded-md shadow"
                >
                  <User size={20} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50 flex flex-col">
                    <span className="px-4 py-2 border-b text-sm truncate">{user.email}</span>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b-md text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                className="hidden sm:flex bg-black text-white px-4 py-2 rounded-md shadow-lg"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/login")}
                className="hidden sm:flex bg-white text-yellow-600 font-semibold px-5 py-2 rounded-lg shadow-md hover:scale-105"
              >
                Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/signup")}
                className="hidden sm:flex bg-white text-yellow-600 font-semibold px-5 py-2 rounded-lg shadow-md hover:scale-105"
              >
                Signup
              </motion.button>

              {/* Mobile */}
              <motion.button
                className="sm:hidden bg-white p-2 rounded-md shadow"
                onClick={() => navigate("/login")}
              >
                <LogIn size={20} />
              </motion.button>
              <motion.button
                className="sm:hidden bg-white p-2 rounded-md shadow"
                onClick={() => navigate("/signup")}
              >
                <User size={20} />
              </motion.button>
            </>
          )}

          {/* Cart */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleCartClick}
            className="relative bg-white text-yellow-600 font-semibold px-5 py-2 rounded-lg shadow-md hover:scale-105"
          >
            <svg
              className="w-[20px] h-[20px]"
              fill="currentColor"
              stroke="currentColor"
              viewBox="0 0 448 512"
            >
              <path d="M352 128C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 48c44.112 0 80 35.888 80 80H144c0-44.112 35.888-80 80-80zm176 384c0 17.645-14.355 32-32 32H80c-17.645 0-32-14.355-32-32V176h48v40c0 13.255 10.745 24 24 24s24-10.745 24-24v-40h160v40c0 13.255 10.745 24 24 24s24-10.745 24-24v-40h48v256z"></path>
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                {cartItems.length}
              </span>
            )}
          </motion.button>
        </div>
      </header>
    </>
  );
}
