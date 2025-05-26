export async function GET() {
  try {
    // This is mock data - replace with your actual database call
    const mobilePhones = [
      {
        id: 1,
        name: 'iPhone 15 Pro Max',
        price: 199999,
        image: '/assets/iphone15.jpg',
        description: '256GB, Space Black',
        brand: 'Apple',
        inStock: true
      },
      {
        id: 2,
        name: 'Samsung Galaxy S24 Ultra',
        price: 189999,
        image: '/assets/s24ultra.jpg',
        description: '512GB, Titanium Gray',
        brand: 'Samsung',
        inStock: true
      },
      {
        id: 3,
        name: 'Google Pixel 8 Pro',
        price: 129999,
        image: '/assets/pixel8pro.jpg',
        description: '256GB, Obsidian',
        brand: 'Google',
        inStock: true
      }
    ]

    return Response.json(mobilePhones)
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch mobile phones' },
      { status: 500 }
    )
  }
}
