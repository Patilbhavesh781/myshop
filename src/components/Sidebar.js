import { motion } from "framer-motion";

const categories = ["All", "Standard", "Engineering", "Outdoor", "Specialty"];

export default function Sidebar({ selectedCategory, setSelectedCategory, sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden z-10"
          onClick={() => setSidebarOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -200 }}
        transition={{ duration: 0.5 }}
        className={`h-full w-48 bg-white p-4 border-r border-gray-200 shadow-lg
      fixed top-0 left-0 z-20 sm:static sm:translate-x-0
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
                className={`w-full text-left px-2 py-1 rounded-md transition ${selectedCategory === cat ? "bg-yellow-200 font-bold" : "hover:bg-gray-100"
                  }`}
              >{cat}</button>
            </li>
          ))}
        </ul>
      </motion.aside>
    </>
  );
}
