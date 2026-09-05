const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/";

const apiClient = async (endpoint, options = {}) => {
  const response = await fetch(
    `${API_BASE_URL}/api${endpoint}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Something went wrong"
    );
  }

  return data;
};

export default apiClient;