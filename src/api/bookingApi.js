import apiClient from "./apiClient";

const bookingApi = {
  getBookings(params = {}) {
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

    const queryString = query.toString();

    return apiClient(
      `/bookings${
        queryString
          ? `?${queryString}`
          : ""
      }`
    );
  },

  getBooking(id) {
    return apiClient(
      `/bookings/${id}`
    );
  },

  createBooking(data) {
    return apiClient(
      "/bookings",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  updateBooking(id, data) {
    return apiClient(
      `/bookings/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  },

  deleteBooking(id) {
    return apiClient(
      `/bookings/${id}`,
      {
        method: "DELETE",
      }
    );
  },
};

export default bookingApi;