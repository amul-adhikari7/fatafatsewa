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
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }

  // Filter featured root categories and sort by order
  const displayCategories = (categories || [])
    .filter((category) => !category.parentId && category.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 4)
    .map((category) => ({
      id: category.id,
      title: category.name,
      image: category.imageUrl,
      slug: category.slug,
      productCount: category.featured ? "Featured" : "Available",
    }));

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Popular Categories</h2>
          <Link
            href="/categories"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1">
            View All
            <FaChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {displayCategories.map((category) => (
            <Link
              href={`/category/${category.slug}`}
              key={category.id}
              className="transform hover:scale-105 transition-transform duration-200">
              <Card hover className="h-full">
                <div className="relative aspect-[4/3]">
                  {category.image && (
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-semibold">
                      {category.title}
                    </h3>
                    <p className="text-xs text-white/80">
                      {category.productCount}
                    </p>
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
