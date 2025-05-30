


const getCategories = async () => {
  try {
    const fetchedData = await fetch(
      "https://fatafatsewa.com/api/v1/categories",
      {
        headers: {
          "API-KEY": "pk_live_JswWSUmBs6fvt1rRpayAULTNQUfxZZ3I", // Use exact key name
          "Content-Type": "application/json",
        },
      }
    );

    if (!fetchedData.ok) {
      throw new Error(`HTTP error! status: ${fetchedData.status}`);
    }

    const parsedData = await fetchedData.json();
    return parsedData;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};
export const getProducts = async () => {
  try {
    const fetchedData = await fetch(`https://fatafatsewa.com/api/v1/products?page=${page}`, {
      headers: {
        "API-KEY": "pk_live_JswWSUmBs6fvt1rRpayAULTNQUfxZZ3I", // Use exact key name
        "Content-Type": "application/json",
      },
    });

    if (!fetchedData.ok) {
      throw new Error(`HTTP error! status: ${fetchedData.status}`);
    }

    const parsedData = await fetchedData.json();
    return parsedData;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error;
  }
};