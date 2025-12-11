// src/pages/Signup.js
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Toast from "../components/Toast";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Signup() {
  const navigate = useNavigate();

  // form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [toast, setToast] = useState("");
  const [successAnimation, setSuccessAnimation] = useState(false);

  // tooltip
  const [pwFocused, setPwFocused] = useState(false);

  // validations
  const [passwordStrength, setPasswordStrength] = useState("weak"); // weak, medium, strong
  const [hasLength, setHasLength] = useState(false);
  const [hasUpper, setHasUpper] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);

  const [shake, setShake] = useState(false);

  // refs for animation focus control
  const passwordRef = useRef(null);
  const confirmRef = useRef(null);

  // check email validity
  const isEmailValid = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  // check name (simple)
  const isNameValid = (value) => value.trim().length >= 2;

  // compute strength and requirement flags
  useEffect(() => {
    const lengthOk = password.length >= 6;
    const upperOk = /[A-Z]/.test(password);
    const numberOk = /[0-9]/.test(password);

    setHasLength(lengthOk);
    setHasUpper(upperOk);
    setHasNumber(numberOk);

    if (!lengthOk) setPasswordStrength("weak");
    else if (lengthOk && (upperOk || numberOk)) setPasswordStrength("medium");
    if (lengthOk && upperOk && numberOk) setPasswordStrength("strong");
  }, [password]);

  // disable button until conditions met
  const isButtonDisabled =
    !isNameValid(name) ||
    !isEmailValid(email) ||
    passwordStrength !== "strong" ||
    password !== confirmPassword;

  // handle signup
  const handleSignup = async (e) => {
    e.preventDefault();

    // quick client-side checks
    if (password !== confirmPassword) {
      // shake input and show toast
      setShake(true);
      setToast("❌ Passwords do not match.");
      // stop shaking after animation
      setTimeout(() => setShake(false), 600);
      return;
    }

    if (passwordStrength !== "strong") {
      setToast("❌ Please choose a stronger password.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setToast("✅ Account created successfully!");
      setSuccessAnimation(true);

      // short delay so user sees the success animation
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      // clean up firebase error messages for users
      let message = error?.message || "Something went wrong.";
      // map some common codes if available
      if (error?.code) {
        if (error.code.includes("auth/email-already-in-use")) {
          message = "Email already in use.";
        } else if (error.code.includes("auth/invalid-email")) {
          message = "Invalid email address.";
        } else if (error.code.includes("auth/weak-password")) {
          message = "Password is too weak.";
        }
      }
      setToast(`❌ ${message}`);
    }
  };

  // small helper render for checkmark
  const Check = ({ visible }) => (
    <motion.span
      initial={{ scale: 0.6, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full ${
        visible ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"
      } text-xs`}
      aria-hidden
    >
      ✓
    </motion.span>
  );

  // optional: auto clear toast after some time
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(t);
  }, [toast]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 relative overflow-hidden p-4">
      {/* Toast */}
      {toast && (
        <Toast
          message={toast}
          type={toast.includes("✅") ? "success" : "error"}
          onClose={() => setToast("")}
        />
      )}

      {/* decorative orbs */}
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

      {/* success glow */}
      <AnimatePresence>
        {successAnimation && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 4, opacity: 0.14 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="pointer-events-none absolute w-40 h-40 bg-green-400 rounded-full blur-2xl"
          />
        )}
      </AnimatePresence>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="relative bg-white/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-blue-100"
      >
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-indigo-400 to-blue-400 opacity-60 animate-pulse -z-10" />

        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-indigo-600 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          {/* NAME */}
          <div className="flex items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition"
                required
              />
            </div>
            <div className="ml-2 mt-6">
              <Check visible={isNameValid(name)} />
            </div>
          </div>

          {/* EMAIL */}
          <div className="flex items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition"
                required
              />
            </div>
            <div className="ml-2 mt-6">
              <Check visible={isEmailValid(email)} />
            </div>
          </div>

          {/* PASSWORD + tooltip + checkmarks + strength */}
          <div className="relative">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Password
              </label>
              {/* small strength text */}
              <div className="text-xs text-gray-500">
                {password ? (
                  passwordStrength === "weak" ? (
                    <span className="text-red-500">Weak</span>
                  ) : passwordStrength === "medium" ? (
                    <span className="text-yellow-500">Medium</span>
                  ) : (
                    <span className="text-green-500">Strong</span>
                  )
                ) : (
                  <span> </span>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                onFocus={() => setPwFocused(true)}
                onBlur={() => setPwFocused(false)}
                className={`flex-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition ${
                  shake ? "border-red-400" : ""
                } pr-10`}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 p-2 bg-white rounded-md shadow-sm text-gray-600 hover:text-gray-800"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <VisibilityOffIcon fontSize="small" />
                ) : (
                  <VisibilityIcon fontSize="small" />
                )}
              </button>

              {/* checkmark */}
              <div className="ml-2">
                <Check visible={passwordStrength === "strong"} />
              </div>
            </div>

            {/* Tooltip: floating bubble (Option A) */}
            <AnimatePresence>
              {pwFocused && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 top-full mt-2 w-72 z-40 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs"
                >
                  <div className="font-semibold text-sm mb-1">Password must include</div>

                  <div className="flex items-center gap-2 text-sm">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        hasLength ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                    <div className={`${hasLength ? "text-gray-800" : "text-gray-500"}`}>
                      At least 6 characters
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm mt-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        hasUpper ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                    <div className={`${hasUpper ? "text-gray-800" : "text-gray-500"}`}>
                      One uppercase letter (A–Z)
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm mt-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        hasNumber ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                    <div className={`${hasNumber ? "text-gray-800" : "text-gray-500"}`}>
                      One number (0–9)
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* strength bar below */}
            {password && (
              <div className="mt-2 h-2 w-full bg-gray-200 rounded">
                <div
                  className={`h-full rounded transition-all ${
                    passwordStrength === "weak"
                      ? "bg-red-500 w-1/4"
                      : passwordStrength === "medium"
                      ? "bg-yellow-500 w-2/4"
                      : "bg-green-500 w-3/4"
                  }`}
                />
              </div>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative flex items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Confirm Password
              </label>
              <input
                ref={confirmRef}
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition ${
                  shake ? "border-red-400" : ""
                } pr-10`}
                required
              />
            </div>

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="ml-2 p-2 bg-white rounded-md shadow-sm text-gray-600 hover:text-gray-800"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? (
                <VisibilityOffIcon fontSize="small" />
              ) : (
                <VisibilityIcon fontSize="small" />
              )}
            </button>

            <div className="ml-2">
              <Check visible={confirmPassword && password === confirmPassword} />
            </div>
          </div>

          {/* SIGN UP BUTTON */}
          <motion.button
            type="submit"
            disabled={isButtonDisabled}
            whileHover={!isButtonDisabled ? { scale: 1.03 } : {}}
            whileTap={!isButtonDisabled ? { scale: 0.97 } : {}}
            className={`w-full py-2 rounded-md font-semibold shadow-lg transition-colors ${
              isButtonDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:from-indigo-600 hover:to-blue-600"
            }`}
          >
            Create Account
          </motion.button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Already have an account? Login
          </button>
          <div className="mt-2">
            <button onClick={() => navigate("/")} className="text-gray-600 hover:underline">
              ← Back to Home
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
