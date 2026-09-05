"use client";

import {
  X,
  CreditCard,
  User,
  Calendar,
  Hash,
} from "lucide-react";

import PaymentStatusBadge from "./PaymentStatusBadge";

export default function PaymentDetails({
  payment,
  onClose,
}) {
  if (!payment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Payment Details
            </h2>

            <p className="text-xs text-gray-500">
              Payment #{payment.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={19} />
          </button>
        </div>

        <div className="space-y-5 p-6">
          {/* Amount */}
          <div className="rounded-xl bg-gray-50 p-5 text-center">
            <p className="text-sm text-gray-500">
              Payment Amount
            </p>

            <h3 className="mt-1 text-3xl font-bold text-gray-900">
              ₹
              {Number(
                payment.amount || 0
              ).toLocaleString("en-IN")}
            </h3>

            <div className="mt-3">
              <PaymentStatusBadge
                status={payment.status}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Info
              icon={User}
              label="Customer"
              value={
                payment.customer_name ||
                payment.customer_id
              }
            />

            <Info
              icon={Hash}
              label="Booking"
              value={
                payment.booking_number ||
                payment.booking_id
              }
            />

            <Info
              icon={CreditCard}
              label="Payment Method"
              value={payment.payment_method}
            />

            <Info
              icon={Calendar}
              label="Payment Date"
              value={
                payment.payment_date
                  ? new Date(
                      payment.payment_date
                    ).toLocaleString("en-IN")
                  : "—"
              }
            />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Transaction ID
            </p>

            <p className="mt-1 rounded-lg bg-gray-50 p-3 font-mono text-sm text-gray-700">
              {payment.transaction_id || "Not provided"}
            </p>
          </div>

          {payment.notes && (
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Notes
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {payment.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="rounded-lg border border-gray-100 p-4">
      <div className="flex items-center gap-2 text-gray-400">
        <Icon size={15} />
        <span className="text-xs">{label}</span>
      </div>

      <p className="mt-2 text-sm font-medium text-gray-900">
        {value || "—"}
      </p>
    </div>
  );
}