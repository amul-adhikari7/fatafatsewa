import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    // Read the response.json file
    const jsonPath = path.join(process.cwd(), "public", "response.json");
    const fileContents = fs.readFileSync(jsonPath, "utf8");
    const data = JSON.parse(fileContents);

    // Extract and transform the data
    const mobilePhones = data.data.map((phone) => ({
      id: phone.id,
      name: phone.name,
      description: phone.highlights || phone.name,
      price: phone.price,
      oldPrice: phone.discounted_price !== phone.price ? phone.price : null,
      image: phone.image || "/assets/nothing.png",
      tag: phone.discountcampaign ? `${phone.discountcampaign}% Off` : "New",
      storage: phone.attributes?.Storage || "128GB",
      specs: {
        display: phone.highlights?.split("|")[0]?.trim() || "6.7-inch Display",
        camera: phone.highlights?.split("|")[1]?.trim() || "Dual Camera",
        processor: phone.highlights?.split("|")[3]?.trim() || "Processor",
        battery: phone.highlights?.split("|")[2]?.trim() || "Battery",
        os: "Android/iOS",
      },
    }));

    return NextResponse.json(mobilePhones);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch mobile phones" },
      { status: 500 }
    );
  }
}
