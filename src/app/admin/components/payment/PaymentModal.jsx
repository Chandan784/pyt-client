"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialForm = {
  booking_id: "",
  customer_id: "",
  amount: "",
  payment_method: "UPI",
  transaction_id: "",
  payment_date: "",
  notes: "",
};

export default function PaymentModal({
  open,
  payment,
  saving,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const isEdit = Boolean(payment);

  useEffect(() => {
    if (payment) {
      setForm({
        booking_id: payment.booking_id || "",
        customer_id: payment.customer_id || "",
        amount: payment.amount || "",
        payment_method:
          payment.payment_method || "UPI",
        transaction_id:
          payment.transaction_id || "",
        payment_date: payment.payment_date
          ? new Date(payment.payment_date)
              .toISOString()
              .slice(0, 16)
          : "",
        notes: payment.notes || "",
      });
    } else {
      setForm(initialForm);
    }

    setError("");
  }, [payment, open]);

  if (!open) return null;

  const update = (key, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.booking_id) {
      setError("Booking ID is required");
      return;
    }

    if (!form.customer_id) {
      setError("Customer ID is required");
      return;
    }

    if (!form.amount || Number(form.amount) <= 0) {
      setError("Enter a valid amount");
      return;
    }

    try {
      await onSubmit({
        ...form,
        booking_id: Number(form.booking_id),
        customer_id: Number(form.customer_id),
        amount: Number(form.amount),
      });

      onClose();
    } catch (err) {
      setError(err.message || "Failed to save payment");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {isEdit
                ? "Edit Payment"
                : "Record Payment"}
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">
              {isEdit
                ? "Update payment information"
                : "Record a payment received from a customer"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={19} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={submit}
          className="overflow-y-auto"
        >
          <div className="space-y-5 p-6">
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Booking ID" required>
                <input
                  type="number"
                  value={form.booking_id}
                  onChange={(e) =>
                    update(
                      "booking_id",
                      e.target.value
                    )
                  }
                  placeholder="e.g. 1024"
                  disabled={isEdit}
                  className="input"
                />
              </Field>

              <Field label="Customer ID" required>
                <input
                  type="number"
                  value={form.customer_id}
                  onChange={(e) =>
                    update(
                      "customer_id",
                      e.target.value
                    )
                  }
                  placeholder="e.g. 15"
                  disabled={isEdit}
                  className="input"
                />
              </Field>

              <Field label="Amount" required>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={form.amount}
                    onChange={(e) =>
                      update(
                        "amount",
                        e.target.value
                      )
                    }
                    placeholder="25000"
                    className="input pl-8"
                  />
                </div>
              </Field>

              <Field label="Payment Method" required>
                <select
                  value={form.payment_method}
                  onChange={(e) =>
                    update(
                      "payment_method",
                      e.target.value
                    )
                  }
                  className="input"
                >
                  <option value="UPI">UPI</option>
                  <option value="CARD">Card</option>
                  <option value="BANK_TRANSFER">
                    Bank Transfer
                  </option>
                  <option value="CASH">Cash</option>
                </select>
              </Field>

              <Field
                label="Transaction ID"
                required={
                  form.payment_method !== "CASH"
                }
              >
                <input
                  type="text"
                  value={form.transaction_id}
                  onChange={(e) =>
                    update(
                      "transaction_id",
                      e.target.value
                    )
                  }
                  placeholder="UPI / bank reference"
                  className="input"
                />
              </Field>

              <Field label="Payment Date">
                <input
                  type="datetime-local"
                  value={form.payment_date}
                  onChange={(e) =>
                    update(
                      "payment_date",
                      e.target.value
                    )
                  }
                  className="input"
                />
              </Field>
            </div>

            <Field label="Notes">
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) =>
                  update("notes", e.target.value)
                }
                placeholder="Optional payment notes..."
                className="input resize-none"
              />
            </Field>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : isEdit
                ? "Update Payment"
                : "Record Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </span>

      {children}
    </label>
  );
}