import { NextResponse } from "next/server";

// Static product data
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    description: "256GB Storage, Space Black",
    price: "Rs 199,999",
    oldPrice: "Rs 219,999",
    image: "/assets/Apple iPhone 15 Plus (Black, 128GB).jpeg",
    tag: "New",
    storage: "256GB",
    color: "Space Black",
    specs: {
      display: "6.7-inch Super Retina XDR",
      camera: "48MP Main + 12MP Ultra Wide",
      processor: "A17 Pro Chip",
      battery: "4422mAh",
      os: "iOS 17",
    },
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    description: "512GB Storage, Titanium Gray",
    price: "Rs 189,999",
    oldPrice: "Rs 199,999",
    image: "/assets/Samsung-s24-ultra.png",
    tag: "10% Off",
    storage: "512GB",
    color: "Titanium Gray",
    specs: {
      display: "6.8-inch Dynamic AMOLED 2X",
      camera: "200MP Main + 12MP Ultra Wide",
      processor: "Snapdragon 8 Gen 3",
      battery: "5000mAh",
      os: "Android 14",
    },
  },
  {
    id: 3,
    name: "Nothing Phone 2",
    description: "256GB Storage, White",
    price: "Rs 89,999",
    oldPrice: "Rs 99,999",
    image: "/assets/nothing.png",
    tag: "Limited Stock",
    storage: "256GB",
    color: "White",
    specs: {
      display: "6.7-inch LTPO OLED",
      camera: "50MP Main + 50MP Ultra Wide",
      processor: "Snapdragon 8+ Gen 1",
      battery: "4700mAh",
      os: "Android 14",
    },
  },
  {
    id: 4,
    name: "Samsung Galaxy S24 Ultra",
    description: "512GB Storage, Titanium Gray",
    price: "Rs 189,999",
    oldPrice: "Rs 199,999",
    image: "/assets/Samsung-s24-ultra.png",
    tag: "10% Off",
    storage: "512GB",
    color: "Titanium Gray",
    specs: {
      display: "6.8-inch Dynamic AMOLED 2X",
      camera: "200MP Main + 12MP Ultra Wide",
      processor: "Snapdragon 8 Gen 3",
      battery: "5000mAh",
      os: "Android 14",
    },
  },
  {
    id: 5,
    name: "Samsung Galaxy S24 Ultra",
    description: "512GB Storage, Titanium Gray",
    price: "Rs 189,999",
    oldPrice: "Rs 199,999",
    image: "/assets/Samsung-s24-ultra.png",
    tag: "10% Off",
    storage: "512GB",
    color: "Titanium Gray",
    specs: {
      display: "6.8-inch Dynamic AMOLED 2X",
      camera: "200MP Main + 12MP Ultra Wide",
      processor: "Snapdragon 8 Gen 3",
      battery: "5000mAh",
      os: "Android 14",
    },
  },
];

export async function GET(request, { params }) {
  try {
    if (!params?.id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const numericId = Number(params.id);

    if (isNaN(numericId)) {
      return NextResponse.json(
        { error: "Invalid product ID format" },
        { status: 400 }
      );
    }

    const product = products.find((p) => p.id === numericId);

    if (!product) {
      return NextResponse.json(
        {
          error: "Product not found",
          message: `No product found with ID: ${numericId}`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: product,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: "Failed to fetch product",
      },
      { status: 500 }
    );
  }
}
