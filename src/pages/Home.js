import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import products from "../data/products";

const categories = ["All", "Standard", "Engineering", "Outdoor", "Specialty"];

export default function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const filteredProducts = products.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      className="min-h-screen bg-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <header className="bg-yellow-400 p-4 flex justify-between items-center shadow-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button className="sm:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <motion.img
            src="/logo.png"
            alt="Infill Filament Logo"
            width={120}
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

        <div className="flex gap-2">
          <button onClick={() => navigate("/login")} className="bg-white px-4 py-2 rounded-md shadow">
            Login
          </button>
          <button onClick={() => navigate("/signup")} className="bg-white px-4 py-2 rounded-md shadow">
            Signup
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`h-full w-48 bg-white p-4 border-r border-gray-200 shadow-lg
            fixed top-0 left-0 z-20 sm:static sm:block
            ${sidebarOpen ? "" : "hidden sm:block"}`}
        >
          <h2 className="text-lg font-semibold mb-3">Categories</h2>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1 rounded-md transition ${
                    selectedCategory === cat ? "bg-yellow-200 font-bold" : "hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 p-6 flex flex-col gap-8">
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer bg-white w-full p-6 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 flex flex-col md:flex-row items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full md:w-64 h-48 object-contain rounded-xl mb-6 md:mb-0 md:mr-8"
                />
                <div className="flex-1 flex flex-col items-start">
                  <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-3">{product.desc}</p>
                  <p className="text-xl font-bold text-yellow-600 mb-4">{product.price}</p>
                  <button className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-md font-semibold shadow">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </main>
      </div>
    </motion.div>
  );
}
