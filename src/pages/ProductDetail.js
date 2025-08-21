import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import ThreeDViewer from "../components/ThreeDViewer";
import products from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  const { cartItems, addToCart, removeFromCart } = useCart();
  const [notification, setNotification] = useState("");

  if (!product)
    return (
      <p className="p-4 text-center text-red-500 font-medium text-sm">
        Product not found
      </p>
    );

  // ✅ check if already in cart
  const isInCart = cartItems.some((item) => item.id === product.id);

  const handleCartToggle = () => {
    if (isInCart) {
      removeFromCart(product.id);
      setNotification("❌ Removed from Cart");
    } else {
      addToCart(product);
      setNotification("✅ Added to Cart");
    }

    // Hide notification after 2s
    setTimeout(() => setNotification(""), 2000);
  };

  return (
    <motion.div
      className="min-h-screen p-4 bg-gradient-to-br from-yellow-100 via-white to-yellow-50 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="fixed top-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        >
          {notification}
        </motion.div>
      )}

      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mb-4 px-4 py-1.5 rounded-lg bg-white shadow hover:bg-gray-50 transition-all text-gray-700 text-sm"
      >
        ← Back
      </button>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 border border-yellow-100">
        {/* 3D Viewer + Image */}
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          <div className="w-full h-[250px] bg-gradient-to-tr from-yellow-200 via-yellow-50 to-yellow-100 rounded-xl shadow-inner flex items-center justify-center overflow-hidden">
            <ThreeDViewer modelPath={product.model} />
          </div>
          <motion.img
            src={product.image}
            alt={product.name}
            className="mt-4 w-full max-h-56 object-contain rounded-lg shadow-md border border-yellow-100"
            whileHover={{ scale: 1.04, rotate: 1 }}
          />
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {product.name}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {product.desc}
          </p>
          <p className="text-xl font-bold text-yellow-600 mb-5">
            ${product.price}
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.button
              onClick={handleCartToggle}
              className={`${
                isInCart
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-yellow-500 hover:bg-yellow-600"
              } text-white text-sm font-medium px-5 py-2 rounded-lg shadow-md transition-all`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isInCart ? "❌ Remove from Cart" : "🛒 Add to Cart"}
            </motion.button>

            <motion.button
              className="bg-gray-100 text-gray-700 text-sm font-medium px-5 py-2 rounded-lg shadow hover:bg-gray-200 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ❤️ Wishlist
            </motion.button>
          </div>

          {/* Extra Info */}
          <div className="mt-6 space-y-2 bg-gray-50/70 rounded-xl p-4 shadow-inner border border-gray-100 text-sm">
            <p className="text-gray-700">
              <span className="font-semibold">📂 Category:</span>{" "}
              {product.category}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">✅ Availability:</span> In Stock
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">⭐ Rating:</span> 4.8/5
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
