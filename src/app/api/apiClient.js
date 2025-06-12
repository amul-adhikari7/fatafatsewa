import axios from "axios";
import { ComputeCache, RequestThrottler } from "../utils/performance";

// Create axios instance with default config
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://fatafatsewa.com/api/v1",
  timeout: 10000,
  headers: {
    "API-key": "pk_live_JswWSUmBs6fvt1rRpayAULTNQUfxZZ3I",
    "Content-Type": "application/json",
  },
});

// Add request interceptor for authentication and caching
API.interceptors.request.use(
  async (config) => {
    // Check cache for GET requests
    if (config.method === "get") {
      const cacheKey = `${config.url}${JSON.stringify(config.params || {})}`;
      const cachedData = ComputeCache.get(cacheKey);
      if (cachedData) {
        return Promise.reject({
          config,
          response: { data: cachedData },
          __CACHED: true,
        });
      }
    }

    // Add auth header if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for caching and error handling
API.interceptors.response.use(
  (response) => {
    // Cache successful GET requests
    if (response.config.method === "get") {
      const cacheKey = `${response.config.url}${JSON.stringify(
        response.config.params || {}
      )}`;
      ComputeCache.set(cacheKey, response.data);
    }
    return response;
  },
  async (error) => {
    // Return cached data if available
    if (error.__CACHED) {
      return error.response;
    }

    // Handle expired token
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// Create wrapped API methods with throttling
const wrappedAPI = {
  async get(url, config = {}) {
    return RequestThrottler.throttle(`GET:${url}`, () => API.get(url, config));
  },

  async post(url, data, config = {}) {
    return RequestThrottler.throttle(`POST:${url}`, () =>
      API.post(url, data, config)
    );
  },

  async put(url, data, config = {}) {
    return RequestThrottler.throttle(`PUT:${url}`, () =>
      API.put(url, data, config)
    );
  },

  async delete(url, config = {}) {
    return RequestThrottler.throttle(`DELETE:${url}`, () =>
      API.delete(url, config)
    );
  },
};

export default wrappedAPI;

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
