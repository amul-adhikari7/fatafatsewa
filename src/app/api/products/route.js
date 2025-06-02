import { NextResponse } from "next/server";

const API_KEY = "pk_live_JswWSUmBs6fvt1rRpayAULTNQUfxZZ3I";
const API_URL = "https://fatafatsewa.com/api/v1/products";

export async function GET(request, { params }) {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `${API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();

    // Transform the data to match our frontend's expected format
    const products = rawData.data.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.highlights || product.name,
      price: product.price,
      oldPrice:
        product.discounted_price !== product.price ? product.price : null,
      image: product.image || "/assets/nothing.png",
      tag: product.discountcampaign
        ? `${product.discountcampaign}% Off`
        : "New",
      storage: product.attributes?.Storage || "128GB",
      specs: {
        display:
          product.highlights?.split("|")[0]?.trim() || "6.7-inch Display",
        camera: product.highlights?.split("|")[1]?.trim() || "Dual Camera",
        processor: product.highlights?.split("|")[3]?.trim() || "Processor",
        battery: product.highlights?.split("|")[2]?.trim() || "Battery",
        os: "Android/iOS",
      },
    }));

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
