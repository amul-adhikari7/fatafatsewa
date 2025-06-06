import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Hardcoded mobile phone data
    const mobilePhones = [
      {
        id: 1,
        name: "iPhone 16 Pro Max",
        description: "Latest iPhone with 6.7-inch display, A17 Pro chip",
        price: "207,000",
        oldPrice: null,
        image: "/assets/Iphone-16-pro-max-price-in-nepal.jpg",
        tag: "New",
        storage: "256GB",
        specs: {
          display: "6.7-inch OLED",
          camera:
            "48MP + 12MP Ultra Wide + 12MP Telephoto Lens with 5x Optical Zoom and 2x Telephoto",
          processor: "A17 Pro Chip",
          battery: "All-day battery life",
          os: "iOS 17",
        },
      },
      {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        description:
          "Premium Android Phone with 6.8-inch display, Snapdragon 8 Gen 3 chip and 200MP camera",
        price: "184,999",
        oldPrice: "199,999",
        image: "/assets/Samsung-s24-ultra.png",
        tag: "10% Off",
        storage: "256GB",
        specs: {
          display: "6.8-inch Dynamic AMOLED",
          camera: "200MP + 12MP Ultra Wide",
          processor: "Snapdragon 8 Gen 3",
          battery: "5000mAh",
          os: "Android 14",
        },
      },
      {
        id: 3,
        name: "Nothing Phone 2",
        description:
          "Unique Glyph Interface with 6.7-inch display and Snapdragon 8+ Gen 1 chip",
        price: "89,999",
        oldPrice: null,
        image: "/assets/nothing.png",
        tag: "New",
        storage: "128GB",
        specs: {
          display: "6.7-inch OLED",
          camera: "50MP + 50MP Ultra Wide",
          processor: "Snapdragon 8+ Gen 1",
          battery: "4700mAh",
          os: "Android 14",
        },
      },
    ];

    if (mobilePhones.length === 0) {
      return NextResponse.json(
        { error: "No mobile phones available" },
        { status: 404 }
      );
    }

    return NextResponse.json(mobilePhones);
  } catch (error) {
    console.error("Error in mobile phones API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
