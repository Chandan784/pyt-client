import apiClient from "./apiClient";

const packageApi = {
  getPackages(params = {}) {
    const query = new URLSearchParams();

    Object.entries(params).forEach(
      ([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {
          query.append(key, value);
        }
      }
    );

    const queryString =
      query.toString();

    return apiClient(
      `/packages${
        queryString
          ? `?${queryString}`
          : ""
      }`
    );
  },

  getPackage(id) {
    return apiClient(
      `/packages/${id}`
    );
  },

  createPackage(data) {
    return apiClient(
      "/packages",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  updatePackage(id, data) {
    return apiClient(
      `/packages/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  },

  deletePackage(id) {
    return apiClient(
      `/packages/${id}`,
      {
        method: "DELETE",
      }
    );
  },
};

export default packageApi;