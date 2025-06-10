import { NextResponse } from "next/server";

const API_KEY = "pk_live_JswWSUmBs6fvt1rRpayAULTNQUfxZZ3I";
const API_URL = "https://fatafatsewa.com/api/v1/products";

// Data transformation helper
const transformProductData = (product) => {
  try {
    return {
      id: parseInt(product.id),
      name: product.name || "",
      description: product.highlights || product.name || "",
      price:
        typeof product.price === "string"
          ? parseFloat(product.price.replace(/[^\d.]/g, ""))
          : product.price,
      category: product.category || "",
      oldPrice:
        product.discounted_price !== product.price
          ? typeof product.price === "string"
            ? parseFloat(product.price.replace(/[^\d.]/g, ""))
            : product.price
          : null,
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
    };
  } catch (error) {
    console.error("Error transforming product data:", error);
    return null;
  }
};

export async function GET(request, { params }) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || 1;
    const limit = searchParams.get("limit") || 20;

    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`, {
      headers: {
        "API-Key": API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const rawData = await response.json();

    // Validate and transform the data
    if (!rawData?.data || !Array.isArray(rawData.data)) {
      throw new Error("Invalid data format received from API");
    }

    // Transform and filter out any null results
    const products = rawData.data
      .map(transformProductData)
      .filter((product) => product !== null);

    return NextResponse.json({
      data: products,
      currentPage: parseInt(page),
      totalPages: 218,
      totalItems: 218 * 20,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products", details: error.message },
      { status: 500 }
    );
  }
}
