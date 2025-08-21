import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function ThankYou() {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-100 via-white to-yellow-50 p-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Happy Image / Illustration */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/3159/3159066.png"
        alt="Order Success"
        className="w-40 h-40 mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      <h1 className="text-3xl font-bold text-green-600 mb-3">
        🎉 Thank You for Your Order!
      </h1>
      <p className="text-gray-600 mb-6 max-w-md">
        Your order has been placed successfully. We’ll send you a confirmation
        email shortly and update you when your items are on the way 🚚.
      </p>

      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md font-medium transition"
        >
          🛍️ Continue Shopping
        </Link>
        <Link
          to="/cart"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg shadow-md font-medium transition"
        >
          🛒 View Cart
        </Link>
      </div>
    </motion.div>
  );
}
