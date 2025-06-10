"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import MainLayout from "@/app/components/layout/MainLayout";
import { toast } from "react-toastify";
import "./styles.css";

const InputError = ({ error }) =>
  error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null;

const LoadingSpinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

const CustomFormLabel = ({ children, tooltip }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1">
    {children}
    {tooltip && (
      <span className="ml-1 text-gray-400 hover:text-gray-600 cursor-help">
        ⓘ
      </span>
    )}
  </label>
);

export default function EmiApplicationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productName = searchParams.get("name") || "";
  const price = searchParams.get("price") || "";

  const [step, setStep] = useState("initial");
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    hasCard: null,
    // Credit card
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cardLimit: "",
    // Citizenship
    fullName: "",
    grandfatherName: "",
    nidNumber: "",
    email: "",
    phone: "",
    address: "",
    documentNumber: "",
    passportPhoto: null,
    citizenshipFront: null,
    citizenshipBack: null,
    // Guarantor
    guarantorFullName: "",
    guarantorPhone: "",
    guarantorAddress: "",
    guarantorCitizenshipNumber: "",
    guarantorPassportPhoto: null,
    guarantorCitizenshipFront: null,
    guarantorCitizenshipBack: null,
    // Apply card
    employmentType: "",
    applyCardNidNumber: "",
    monthlySalary: "",
    monthlyExpenses: "",
    salariedBankDetail: "",
    residentialStatus: "",
    numberOfDependents: "",
    applyCardPassportPhoto: null,
    applyCardCitizenshipFront: null,
    applyCardCitizenshipBack: null,
    salaryCertificate: null,
    bankStatement: null,
  });

  // --- Validation ---
  const validateForm = () => {
    const newErrors = {};
    if (step === "creditCard") {
      if (!formData.cardNumber?.trim())
        newErrors.cardNumber = "Card number is required";
      if (!formData.cardName?.trim())
        newErrors.cardName = "Name on card is required";
      if (!formData.expiryDate?.trim())
        newErrors.expiryDate = "Expiry date is required";
      if (!formData.cardLimit?.trim())
        newErrors.cardLimit = "Credit card limit is required";
      if (isNaN(formData.cardLimit) || Number(formData.cardLimit) <= 0)
        newErrors.cardLimit = "Please enter a valid credit limit";
      if (!/^\d{16}$/.test(formData.cardNumber?.replace(/\s/g, "")))
        newErrors.cardNumber = "Invalid card number format";
      if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate))
        newErrors.expiryDate = "Invalid expiry date format (MM/YY)";
    }
    if (step === "citizenship") {
      if (!formData.fullName?.trim())
        newErrors.fullName = "Full name is required";
      if (!formData.grandfatherName?.trim())
        newErrors.grandfatherName = "Grandfather's name is required";
      if (!formData.nidNumber?.trim())
        newErrors.nidNumber = "NID number is required";
      if (!formData.email?.trim()) newErrors.email = "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.phone?.trim()) newErrors.phone = "Phone number is required";
      if (!/^\d{10}$/.test(formData.phone?.replace(/\D/g, "")))
        newErrors.phone = "Invalid phone number format";
      if (!formData.address?.trim()) newErrors.address = "Address is required";
      if (!formData.documentNumber?.trim())
        newErrors.documentNumber = "Citizenship number is required";
      if (!formData.passportPhoto)
        newErrors.passportPhoto = "Passport size photo is required";
      if (!formData.citizenshipFront)
        newErrors.citizenshipFront = "Citizenship front photo is required";
      if (!formData.citizenshipBack)
        newErrors.citizenshipBack = "Citizenship back photo is required";
      // Guarantor
      if (!formData.guarantorFullName?.trim())
        newErrors.guarantorFullName = "Guarantor's full name is required";
      if (!formData.guarantorPhone?.trim())
        newErrors.guarantorPhone = "Guarantor's phone number is required";
      if (!/^\d{10}$/.test(formData.guarantorPhone?.replace(/\D/g, "")))
        newErrors.guarantorPhone = "Invalid phone number format";
      if (!formData.guarantorAddress?.trim())
        newErrors.guarantorAddress = "Guarantor's address is required";
      if (!formData.guarantorCitizenshipNumber?.trim())
        newErrors.guarantorCitizenshipNumber =
          "Guarantor's citizenship number is required";
      if (!formData.guarantorPassportPhoto)
        newErrors.guarantorPassportPhoto =
          "Guarantor's passport size photo is required";
      if (!formData.guarantorCitizenshipFront)
        newErrors.guarantorCitizenshipFront =
          "Guarantor's citizenship front photo is required";
      if (!formData.guarantorCitizenshipBack)
        newErrors.guarantorCitizenshipBack =
          "Guarantor's citizenship back photo is required";
    }
    if (step === "applyCard") {
      if (!formData.fullName?.trim())
        newErrors.fullName = "Full name is required";
      if (!formData.email?.trim()) newErrors.email = "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = "Invalid email format";
      if (!formData.phone?.trim()) newErrors.phone = "Phone number is required";
      if (!/^\d{10}$/.test(formData.phone?.replace(/\D/g, "")))
        newErrors.phone = "Invalid phone number format";
      if (!formData.address?.trim()) newErrors.address = "Address is required";
      if (!formData.employmentType)
        newErrors.employmentType = "Employment type is required";
      if (!formData.applyCardNidNumber?.trim())
        newErrors.applyCardNidNumber = "NID number is required";
      if (!formData.monthlySalary?.trim())
        newErrors.monthlySalary = "Monthly salary is required";
      if (!formData.monthlyExpenses?.trim())
        newErrors.monthlyExpenses = "Monthly expenses are required";
      if (!formData.residentialStatus)
        newErrors.residentialStatus = "Residential status is required";
      if (!formData.numberOfDependents?.trim())
        newErrors.numberOfDependents = "Number of dependents is required";
      if (!formData.applyCardPassportPhoto)
        newErrors.applyCardPassportPhoto = "Passport photo is required";
      if (!formData.applyCardCitizenshipFront)
        newErrors.applyCardCitizenshipFront =
          "Citizenship front photo is required";
      if (!formData.applyCardCitizenshipBack)
        newErrors.applyCardCitizenshipBack =
          "Citizenship back photo is required";
      if (!formData.salaryCertificate)
        newErrors.salaryCertificate = "Salary certificate is required";
      if (!formData.bankStatement)
        newErrors.bankStatement = "Bank statement is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success("EMI application submitted successfully!");
      if (step === "creditCard") {
        router.push("/emi-calculator?approved=true");
      } else {
        router.push("/checkout");
      }
    } catch (error) {
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- UI Steps ---
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6">
        <div className="flex gap-8">
          {/* Left: Product Details Panel */}
          <div className="w-1/4 h-fit sticky top-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-medium text-gray-900 mb-4">
                Product Summary
              </h3>
              <div className="aspect-square relative mb-4 bg-gray-50 rounded-lg">
                <Image
                  src="/assets/placeholder.png"
                  alt={productName}
                  width={400}
                  height={400}
                  className="object-contain p-4"
                />
              </div>
              <h4 className="font-medium text-gray-800">{productName}</h4>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-blue-600">
                  Rs. {parseInt(price).toLocaleString()}
                </span>
              </div>

              {/* EMI Calculator Preview */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h5 className="text-sm font-medium text-gray-700 mb-3">
                  EMI Details
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly EMI from</span>
                    <span className="font-medium text-gray-900">
                      Rs. {Math.round(parseInt(price) / 24).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tenure</span>
                    <span className="font-medium text-gray-900">
                      3-24 months
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-medium text-gray-900">
                      11.5% p.a.
                    </span>
                  </div>
                </div>
              </div>

              {/* Processing Fee Info */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Processing fee: 2% of loan amount</p>
                  <p>• Documentation charges may apply</p>
                  <p>• EMI amount may vary based on final approval</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Application Form */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        step === "initial"
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray-300"
                      }`}>
                      <span className="text-sm font-bold text-blue-700">1</span>
                    </div>
                    <span className="text-gray-700 font-medium">Start</span>
                  </div>
                  <div className="flex-1 h-0.5 mx-2 bg-gray-200"></div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        ["creditCard", "citizenship", "applyCard"].includes(
                          step
                        )
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray-300"
                      }`}>
                      <span className="text-sm font-bold text-blue-700">2</span>
                    </div>
                    <span className="text-gray-700 font-medium">Details</span>
                  </div>
                  <div className="flex-1 h-0.5 mx-2 bg-gray-200"></div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                        isLoading
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray-300"
                      }`}>
                      <span className="text-sm font-bold text-blue-700">3</span>
                    </div>
                    <span className="text-gray-700 font-medium">Submit</span>
                  </div>
                </div>
              </div>

              {/* Application Forms */}
              {step === "initial" && (
                <div className="text-center py-10">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                    Do you have a credit card?
                  </h2>
                  <div className="flex justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, hasCard: true }));
                        setStep("creditCard");
                      }}
                      className="px-8 py-4 bg-blue-600 text-white font-medium rounded-lg transition-all hover:bg-blue-700 transform hover:-translate-y-0.5">
                      Yes, I have a credit card
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep("noCardOptions")}
                      className="px-8 py-4 bg-gray-100 text-gray-800 font-medium rounded-lg transition-all hover:bg-gray-200 transform hover:-translate-y-0.5">
                      No, I don&apos;t have one
                    </button>
                  </div>
                </div>
              )}
              {/* Step 1b: No Card Options */}
              {step === "noCardOptions" && (
                <div className="text-center py-10">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Choose an Option
                  </h2>
                  <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button
                      type="button"
                      onClick={() => setStep("citizenship")}
                      className="px-8 py-4 bg-blue-50 text-blue-800 font-medium rounded-lg border border-blue-200 hover:bg-blue-100 transition-all">
                      Apply with Citizenship
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep("applyCardPopup")}
                      className="px-8 py-4 bg-green-50 text-green-800 font-medium rounded-lg border border-green-200 hover:bg-green-100 transition-all">
                      Apply for Credit Card
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("initial")}
                    className="mt-8 text-blue-600 hover:underline text-sm">
                    &larr; Back
                  </button>
                </div>
              )}
              {/* Step 2a: Credit Card Form */}
              {step === "creditCard" && (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 max-w-lg mx-auto">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Credit Card Details
                  </h3>
                  <div>
                    <CustomFormLabel tooltip="Enter your 16-digit card number without spaces">
                      Card Number
                    </CustomFormLabel>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors.cardNumber ? "border-red-500" : "border-gray-300"
                      }`}
                      maxLength="19"
                    />
                    <InputError error={errors.cardNumber} />
                  </div>
                  <div>
                    <CustomFormLabel>Name on Card</CustomFormLabel>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        errors.cardName ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    <InputError error={errors.cardName} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <CustomFormLabel tooltip="Expiry date format: MM/YY">
                        Expiry Date
                      </CustomFormLabel>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.expiryDate
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        maxLength="5"
                      />
                      <InputError error={errors.expiryDate} />
                    </div>
                    <div>
                      <CustomFormLabel tooltip="Enter your credit card limit">
                        Credit Card Limit
                      </CustomFormLabel>
                      <input
                        type="number"
                        name="cardLimit"
                        value={formData.cardLimit}
                        onChange={handleInputChange}
                        placeholder="Enter card limit"
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          errors.cardLimit
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      <InputError error={errors.cardLimit} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setStep("initial")}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                      disabled={isLoading}>
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`px-6 py-2 rounded-lg transition-colors ${
                        isLoading
                          ? "bg-blue-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white flex items-center justify-center`}>
                      {isLoading ? (
                        <>
                          <LoadingSpinner />
                          Processing...
                        </>
                      ) : (
                        "Continue"
                      )}
                    </button>
                  </div>
                </form>
              )}
              {/* Step 2a: Citizenship Form */}
              {step === "citizenship" && (
                <div className="flex gap-8">
                  {/* Left: Product Details Panel */}
                  <div className="w-1/3 h-fit sticky top-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                      <h3 className="font-medium text-gray-900 mb-4">
                        Product Summary
                      </h3>
                      <div className="aspect-square relative mb-4 bg-gray-50 rounded-lg">
                        <Image
                          src="/assets/placeholder.png"
                          alt={productName}
                          width={400}
                          height={400}
                          className="object-contain p-4"
                        />
                      </div>
                      <h4 className="font-medium text-gray-800">
                        {productName}
                      </h4>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-blue-600">
                          Rs. {parseInt(price).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Application Form */}
                  <div className="flex-1">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Header */}
                      <div className="border-b border-gray-200 pb-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          Apply with Citizenship
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Please fill in your personal details and upload
                          required documents
                        </p>
                      </div>

                      {/* Personal Information Section */}
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <h4 className="flex items-center text-lg font-medium text-gray-800 mb-4">
                          <svg
                            className="w-5 h-5 mr-2 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          Personal Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <CustomFormLabel>Full Name</CustomFormLabel>
                            <input
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="Enter your full name"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                errors.fullName
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <InputError error={errors.fullName} />
                          </div>
                          <div>
                            <CustomFormLabel>
                              Grandfather&apos;s Name
                            </CustomFormLabel>
                            <input
                              name="grandfatherName"
                              value={formData.grandfatherName}
                              onChange={handleInputChange}
                              placeholder="Enter your grandfather's name"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                errors.grandfatherName
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <InputError error={errors.grandfatherName} />
                          </div>
                          <div>
                            <CustomFormLabel>NID Number</CustomFormLabel>
                            <input
                              name="nidNumber"
                              value={formData.nidNumber}
                              onChange={handleInputChange}
                              placeholder="Enter your NID number"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                errors.nidNumber
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <InputError error={errors.nidNumber} />
                          </div>
                          <div>
                            <CustomFormLabel>Email</CustomFormLabel>
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Enter your email"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                errors.email
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <InputError error={errors.email} />
                          </div>
                          <div>
                            <CustomFormLabel>Phone Number</CustomFormLabel>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="Enter your phone number"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                errors.phone
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <InputError error={errors.phone} />
                          </div>
                          <div>
                            <CustomFormLabel>Address</CustomFormLabel>
                            <input
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleInputChange}
                              placeholder="Enter your address"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                errors.address
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <InputError error={errors.address} />
                          </div>
                          <div>
                            <CustomFormLabel>
                              Citizenship Number
                            </CustomFormLabel>
                            <input
                              type="text"
                              name="documentNumber"
                              value={formData.documentNumber}
                              onChange={handleInputChange}
                              placeholder="Enter your citizenship number"
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                errors.documentNumber
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            <InputError error={errors.documentNumber} />
                          </div>
                        </div>
                      </div>

                      {/* Document Upload Section */}
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <h4 className="flex items-center text-lg font-medium text-gray-800 mb-6">
                          <svg
                            className="w-5 h-5 mr-2 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          Document Upload
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="relative group">
                            <CustomFormLabel tooltip="Upload recent passport-size photo (JPG/PNG)">
                              Passport Size Photo
                            </CustomFormLabel>
                            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-all duration-300 bg-gray-50 group-hover:bg-blue-50">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleFileChange(e, "passportPhoto")
                                }
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <div className="text-center space-y-3">
                                <svg
                                  className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                  />
                                </svg>
                                <span className="block text-sm font-medium text-gray-900">
                                  {formData.passportPhoto
                                    ? formData.passportPhoto.name
                                    : "Choose file"}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Max size: 5MB
                                </span>
                              </div>
                            </div>
                            <InputError error={errors.passportPhoto} />
                          </div>

                          <div className="relative group">
                            <CustomFormLabel tooltip="Upload citizenship front photo (JPG/PNG)">
                              Citizenship Front
                            </CustomFormLabel>
                            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-all duration-300 bg-gray-50 group-hover:bg-blue-50">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleFileChange(e, "citizenshipFront")
                                }
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <div className="text-center space-y-3">
                                <svg
                                  className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                  />
                                </svg>
                                <span className="block text-sm font-medium text-gray-900">
                                  {formData.citizenshipFront
                                    ? formData.citizenshipFront.name
                                    : "Choose file"}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Max size: 5MB
                                </span>
                              </div>
                            </div>
                            <InputError error={errors.citizenshipFront} />
                          </div>

                          <div className="relative group">
                            <CustomFormLabel tooltip="Upload citizenship back photo (JPG/PNG)">
                              Citizenship Back
                            </CustomFormLabel>
                            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-all duration-300 bg-gray-50 group-hover:bg-blue-50">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleFileChange(e, "citizenshipBack")
                                }
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                              />
                              <div className="text-center space-y-3">
                                <svg
                                  className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                  />
                                </svg>
                                <span className="block text-sm font-medium text-gray-900">
                                  {formData.citizenshipBack
                                    ? formData.citizenshipBack.name
                                    : "Choose file"}
                                </span>
                                <span className="text-xs text-gray-500">
                                  Max size: 5MB
                                </span>
                              </div>
                            </div>
                            <InputError error={errors.citizenshipBack} />
                          </div>
                        </div>
                      </div>

                      {/* Guarantor Section - Enhanced Design */}
                      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                          <h4 className="flex items-center text-lg font-medium text-gray-800">
                            <svg
                              className="w-5 h-5 mr-2 text-blue-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            Guarantor Information
                          </h4>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Required
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Guarantor Basic Info */}
                          <div className="space-y-6">
                            <div>
                              <CustomFormLabel>
                                Guarantors Full Name
                              </CustomFormLabel>
                              <input
                                type="text"
                                name="guarantorFullName"
                                value={formData.guarantorFullName}
                                onChange={handleInputChange}
                                className="input-field"
                                placeholder="Enter guarantor's full name"
                              />
                              <InputError error={errors.guarantorFullName} />
                            </div>

                            <div>
                              <CustomFormLabel>Phone Number</CustomFormLabel>
                              <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                  +977
                                </span>
                                <input
                                  type="tel"
                                  name="guarantorPhone"
                                  value={formData.guarantorPhone}
                                  onChange={handleInputChange}
                                  className="input-field pl-12"
                                  placeholder=""
                                />
                              </div>
                              <InputError error={errors.guarantorPhone} />
                            </div>
                          </div>

                          {/* Guarantor Additional Info */}
                          <div className="space-y-6">
                            <div>
                              <CustomFormLabel>Address</CustomFormLabel>
                              <input
                                type="text"
                                name="guarantorAddress"
                                value={formData.guarantorAddress}
                                onChange={handleInputChange}
                                className="input-field"
                                placeholder="Enter complete address"
                              />
                              <InputError error={errors.guarantorAddress} />
                            </div>

                            <div>
                              <CustomFormLabel>
                                Citizenship Number
                              </CustomFormLabel>
                              <input
                                type="text"
                                name="guarantorCitizenshipNumber"
                                value={formData.guarantorCitizenshipNumber}
                                onChange={handleInputChange}
                                className="input-field"
                                placeholder="Enter citizenship number"
                              />
                              <InputError
                                error={errors.guarantorCitizenshipNumber}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Guarantor Documents */}
                        <div className="mt-6">
                          <h5 className="text-sm font-medium text-gray-700 mb-4">
                            Required Documents
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="file-upload-box">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleFileChange(e, "guarantorPassportPhoto")
                                }
                                className="hidden"
                                id="guarantor-photo"
                              />
                              <label
                                htmlFor="guarantor-photo"
                                className="file-upload-label">
                                <svg
                                  className="upload-icon"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                                  />
                                </svg>
                                <span className="upload-text">
                                  Passport Photo
                                </span>
                              </label>
                              <InputError
                                error={errors.guarantorPassportPhoto}
                              />
                            </div>

                            <div className="file-upload-box">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleFileChange(
                                    e,
                                    "guarantorCitizenshipFront"
                                  )
                                }
                                className="hidden"
                                id="guarantor-citizenship-front"
                              />
                              <label
                                htmlFor="guarantor-citizenship-front"
                                className="file-upload-label">
                                <svg
                                  className="upload-icon"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                                  />
                                </svg>
                                <span className="upload-text">
                                  Citizenship Front
                                </span>
                              </label>
                              <InputError
                                error={errors.guarantorCitizenshipFront}
                              />
                            </div>

                            <div className="file-upload-box">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                  handleFileChange(
                                    e,
                                    "guarantorCitizenshipBack"
                                  )
                                }
                                className="hidden"
                                id="guarantor-citizenship-back"
                              />
                              <label
                                htmlFor="guarantor-citizenship-back"
                                className="file-upload-label">
                                <svg
                                  className="upload-icon"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"
                                  />
                                </svg>
                                <span className="upload-text">
                                  Citizenship Back
                                </span>
                              </label>
                              <InputError
                                error={errors.guarantorCitizenshipBack}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-end gap-3 pt-6 border-t">
                        <button
                          type="button"
                          onClick={() => setStep("noCardOptions")}
                          className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                          disabled={isLoading}>
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className={`px-8 py-2.5 rounded-lg transition-all transform hover:-translate-y-0.5 ${
                            isLoading
                              ? "bg-blue-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg"
                          } text-white font-medium flex items-center justify-center`}>
                          {isLoading ? (
                            <>
                              <LoadingSpinner />
                              Processing...
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {/* Step 2b: Apply for Credit Card Popup */}
              {step === "applyCardPopup" && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                  <div className="bg-white rounded-xl p-6 max-w-lg w-full shadow-2xl relative">
                    <button
                      type="button"
                      onClick={() => setStep("noCardOptions")}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                      title="Close">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Apply for Credit Card
                      </h3>
                      <div>
                        <CustomFormLabel>Full Name</CustomFormLabel>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.fullName
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          required
                        />
                        <InputError error={errors.fullName} />
                      </div>
                      <div>
                        <CustomFormLabel>Email</CustomFormLabel>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          }`}
                          required
                        />
                        <InputError error={errors.email} />
                      </div>
                      <div>
                        <CustomFormLabel>Phone Number</CustomFormLabel>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                          required
                        />
                        <InputError error={errors.phone} />
                      </div>
                      <div>
                        <CustomFormLabel>Employment Type</CustomFormLabel>
                        <select
                          name="employmentType"
                          value={formData.employmentType}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                            errors.employmentType
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          required>
                          <option value="">Select Employment Type</option>
                          <option value="salaried">Salaried</option>
                          <option value="self-employed">Self-Employed</option>
                          <option value="business">Business Owner</option>
                          <option value="other">Other</option>
                        </select>
                        <InputError error={errors.employmentType} />
                      </div>
                      {/* Add more fields as needed */}
                      <div className="flex justify-end gap-3 mt-6">
                        <button
                          type="button"
                          onClick={() => setStep("noCardOptions")}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800"
                          disabled={isLoading}>
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isLoading}
                          className={`px-6 py-2 rounded-lg transition-colors ${
                            isLoading
                              ? "bg-blue-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                          } text-white flex items-center justify-center`}>
                          {isLoading ? (
                            <>
                              <LoadingSpinner />
                              Processing...
                            </>
                          ) : (
                            "Submit Application"
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
