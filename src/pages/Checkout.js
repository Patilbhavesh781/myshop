import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

export default function Checkout() {
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
    });

    const [payment, setPayment] = useState("cod"); // default Cash on Delivery

    const totalPrice = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.address) {
            alert("Please fill all required fields.");
            return;
        }

        clearCart();
        navigate("/thank-you");
    };


    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Back to Cart */}
            <Link
                to="/cart"
                className="mb-4 inline-block px-4 py-2 rounded-lg bg-white shadow hover:bg-gray-100 transition text-gray-700 text-sm"
            >
                ← Back to Cart
            </Link>

            <h1 className="text-3xl font-bold mb-6">Checkout</h1>

            {cartItems.length === 0 ? (
                <div className="text-center mt-20">
                    <h2 className="text-xl font-semibold text-gray-700">
                        Your cart is empty 🛒
                    </h2>
                    <Link
                        to="/"
                        className="mt-4 inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow-md font-medium transition"
                    >
                        🛍️ Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Shipping Form */}
                    <form
                        onSubmit={handlePlaceOrder}
                        className="bg-white p-6 rounded-xl shadow-md col-span-2"
                    >
                        <h2 className="text-xl font-bold mb-4">Shipping Details</h2>

                        <div className="grid grid-cols-1 gap-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border p-3 rounded-md"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="border p-3 rounded-md"
                                required
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Street Address"
                                value={formData.address}
                                onChange={handleChange}
                                className="border p-3 rounded-md"
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="border p-3 rounded-md"
                                />
                                <input
                                    type="text"
                                    name="zip"
                                    placeholder="ZIP Code"
                                    value={formData.zip}
                                    onChange={handleChange}
                                    className="border p-3 rounded-md"
                                />
                            </div>
                        </div>

                        {/* Payment Section */}
                        <h2 className="text-xl font-bold mt-6 mb-2">Payment Method</h2>
                        <div className="space-y-3">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={payment === "cod"}
                                    onChange={() => setPayment("cod")}
                                />
                                Cash on Delivery
                            </label>

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    checked={payment === "card"}
                                    onChange={() => setPayment("card")}
                                />
                                Credit / Debit Card
                            </label>

                            {payment === "card" && (
                                <div className="grid grid-cols-1 gap-3 ml-6">
                                    <input
                                        type="text"
                                        placeholder="Card Number"
                                        className="border p-2 rounded-md"
                                    />
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            className="border p-2 rounded-md"
                                        />
                                        <input
                                            type="text"
                                            placeholder="CVV"
                                            className="border p-2 rounded-md"
                                        />
                                    </div>
                                </div>
                            )}

                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="upi"
                                    checked={payment === "upi"}
                                    onChange={() => setPayment("upi")}
                                />
                                UPI / Google Pay / PhonePe
                            </label>

                            {payment === "upi" && (
                                <input
                                    type="text"
                                    placeholder="Enter UPI ID"
                                    className="border p-2 rounded-md ml-6"
                                />
                            )}
                        </div>

                        <button
                            type="submit"
                            className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold shadow transition"
                        >
                            ✅ Place Order
                        </button>
                    </form>

                    {/* Order Summary */}
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="space-y-3">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between border-b pb-2"
                                >
                                    <div>
                                        <p className="font-medium">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-semibold text-yellow-600">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
