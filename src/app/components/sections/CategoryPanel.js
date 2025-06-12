"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/app/store/categoriesSlice";
import { FaChevronRight } from "react-icons/fa";
import { Card } from "../ui";

const CategoryPanel = () => {
  const dispatch = useDispatch();
  const {
    items: categories,
    status,
    error,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getCategories());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!categories?.length) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="container px-4 mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Browse Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="p-4 flex flex-col items-center text-center gap-3">
                  {category.imageUrl ? (
                    <div className="w-16 h-16 rounded-full bg-gray-100 overflow-hidden">
                      <Image
                        src={category.imageUrl}
                        alt={category.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-xl font-semibold text-blue-600">
                        {category.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    {category.productCount && (
                      <p className="text-sm text-gray-500 mt-1">
                        {category.productCount} Products
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPanel;
