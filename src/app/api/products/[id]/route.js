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
    name: "Acer Nitro 5 2023 Gaming Laptop",
    description: "i7 12th Gen, RTX 3050, 16GB RAM",
    price: "Rs 160,000",
    oldPrice: "Rs 178,000",
    image: "/assets/Acer-Nitro-V-2023-I7-1260P-RTX-3050.jpg",
    tag: "10% Off",
  },
];

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const numericId = parseInt(id);
    const product = products.find((p) => p.id === numericId);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
