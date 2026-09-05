import apiClient from "./apiClient";

const destinationApi = {
  getDestinations(params = {}) {
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
      `/destinations${
        queryString
          ? `?${queryString}`
          : ""
      }`
    );
  },

  getDestination(id) {
    return apiClient(
      `/destinations/${id}`
    );
  },

  createDestination(data) {
    return apiClient(
      "/destinations",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  updateDestination(id, data) {
    return apiClient(
      `/destinations/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  },

  deleteDestination(id) {
    return apiClient(
      `/destinations/${id}`,
      {
        method: "DELETE",
      }
    );
  },
};

export default destinationApi;