import { NextResponse } from "next/server";

export async function POST(request) {
  if (request.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await request.json();

    if (!body) {
      return NextResponse.json({ error: "No request body" }, { status: 400 });
    }

    const { items, totalPrice, paymentMethod } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Invalid items" }, { status: 400 });
    }

    if (typeof totalPrice !== "number" || totalPrice <= 0) {
      return NextResponse.json(
        { error: "Invalid total price" },
        { status: 400 }
      );
    }

    if (!paymentMethod) {
      return NextResponse.json(
        { error: "Payment method required" },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Validate the order data
    // 2. Create the order in your database
    // 3. Process payment based on the selected payment method
    // 4. Update inventory
    // For now, we'll just return a mock response

    const order = {
      orderId: `ORD-${Date.now()}`,
      items,
      totalAmount: totalPrice,
      paymentMethod,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // Return success response
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
