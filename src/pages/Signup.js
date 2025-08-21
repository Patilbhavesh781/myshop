import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 relative overflow-hidden">
      {/* Floating sparkles background */}
      <motion.div
        className="absolute top-16 left-20 w-36 h-36 bg-indigo-300 rounded-full blur-3xl opacity-40"
        animate={{ y: [0, 20, 0], x: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-48 h-48 bg-blue-300 rounded-full blur-3xl opacity-30"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 9, repeat: Infinity }}
      />

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-80 border border-blue-200"
      >
        {/* Animated glowing border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-indigo-400 to-blue-400 opacity-70 animate-pulse -z-10"></div>

        <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-600 drop-shadow">
          Welcome Aboard 🚀
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-indigo-400 to-blue-400 hover:from-indigo-500 hover:to-blue-500 text-white py-2 rounded-md font-semibold shadow-lg transition"
          >
            🌟 Sign Up
          </motion.button>
        </form>

        <div className="mt-4 text-center space-y-2">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Already have an account? Login
          </button>
          <br />
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:underline"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
