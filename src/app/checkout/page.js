"use client";

import { CartContext } from "@/app/components/contexts/CartContext";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/app/components/contexts/AuthContext";
import { MainLayout } from "@/app/components/layout";
import { FaShoppingCart, FaRegCreditCard, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const {
    cart: cartItems,
    cartTotal: totalPrice,
    clearCart,
  } = useContext(CartContext);
  const { user } = useAuth();
  const router = useRouter();
  const [orderSummary, setOrderSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [guestInfo, setGuestInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleGuestInfoChange = (e) => {
    const { name, value } = e.target;
    setGuestInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setShowPaymentOptions(true);
  };
  const handlePaymentConfirm = async () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method.");
      return;
    }
    setLoading(true);
    try {
      // Validate guest info if user is not logged in
      if (!user) {
        const requiredFields = [
          "fullName",
          "email",
          "phone",
          "address",
          "city",
        ];
        const missingFields = requiredFields.filter(
          (field) => !guestInfo[field]
        );

        if (missingFields.length > 0) {
          toast.error(
            `Please fill in all required fields: ${missingFields.join(", ")}`
          );
          return;
        }
      }

      const orderData = {
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name || item.title,
          price: parseFloat(item.price),
          quantity: item.quantity || 1,
          image: item.image,
        })),
        totalPrice: parseFloat(totalPrice),
        discount: parseFloat(discount),
        finalPrice: parseFloat(totalPrice - discount),
        paymentMethod: selectedPayment,
        promoCode: promoCode || null,
        customerInfo: user
          ? {
              userId: user.id,
              email: user.email,
            }
          : {
              ...guestInfo,
              isGuest: true,
            },
      };

      const response = await fetch(`${window.location.origin}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) {
        throw new Error("Failed to create order");
      }
      const data = await response.json();
      setOrderSummary(data);
      clearCart();
      setShowPaymentOptions(false);
      setSelectedPayment("");
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error(
        error.message || "An error occurred while placing the order."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackToCart = () => {
    router.push("/cart");
  };

  const handlePromoCodeSubmit = (e) => {
    e.preventDefault();
    // Here you would typically validate the promo code with your backend
    // For now, let's just simulate a fixed 10% discount
    if (promoCode.toLowerCase() === "save10") {
      const discountAmount = totalPrice * 0.1;
      setDiscount(discountAmount);
      toast.success("Promo code applied successfully!");
    } else {
      toast.error("Invalid promo code");
    }
  };

  const paymentMethods = [
    { id: "eSewa", name: "eSewa", logo: "/assets/payment/esewa.svg" },
    { id: "Khalti", name: "Khalti", logo: "/assets/payment/khalti.svg" },
    { id: "Visa", name: "Visa" },
    { id: "MasterCard", name: "MasterCard" },
  ];
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto my-10 p-6 md:p-8 bg-white rounded-2xl shadow-lg">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            {/* Cart Step */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  !showPaymentOptions && !orderSummary
                    ? "bg-blue-600 text-white"
                    : "bg-green-500 text-white"
                }`}>
                <FaShoppingCart className="w-5 h-5" />
              </div>
              <span className="text-sm mt-2 font-medium text-gray-600">
                Cart
              </span>
            </div>

            {/* Progress Line 1 */}
            <div
              className={`flex-1 h-1 mx-4 ${
                showPaymentOptions || orderSummary
                  ? "bg-green-500"
                  : "bg-gray-200"
              }`}
            />

            {/* Payment Step */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  showPaymentOptions && !orderSummary
                    ? "bg-blue-600 text-white"
                    : orderSummary
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}>
                <FaRegCreditCard className="w-5 h-5" />
              </div>
              <span className="text-sm mt-2 font-medium text-gray-600">
                Payment
              </span>
            </div>

            {/* Progress Line 2 */}
            <div
              className={`flex-1 h-1 mx-4 ${
                orderSummary ? "bg-green-500" : "bg-gray-200"
              }`}
            />

            {/* Confirmation Step */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  orderSummary
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-400"
                }`}>
                <FaCheck className="w-5 h-5" />
              </div>
              <span className="text-sm mt-2 font-medium text-gray-600">
                Confirmation
              </span>
            </div>
          </div>
        </div>

        <h1 className="text-4xl text-gray-800 font-semibold text-center mb-8">
          Checkout
        </h1>

        {loading && (
          <div className="text-center py-10">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your order...</p>
          </div>
        )}

        {!loading && !orderSummary && !showPaymentOptions && (
          <div className="space-y-8">
            <h2 className="text-2xl text-gray-800 font-medium">
              Order Summary
            </h2>

            {cartItems.length === 0 ? (
              <div className="text-center p-10 bg-gray-50 rounded-xl text-gray-500">
                <p>Your cart is empty.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Product List */}
                <div className="space-y-4">
                  {cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center p-5 bg-gray-50 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-md">
                      {" "}
                      <Image
                        src={item.image}
                        alt={item.name || item.title}
                        width={96}
                        height={96}
                        className="w-24 h-24 object-cover rounded-lg shadow-sm"
                      />
                      <div className="flex-1 ml-6">
                        <h3 className="text-lg text-gray-800 font-medium">
                          {item.name || item.title}
                        </h3>
                        <p className="text-gray-500">
                          Quantity: {item.quantity || 1}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-blue-600">
                          Rs. {(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Section */}
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-lg text-gray-800 font-medium mb-4">
                    Have a Promo Code?
                  </h3>
                  <form onSubmit={handlePromoCodeSubmit} className="flex gap-3">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 outline-none transition-colors"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-colors hover:bg-blue-700">
                      Apply Code
                    </button>
                  </form>
                </div>

                {/* Order Summary */}
                <div className="p-6 bg-gray-50 rounded-xl">
                  <h3 className="text-lg text-gray-800 font-medium mb-4">
                    Order Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal:</span>
                      <span>Rs. {totalPrice.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>- Rs. {discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-lg font-semibold text-gray-800 pt-4 border-t border-gray-200">
                      <span>Total:</span>
                      <span>Rs. {(totalPrice - discount).toFixed(2)}</span>
                    </div>
                  </div>{" "}
                </div>

                {/* Guest Information Form */}
                {!user && (
                  <div className="p-6 bg-gray-50 rounded-xl">
                    <h3 className="text-lg text-gray-800 font-medium mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={guestInfo.fullName}
                            onChange={handleGuestInfoChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 outline-none transition-colors"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={guestInfo.email}
                            onChange={handleGuestInfoChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 outline-none transition-colors"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={guestInfo.phone}
                          onChange={handleGuestInfoChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 outline-none transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Delivery Address *
                        </label>
                        <textarea
                          name="address"
                          value={guestInfo.address}
                          onChange={handleGuestInfoChange}
                          rows="2"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 outline-none transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={guestInfo.city}
                          onChange={handleGuestInfoChange}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-sm focus:border-blue-500 outline-none transition-colors"
                          required
                        />
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <p className="text-sm text-gray-500">
                          Already have an account?
                        </p>
                        <button
                          type="button"
                          onClick={() => router.push("/login")}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Login →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between gap-4">
              <button
                onClick={handleBackToCart}
                className="px-7 py-3.5 bg-gray-100 text-gray-600 font-medium rounded-lg transition-colors hover:bg-gray-200">
                ← Back to Cart
              </button>
              <button
                onClick={handleCheckout}
                disabled={loading || cartItems.length === 0}
                className={`px-8 py-3.5 font-medium rounded-lg transition-colors ${
                  cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}>
                Proceed to Payment →
              </button>
            </div>
          </div>
        )}

        {/* Payment Options Section */}
        {showPaymentOptions && !orderSummary && (
          <div className="mt-8 p-8 bg-gray-50 rounded-2xl shadow-sm">
            <h2 className="text-3xl text-gray-800 font-medium text-center mb-8">
              Select Payment Method
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl mx-auto mb-8">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`relative flex flex-col items-center p-6 bg-white rounded-xl cursor-pointer transition-all ${
                    selectedPayment === method.id
                      ? "border-2 border-blue-500 shadow-lg -translate-y-0.5"
                      : "border-2 border-gray-200 hover:border-blue-500"
                  }`}
                  onClick={() => setSelectedPayment(method.id)}>
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={selectedPayment === method.id}
                    onChange={() => setSelectedPayment(method.id)}
                    className="sr-only"
                  />
                  {method.logo ? (
                    <Image
                      src={method.logo}
                      alt={method.name}
                      width={100}
                      height={40}
                      className="h-10 object-contain mb-3"
                    />
                  ) : (
                    <span className="text-2xl font-semibold text-gray-800 mb-3">
                      {method.name}
                    </span>
                  )}
                  <span className="text-sm text-gray-500">
                    Pay with {method.name}
                  </span>
                  {selectedPayment === method.id && (
                    <div className="absolute top-3 right-3 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </label>
              ))}
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowPaymentOptions(false)}
                className="px-7 py-3.5 bg-gray-100 text-gray-600 font-medium rounded-lg transition-colors hover:bg-gray-200">
                Back
              </button>
              <button
                onClick={handlePaymentConfirm}
                disabled={!selectedPayment || loading}
                className={`px-8 py-3.5 font-medium rounded-lg transition-colors ${
                  !selectedPayment
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}>
                Confirm & Pay
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {!loading && orderSummary && (
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-green-600">✓</span>
            </div>
            <h2 className="text-3xl text-green-600 font-medium mb-4">
              Order Successfully Placed!
            </h2>{" "}
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. We&apos;ll send you an email with
              your order details.
            </p>
            <div className="bg-gray-50 p-6 rounded-xl mb-8 text-left">
              <h3 className="text-lg text-gray-800 font-medium mb-4">
                Order Details
              </h3>
              <pre className="bg-white p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(orderSummary, null, 2)}
              </pre>
            </div>
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3.5 bg-blue-600 text-white font-medium rounded-lg transition-colors hover:bg-blue-700">
              Continue Shopping →
            </button>{" "}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
