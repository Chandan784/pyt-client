"use client";

import { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  address: "",
};

export default function CustomerForm({
  customer,
  loading,
  onCancel,
  onSubmit,
}) {
  const [form, setForm] = useState(emptyForm);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (customer) {
      setForm({
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
        address: customer.address || "",
      });
    } else {
      setForm(emptyForm);
    }

    setErrors({});
  }, [customer]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Phone is required";
    }

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )
    ) {
      nextErrors.email =
        "Enter a valid email address";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) return;

    try {
      await onSubmit({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      });
    } catch {
      // Parent handles API error.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-5 p-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Full Name *
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter customer name"
            className={`w-full rounded-xl border ${
              errors.name
                ? "border-red-400"
                : "border-slate-200"
            } bg-white px-4 py-3 text-sm outline-none focus:border-slate-400`}
          />

          {errors.name && (
            <p className="mt-1 text-xs text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="customer@example.com"
              className={`w-full rounded-xl border ${
                errors.email
                  ? "border-red-400"
                  : "border-slate-200"
              } bg-white px-4 py-3 text-sm outline-none focus:border-slate-400`}
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Phone *
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className={`w-full rounded-xl border ${
                errors.phone
                  ? "border-red-400"
                  : "border-slate-200"
              } bg-white px-4 py-3 text-sm outline-none focus:border-slate-400`}
            />

            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Address
          </label>

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={4}
            placeholder="Enter customer address"
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-slate-400"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : customer
            ? "Update Customer"
            : "Create Customer"}
        </button>
      </div>
    </form>
  );
}