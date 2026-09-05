const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// Get payments
export async function getPayments(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });

  const response = await fetch(
    `${API_URL}/api/payment?${query.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return handleResponse(response);
}

// Get payment
export async function getPayment(id) {
  const response = await fetch(
    `${API_URL}/api/payment/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return handleResponse(response);
}

// Create payment
export async function createPayment(data) {
  const response = await fetch(
    `${API_URL}/api/payment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return handleResponse(response);
}

// Update payment
export async function updatePayment(id, data) {
  const response = await fetch(
    `${API_URL}/api/payment/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return handleResponse(response);
}

// Update status
export async function updatePaymentStatus(id, status) {
  const response = await fetch(
    `${API_URL}/api/payment/${id}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    }
  );

  return handleResponse(response);
}

// Get booking payments
export async function getBookingPayments(bookingId) {
  const response = await fetch(
    `${API_URL}/api/payment/booking/${bookingId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return handleResponse(response);
}

// Get summary
export async function getPaymentSummary() {
  const response = await fetch(
    `${API_URL}/api/payment/summary`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  return handleResponse(response);
}