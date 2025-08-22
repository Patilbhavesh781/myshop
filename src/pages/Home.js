import React, { useState } from "react";
import { motion } from "framer-motion";
import products from "../data/products";
import ThreeBackground from "../components/ThreeBackground";
import TrustedByFooter from "../components/BrandName";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast"; // ✅ import toast

const categories = ["All", "Standard", "Engineering", "Outdoor", "Specialty"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { addToCart } = useCart();

  const [toast, setToast] = useState({ message: "", type: "" }); // ✅ toast state

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
        <Navbar
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          search={search}
          setSearch={setSearch}
        />

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
                  initial={{ opacity: 0, y: 30, rotateX: -5 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  whileHover={{ scale: 1.07, rotateX: 2, rotateY: -2 }}
                  transition={{ type: "spring", stiffness: 80, damping: 12 }}
                  viewport={{ once: true }}
                >
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full md:w-72 h-56 object-contain rounded-xl mb-6"
                    whileHover={{ scale: 1.08, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
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
                        onClick={() =>
                          (window.location.href = `/product/${product.id}`)
                        }
                        className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-xl font-semibold shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Details
                      </motion.button>
                      <motion.button
                        onClick={() => {
                          addToCart(product);
                          setToast({
                            message: `${product.name} added to cart!`,
                            type: "success",
                          });
                        }}
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

      {/* ✅ Toast Notification */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}
    </>
  );
}
