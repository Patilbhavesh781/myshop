import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-200 relative overflow-hidden">
      {/* Animated Glow Orbs in Background */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl opacity-40"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-56 h-56 bg-pink-300 rounded-full blur-3xl opacity-30"
        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-80 border border-yellow-200"
      >
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-yellow-400 to-pink-400 opacity-70 animate-pulse -z-10"></div>

        <h2 className="text-3xl font-extrabold mb-6 text-center text-yellow-600 drop-shadow">
          Welcome Back ✨
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 outline-none transition"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-yellow-400 to-pink-400 hover:from-yellow-500 hover:to-pink-500 text-white py-2 rounded-md font-semibold shadow-lg transition"
          >
            🚀 Login
          </motion.button>
        </form>

        <div className="mt-4 text-center space-y-2">
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline font-medium"
          >
            Create an account
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
