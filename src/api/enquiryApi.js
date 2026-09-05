import apiClient from "./apiClient";

const enquiryApi = {
  // GET /api/enquiries
  getAll: async ({
    search = "",
    status = "ALL",
  } = {}) => {
    const params = new URLSearchParams();

    if (search) {
      params.append("search", search);
    }

    if (status && status !== "ALL") {
      params.append("status", status);
    }

    const query = params.toString();

    return apiClient(
      `/enquiries${query ? `?${query}` : ""}`
    );
  },

  // GET /api/enquiries/:id
  getById: async (id) => {
    return apiClient(`/enquiries/${id}`);
  },

  // POST /api/enquiries
  create: async (data) => {
    return apiClient("/enquiries", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // PUT /api/enquiries/:id
  // Updates ALL enquiry information together
  update: async (id, data) => {
    return apiClient(`/enquiries/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  },

  // DELETE /api/enquiries/:id
  delete: async (id) => {
    return apiClient(`/enquiries/${id}`, {
      method: "DELETE",
    });
  },
};

export default enquiryApi;