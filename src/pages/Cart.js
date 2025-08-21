import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 rounded-lg bg-white shadow hover:bg-gray-100 transition text-gray-700 text-sm"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-12">
          {/* Empty Cart Illustration */}
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359553-6010739.png"
            alt="Empty Cart"
            className="w-72 h-72 object-contain mb-6 opacity-90"
          />

          <h2 className="text-2xl font-semibold text-gray-800">
            Your cart is empty 🛒
          </h2>
          <p className="text-gray-500 mt-2">
            Looks like you haven’t added anything yet.  
            Start exploring and find something you love!
          </p>

          {/* Continue Shopping Button */}
          <Link
            to="/"
            className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md font-medium transition"
          >
            🛍️ Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white p-4 rounded-xl shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain rounded"
                />
                <div>
                  <h2 className="font-bold text-lg">{item.name}</h2>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-yellow-600 font-semibold">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                {/* View Details Button */}
                <Link
                  to={`/product/${item.id}`}
                  className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition text-sm"
                >
                  View Details
                </Link>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total Section */}
          <div className="mt-6 text-right border-t pt-4">
            <p className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </p>

            <div className="flex justify-end gap-3 mt-3">
              <button
                onClick={clearCart}
                className="bg-yellow-400 hover:bg-yellow-500 px-6 py-3 rounded-md font-semibold shadow transition"
              >
                Clear Cart
              </button>

              {/* Proceed to Checkout */}
              <button
                onClick={() => navigate("/checkout")}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-semibold shadow transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
