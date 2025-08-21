import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import ThreeDViewer from "../components/ThreeDViewer";
import products from "../data/products"; // extract product array into `src/data/products.js`

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <motion.div className="p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <button onClick={() => window.history.back()} className="mb-4 bg-gray-200 px-4 py-2 rounded-md shadow">
        ← Back
      </button>

      <div className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div initial={{ rotateY: 90, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ duration: 1 }}>
          <ThreeDViewer modelPath={product.model} />
          <motion.img src={product.image} alt={product.name} className="mt-4 w-full h-56 object-contain"
            whileHover={{ scale: 1.05, rotate: 1 }}
          />
        </motion.div>
        <div>
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.desc}</p>
          <p className="text-xl text-yellow-600 font-bold mb-6">{product.price}</p>
          <motion.button
            className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-md text-lg font-semibold shadow-lg"
            whileHover={{ scale: 1.1, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
          >Add to Cart</motion.button>
        </div>
      </div>
    </motion.div>
  );
}
