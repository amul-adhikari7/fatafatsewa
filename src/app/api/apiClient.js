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
    return {
      data: response.data,
      totalPages: 218, // As per your mention
      currentPage: page,
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return null;
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
