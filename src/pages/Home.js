import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import products from "../data/products";
import ThreeBackground from "../components/ThreeBackground";
import TrustedByFooter from "../components/BrandName";
import { useCart } from "../context/CartContext"; // ✅ import cart hook

const categories = ["All", "Standard", "Engineering", "Outdoor", "Specialty"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart(); // ✅ use cart context

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <ThreeBackground />
      <motion.div
        className="min-h-screen bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <header className="bg-yellow-400 p-4 flex justify-between items-center shadow-md sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              className="sm:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
            <motion.img
              src="/logo.png"
              alt="Infill Filament Logo"
              width={120}
              className="cursor-pointer"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
            />
          </div>

          <input
            type="text"
            placeholder="Search filaments..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="hidden sm:block w-1/3 px-3 py-2 rounded-md border border-gray-300 shadow-sm"
          />

          <div className="flex gap-3 items-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-yellow-600 font-semibold px-5 py-2 rounded-lg shadow-md
                 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl
                 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-yellow-600 font-semibold px-5 py-2 rounded-lg shadow-md
                 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl
                 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Signup
            </button>
            {/* Cart Icon with Badge */}
            <button
              onClick={() => navigate("/cart")}
              className="relative bg-white text-yellow-600 font-semibold px-5 py-2 rounded-lg shadow-md
                 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl
                 focus:outline-none focus:ring-2 focus:ring-yellow-400 flex items-center justify-center"
            >
              <svg
                className="w-[20px] h-[20px]"
                fill="currentColor"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M352 128C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128H0v304c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V128h-96zM224 48c44.112 0 80 35.888 80 80H144c0-44.112 35.888-80 80-80zm176 384c0 17.645-14.355 32-32 32H80c-17.645 0-32-14.355-32-32V176h48v40c0 13.255 10.745 24 24 24s24-10.745 24-24v-40h160v40c0 13.255 10.745 24 24 24s24-10.745 24-24v-40h48v256z"></path>
              </svg>
              {/* Badge */}
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-2">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </header>

        {/* Sidebar + Product Grid */}
        <div className="flex">
          {/* Categories Sidebar */}
          <aside
            className={`h-full w-44 my-8 bg-white p-4 border-r border-gray-200 shadow-lg rounded-xl
              left-0 z-20 sm:static sm:block
              ${sidebarOpen ? "" : "hidden sm:block"}`}
          >
            <h2 className="text-xl font-bold mb-4 border-b border-gray-200 pb-2">
              Categories
            </h2>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <motion.li
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSidebarOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg flex items-center justify-between font-medium transition-all
                      ${
                        selectedCategory === cat
                          ? "bg-yellow-300 text-yellow-900 font-bold shadow-inner ring-1 ring-yellow-400"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && (
                      <span className="text-yellow-700 font-bold">✓</span>
                    )}
                  </button>
                </motion.li>
              ))}
            </ul>
          </aside>

          {/* Product Grid */}
          <main className="flex-1 p-6 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.length === 0 ? (
              <p>No products found.</p>
            ) : (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="cursor-pointer bg-white w-full p-8 rounded-3xl shadow-2xl 
                             hover:shadow-3xl transition-transform transform 
                             hover:-translate-y-3 hover:scale-105 
                             flex flex-col items-center md:items-start"
                  initial={{ opacity: 0, y: 60, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{ scale: 1.07, rotateX: 5, rotateY: -5 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  viewport={{ once: true }}
                >
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full md:w-72 h-56 object-contain rounded-xl mb-6"
                    whileHover={{ scale: 1.1, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 150 }}
                  />
                  <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
                    <h2 className="text-2xl font-extrabold mb-2">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 mb-3">{product.description}</p>
                    <p className="text-2xl font-bold text-yellow-600 mb-4">
                      ${product.price}
                    </p>

                    <div className="flex gap-3">
                      <motion.button
                        onClick={() => navigate(`/product/${product.id}`)}
                        className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-xl font-semibold shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                      <motion.button
                        onClick={() => addToCart(product)} // ✅ Add to cart
                        className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-xl font-semibold text-white shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </main>
        </div>
      </motion.div>
      <TrustedByFooter />
    </>
  );
}
