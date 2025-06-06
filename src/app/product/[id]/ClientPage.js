"use client";
import ProductPage from "./ProductPage";
import dynamic from "next/dynamic";

const DynamicMainLayout = dynamic(
  () => import("../../components/layout").then((mod) => mod.MainLayout),
  { ssr: false }
);

export default function ClientPage() {
  return (
    <DynamicMainLayout>
      <ProductPage />
    </DynamicMainLayout>
  );
}
