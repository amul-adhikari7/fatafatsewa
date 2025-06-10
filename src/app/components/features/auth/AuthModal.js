"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaTimes, FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    rememberMe: false,
  });
  const {
    login,
    register,
    socialLogin,
    authError,
    setAuthError,
    isAuthenticated,
  } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError("");

    try {
      let success;
      if (mode === "login") {
        success = await login(formData.email, formData.password);
      } else {
        success = await register(
          formData.name,
          formData.email,
          formData.password,
          formData.phone
        );
      }

      if (success) {
        onClose();
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    setAuthError("");
    await socialLogin(provider);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay with blur effect */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] sm:w-[480px] min-h-[600px] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors">
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {mode === "login" ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-gray-600 mb-8">
            Please enter your details to{" "}
            {mode === "login" ? "sign in" : "create your account"}.
          </p>
          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-xl p-1.5">
            <button
              className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === "login"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setMode("login")}>
              Sign In
            </button>
            <button
              className={`flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === "register"
                  ? "bg-white text-blue-600 shadow-md"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setMode("register")}>
              Register
            </button>
          </div>
          {/* Form */}{" "}
          <form onSubmit={handleSubmit} className="space-y-5">
            {authError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {authError}
              </div>
            )}

            {mode === "register" && (
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                    <FaUser className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-3.5 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-base"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                    <FaPhone className="w-5 h-5" />
                  </div>{" "}
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full pl-12 pr-4 py-3.5 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-base"
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                <FaEnvelope className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3.5 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-base"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
                <FaLock className="w-5 h-5" />
              </div>{" "}
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3.5 text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-base"
              />
            </div>

            {mode === "login" && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                  />
                  <span className="text-gray-700">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setMode("forgot-password")}
                  className="text-blue-600 hover:text-blue-700 font-medium">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-base transition-all duration-200 transform hover:scale-[0.99] mt-6">
              {isLoading ? (
                <div className="h-6 w-6 border-3 border-white border-t-transparent rounded-full animate-spin mx-auto" />
              ) : mode === "login" ? (
                "Sign in to your account"
              ) : (
                "Create your account"
              )}
            </button>
          </form>
          {/* Social Login */}
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-600 text-base">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {" "}
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                className="flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-gray-700">
                <Image
                  src="/assets/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("facebook")}
                className="flex items-center justify-center gap-3 px-6 py-3.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-gray-700">
                <Image
                  src="/assets/facebook.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
