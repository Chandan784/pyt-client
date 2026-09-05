import apiClient from "./apiClient";

export const getCustomers = ({
  page = 1,
  limit = 10,
  search = "",
  status = "All",
} = {}) => {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("limit", limit);

  if (search.trim()) {
    params.set("search", search.trim());
  }

  if (status !== "All") {
    params.set("status", status);
  }

  return apiClient(`/customers?${params.toString()}`);
};

export const getCustomer = (id) => {
  return apiClient(`/customers/${id}`);
};

export const createCustomer = (data) => {
  return apiClient("/customers", {
    method: "POST",
    body: JSON.stringify({
      name: data.name,
      email: data.email || null,
      phone: data.phone,
      address: data.address || null,
    }),
  });
};

export const updateCustomer = (id, data) => {
  return apiClient(`/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      name: data.name,
      email: data.email || null,
      phone: data.phone,
      address: data.address || null,
    }),
  });
};

export const deleteCustomer = (id) => {
  return apiClient(`/customers/${id}`, {
    method: "DELETE",
  });
};