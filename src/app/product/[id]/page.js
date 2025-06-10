"use client";
import { MainLayout } from "@/app/components/layout";
import ProductPage from "./ProductPage";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams();

  return (
    <MainLayout>
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link
                href="/product"
                className="text-gray-500 hover:text-blue-600">
                Products
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-blue-600 font-medium">{id}</li>
          </ol>
        </div>
      </nav>

      <ProductPage />
    </MainLayout>
  );
}
