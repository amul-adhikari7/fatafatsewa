"use client";
import React, { useState, useEffect } from "react";
import { MainLayout } from "../components/layout";
import Image from "next/image";

export default function EMICalculator() {
  const [productPrice, setProductPrice] = useState("");
  const [downPaymentOption, setDownPaymentOption] = useState("0");
  const [selectedTenure, setSelectedTenure] = useState(3);
  const [selectedBank, setSelectedBank] = useState(null);
  const [emiDetails, setEmiDetails] = useState(null);
  const [priceError, setPriceError] = useState("");

  const tenureOptions = [3, 6, 9, 12, 18, 24, 36];

  const banks = [
    {
      id: "nabil",
      name: "Nabil Bank",
      logo: "/assets/nabil.svg",
      interestRate: 11.5,
    },
    {
      id: "globalime",
      name: "Global IME Bank",
      logo: "/assets/globalime.svg",
      interestRate: 12,
    },
    {
      id: "nmb",
      name: "NMB Bank",
      logo: "/assets/nmb.svg",
      interestRate: 11.75,
    },
    {
      id: "siddhartha",
      name: "Siddhartha Bank",
      logo: "/assets/siddhartha.svg",
      interestRate: 12.25,
    },
  ];
  // Calculate EMI details whenever inputs change
  useEffect(() => {
    if (productPrice && selectedBank) {
      calculateEMI();
    }
  }, [
    productPrice,
    downPaymentOption,
    selectedTenure,
    selectedBank,
    calculateEMI,
  ]);

  const validatePrice = (price) => {
    if (!price) {
      setPriceError("Product price is required");
      return false;
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      setPriceError("Please enter a valid price");
      return false;
    }
    if (parseFloat(price) < 1000) {
      setPriceError("Minimum product price should be Rs 1,000");
      return false;
    }
    if (parseFloat(price) > 10000000) {
      setPriceError("Maximum product price should be Rs 1,00,00,000");
      return false;
    }
    setPriceError("");
    return true;
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setProductPrice(value);
    validatePrice(value);
  };

  const calculateEMI = () => {
    if (!validatePrice(productPrice)) {
      return;
    }
    const price = parseFloat(productPrice);
    const downPaymentPercentage = parseInt(downPaymentOption);
    const downPaymentAmount = (price * downPaymentPercentage) / 100;
    const loanAmount = price - downPaymentAmount;

    const annualInterestRate = selectedBank ? selectedBank.interestRate : 12;
    const monthlyInterestRate = annualInterestRate / 12 / 100;
    const tenure = parseInt(selectedTenure);

    // EMI calculation formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
    // where P is principal, r is monthly interest rate, n is tenure in months
    const emi =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, tenure)) /
      (Math.pow(1 + monthlyInterestRate, tenure) - 1);

    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - loanAmount;

    setEmiDetails({
      downPayment: downPaymentAmount,
      loanAmount: loanAmount,
      monthlyEMI: emi,
      totalInterest: totalInterest,
      totalPayment: totalPayment + downPaymentAmount,
    });
  };

  const formatCurrency = (amount) => {
    return `Rs ${amount.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">EMI Calculator</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-6">
              {/* Product Price Input */}
              <div>
                {" "}
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="number"
                  value={productPrice}
                  onChange={handlePriceChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    priceError ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter the product name"
                />
                {priceError && (
                  <p className="mt-1 text-sm text-red-600">{priceError}</p>
                )}
              </div>

              {/* Down Payment Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment Option
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setDownPaymentOption("0")}
                    className={`px-4 py-2 rounded-lg border ${
                      downPaymentOption === "0"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                    }`}>
                    No Down Payment
                  </button>
                  <button
                    onClick={() => setDownPaymentOption("40")}
                    className={`px-4 py-2 rounded-lg border ${
                      downPaymentOption === "40"
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                    }`}>
                    40% Down Payment
                  </button>
                </div>
              </div>

              {/* Tenure Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Tenure (Months)
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {tenureOptions.map((tenure) => (
                    <button
                      key={tenure}
                      onClick={() => setSelectedTenure(tenure)}
                      className={`px-3 py-2 rounded-lg border text-sm ${
                        selectedTenure === tenure
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-500"
                      }`}>
                      {tenure} Months
                    </button>
                  ))}
                </div>
              </div>

              {/* Bank Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Bank
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {banks.map((bank) => (
                    <button
                      key={bank.id}
                      onClick={() => setSelectedBank(bank)}
                      className={`flex items-center px-4 py-3 rounded-lg border ${
                        selectedBank?.id === bank.id
                          ? "bg-blue-50 border-blue-500"
                          : "bg-white border-gray-300 hover:border-blue-300"
                      }`}>
                      <div className="relative w-6 h-6 mr-2">
                        <Image
                          src={bank.logo}
                          alt={bank.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">{bank.name}</span>
                        <span className="text-xs text-gray-500">
                          {bank.interestRate}% p.a.
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <div className="pt-4">
                <button
                  onClick={calculateEMI}
                  disabled={!productPrice || !selectedBank}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors">
                  Calculate EMI
                </button>
              </div>

              {/* Reset Button */}
              <div>
                <button
                  onClick={() => {
                    setProductPrice("");
                    setDownPaymentOption("0");
                    setSelectedTenure(3);
                    setSelectedBank(null);
                    setEmiDetails(null);
                  }}
                  className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Reset
                </button>
              </div>
            </div>
          </div>
          {/* EMI Details */}{" "}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">EMI Details</h2>
            {emiDetails && productPrice && selectedBank ? (
              <div className="space-y-4">
                {/* Selected Bank Info */}
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <div className="flex items-center">
                    <div className="relative w-8 h-8 mr-3">
                      <Image
                        src={selectedBank.logo}
                        alt={selectedBank.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-blue-900">
                        {selectedBank.name}
                      </div>
                      <div className="text-sm text-blue-700">
                        {selectedBank.interestRate}% Interest Rate
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Down Payment</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(emiDetails.downPayment)}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Loan Amount</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(emiDetails.loanAmount)}
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-600">Monthly EMI</div>
                  <div className="text-2xl font-bold text-blue-700">
                    {formatCurrency(emiDetails.monthlyEMI)}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Total Interest</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(emiDetails.totalInterest)}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Total Payment</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {formatCurrency(emiDetails.totalPayment)}
                    </div>
                  </div>
                </div>{" "}
                {/* Eligibility Info */}{" "}
                <div className="mt-4 space-y-4">
                  {/* Eligibility Info */}
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">
                      EMI Eligibility
                    </h3>
                    <ul className="space-y-2 text-sm text-green-800">
                      <li className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                        Age: 21-65 years
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                        Minimum Income: Rs 25,000/month
                      </li>
                      <li className="flex items-center">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                        Employment: 6+ months at current job
                      </li>
                    </ul>
                  </div>

                  {/* Partner Banks Grid */}
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-4">
                      Our Partner Banks
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {banks.map((bank) => (
                        <div key={bank.id} className="relative w-full h-8">
                          <Image
                            src={bank.logo}
                            alt={bank.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ))}
                    </div>{" "}
                  </div>
                </div>
                {/* EMI Schedule Table */}
                <div className="mt-8">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">
                    EMI Payment Schedule
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Month
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            EMI Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Principal
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Interest
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Balance
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {Array.from({ length: selectedTenure }, (_, index) => {
                          const monthlyInterestRate =
                            selectedBank.interestRate / 12 / 100;
                          const emi = emiDetails.monthlyEMI;
                          const openingBalance =
                            index === 0
                              ? emiDetails.loanAmount
                              : previousBalance -
                                (emi - previousBalance * monthlyInterestRate);
                          const interest = openingBalance * monthlyInterestRate;
                          const principal = emi - interest;
                          const previousBalance = openingBalance;

                          return (
                            <tr
                              key={index}
                              className={
                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                              }>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {index + 1}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(emi)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(principal)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(interest)}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {formatCurrency(
                                  Math.max(0, openingBalance - principal)
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Please enter product price and select a bank to see EMI details
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
