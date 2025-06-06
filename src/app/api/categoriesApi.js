import API from "./apiClient";

export const fetchCategories = async () => {
  try {
    const response = await API.get("/categories");
    // Handle the API response structure
    const categories = response.data?.categories || [];

    // Transform the API response to match our expected format
    const transformedData = categories
      .filter((category) => category.status === 1) // Only active categories
      .map((category) => ({
        id: category.id?.toString() || "",
        name: category.title || "", // Using title from API
        description:
          category.description ||
          `Explore our ${category.title || ""} collection`,
        imageUrl: category.image || `/assets/${category.slug || "default"}.jpg`,
        featured: category.featured === 1,
        slug: category.slug || "",
        parentId: category.parent_id,
        order: category.order || 0,
      }))
      .sort((a, b) => a.order - b.order); // Sort by order field

    return transformedData;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error(error.response?.data?.message || error.message);
  }
};
