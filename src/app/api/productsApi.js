import API from "./apiClient";

/**
 * @typedef {Object} Product
 * @property {number} id - Product ID
 * @property {string} name - Product name
 * @property {number} price - Product price
 * @property {number} quantity - Product quantity
 * @property {number} average_rating - Product average rating
 */

// Memoized helper functions moved outside component for better performance
const getProductTag = (item) => {
  if (item.pre_order === 1) return "Pre Order";
  if (parseInt(item.quantity) === 0) return "Out of Stock";
  return null;
};

const getStockStatus = (item) => {
  if (item.pre_order === 1) return false;
  return parseInt(item.quantity) > 0;
};

// Transform a single product - extracted for reuse and performance
const transformProduct = (item) => ({
  id: item.id,
  name: item.name || "",
  price: parseInt(item.price) || 0,
  quantity: parseInt(item.quantity) || 0,
  averageRating: parseFloat(item.average_rating) || 4.5,
  image: item.image || `/assets/${item.slug}.jpg`,
  tag: getProductTag(item),
  inStock: getStockStatus(item),
  slug: item.slug || "",
  pre_order: item.pre_order || 0,
  pre_order_price: item.pre_order_price || null,
});

/**
 * Fetches products from the API
 * @returns {Promise<{data: Array<Product>, meta: {total: number}}>}
 */
export const fetchMobilePhones = async (page = 1, limit = 20) => {
  try {
    const response = await API.get(`/products?search=mobile-phone`, {
      params: {
        page,
        limit,
      },
    });

    const products = response.data?.data || [];
    const total = response.data?.meta?.total || 0;
    const totalPages =
      response.data?.meta?.totalPages || Math.ceil(total / limit);

    return {
      data: products.map(transformProduct),
      meta: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error(
      error.response?.data?.message ||
        "Failed to fetch products. Please try again later."
    );
  }
};

/**
 * Fetches a single product by ID
 * @param {number} id - Product ID
 * @returns {Promise<Product>}
 */
export const fetchProductById = async (id) => {
  try {
    const response = await API.get(`/products?${id}`);
    // Reuse the same transform function for consistency
    return transformProduct(response.data);
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw new Error(error.response?.data?.message || "Failed to fetch product");
  }
};
