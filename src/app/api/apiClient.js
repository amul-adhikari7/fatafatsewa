import axios from "axios";

const API = axios.create({
  baseURL: "https://fatafatsewa.com/api/v1", // Updated base URL
  headers: {
    "API-Key": "pk_live_JswWSUmBs6fvt1rRpayAULTNQUfxZZ3I",
    "Content-Type": "application/json",
  },
});

export default API;

// Laptop IDs array - you can update this with your actual laptop IDs
export const LAPTOP_IDS = [
  // Add your laptop product IDs here
  101,
  102,
  103,
  104,
  105, // Example IDs for laptops
  201,
  202,
  203,
  204,
  205, // More laptop IDs
  301,
  302,
  303,
  304,
  305, // Add actual laptop IDs from your database
];

export const fetchProducts = async (page = 1, pageSize = 20) => {
  try {
    const response = await API.get(`/products`, {
      params: {
        page,
        limit: pageSize,
      },
    });

    if (!response?.data) {
      throw new Error("Invalid response format");
    }

    // Transform and validate the data
    const transformedData = Array.isArray(response.data) ? response.data : [];

    return {
      data: transformedData.map((item) => ({
        id: parseInt(item.id) || item.id,
        name: item.name || "",
        description: item.description || "",
        price: parseFloat(String(item.price).replace(/[^\d.]/g, "")) || 0,
        oldPrice: item.oldPrice
          ? parseFloat(String(item.oldPrice).replace(/[^\d.]/g, ""))
          : null,
        image: item.image || "",
        tag: item.tag || null,
        category: item.category || "",
        processor: item.processor || "",
        ram: item.ram || "",
        storage: item.storage || "",
      })),
      totalPages: 218, // This should come from your API
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const fetchProductsByCategory = async (categoryId, page = 1) => {
  try {
    const response = await API.get(
      `/products/category/${categoryId}?page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to fetch products for category ${categoryId}:`,
      error
    );
    return null;
  }
};

export const searchProducts = async (query, page = 1) => {
  try {
    const response = await API.get(
      `/products/search?q=${encodeURIComponent(query)}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to search products:", error);
    return null;
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await API.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch product with id ${id}:`, error);
    return null;
  }
};
