"use client";
import React from "react";
import Link from "next/link";
import { RiStore3Line } from "react-icons/ri";
import { FaTruck } from "react-icons/fa";

import { IoShieldCheckmark } from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";

const DeliveryInfo = () => {
  return (
    <div className="space-y-2">
      {/* Delivery Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border rounded-lg hover:border-primary-500 transition-colors">
          <div className="flex items-center gap-3">
            <RiStore3Line className="text-2xl text-primary-600" />
            <div>
              <h3 className="font-medium">Pick up from the Fatafat Store</h3>
              <p className="text-gray-500">To pick up today</p>
            </div>
          </div>
          <span className="text-gray-700 font-medium">Free</span>
        </div>

        <div className="flex items-center justify-between p-4 border rounded-lg hover:border-primary-500 transition-colors">
          <div className="flex items-center gap-3">
            <FaTruck className="text-2xl text-primary-600" />
            <div>
              <h3 className="font-medium">Courier delivery</h3>
              <p className="text-gray-500">
                Our courier will deliver to the specified address
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-gray-700 font-medium">Free</span>
            <p className="text-sm text-gray-500">1-3 Days</p>
          </div>
        </div>
      </div>{" "}
      {/* Warranty and Returns */}
      <div className="flex gap-4">
        <div className="flex-1 p-4 border rounded-lg hover:border-primary-500 transition-colors">
          <div className="flex items-center gap-3">
            <IoShieldCheckmark className="text-2xl text-primary-600" />
            <div>
              <h3 className="font-medium">Warranty 1 year</h3>
              <p className="text-gray-500">
                <Link href="#" className="text-primary-600 hover:underline">
                  More details
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 border rounded-lg hover:border-primary-500 transition-colors">
          <div className="flex items-center gap-3">
            <TbTruckReturn className="text-2xl text-primary-600" />
            <div>
              <h3 className="font-medium">Free 30-Day returns</h3>
              <p className="text-gray-500">
                <Link href="#" className="text-primary-600 hover:underline">
                  More details
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
