"use client";

import {
  Eye,
  Pencil,
  CheckCircle2,
  FileText,
} from "lucide-react";

import PaymentStatusBadge from "./PaymentStatusBadge";

import { downloadPaymentReceipt } from "../../../../utils/paymentRecipts";

export default function PaymentTable({
  payments,
  onView,
  onEdit,
  onVerify,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px]">

          {/* ================= HEADER ================= */}

          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Customer
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Booking
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Amount
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Method
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Transaction
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Date
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              {/* NEW */}
              <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                Receipt
              </th>

              <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                Actions
              </th>

            </tr>
          </thead>

          {/* ================= BODY ================= */}

          <tbody className="divide-y divide-gray-100">

            {payments.map((payment) => (

              <tr
                key={payment.id}
                className="transition hover:bg-gray-50"
              >

                {/* CUSTOMER */}

                <td className="px-5 py-4">
                  <p className="font-medium text-gray-900">
                    {payment.customer_name ||
                      "Unknown Customer"}
                  </p>

                  <p className="mt-0.5 text-xs text-gray-500">
                    #{payment.customer_id}
                  </p>
                </td>

                {/* BOOKING */}

                <td className="px-5 py-4 text-sm text-gray-700">
                  {payment.booking_number ||
                    `#${payment.booking_id}`}
                </td>

                {/* AMOUNT */}

                <td className="px-5 py-4">
                  <span className="font-semibold text-gray-900">
                    ₹
                    {Number(
                      payment.amount || 0
                    ).toLocaleString("en-IN")}
                  </span>
                </td>

                {/* METHOD */}

                <td className="px-5 py-4">
                  <span className="text-sm text-gray-700">
                    {payment.payment_method}
                  </span>
                </td>

                {/* TRANSACTION */}

                <td className="px-5 py-4">
                  <span className="font-mono text-xs text-gray-600">
                    {payment.transaction_id || "—"}
                  </span>
                </td>

                {/* DATE */}

                <td className="px-5 py-4 text-sm text-gray-600">
                  {payment.payment_date
                    ? new Date(
                        payment.payment_date
                      ).toLocaleDateString("en-IN")
                    : "—"}
                </td>

                {/* STATUS */}

                <td className="px-5 py-4">
                  <PaymentStatusBadge
                    status={payment.status}
                  />
                </td>

                {/* ================= RECEIPT ================= */}

                <td className="px-5 py-4 text-center">

                  <button
                    type="button"
                    onClick={() =>
                      downloadPaymentReceipt(payment)
                    }
                    title="Download Receipt"
                    aria-label="Download payment receipt"
                    className="inline-flex items-center justify-center rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
                  >
                    <FileText size={18} />
                  </button>

                </td>

                {/* ================= ACTIONS ================= */}

                <td className="px-5 py-4">

                  <div className="flex justify-end gap-1">

                    {/* VIEW */}

                    <button
                      type="button"
                      onClick={() => onView(payment)}
                      title="View"
                      className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Eye size={17} />
                    </button>

                    {/* EDIT */}

                    {payment.status !== "REFUNDED" && (
                      <button
                        type="button"
                        onClick={() => onEdit(payment)}
                        title="Edit"
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <Pencil size={17} />
                      </button>
                    )}

                    {/* VERIFY */}

                    {payment.status === "PENDING" && (
                      <button
                        type="button"
                        onClick={() => onVerify(payment)}
                        title="Verify payment"
                        className="rounded-lg p-2 text-emerald-600 hover:bg-emerald-50"
                      >
                        <CheckCircle2 size={17} />
                      </button>
                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>
      </div>

      {/* EMPTY STATE */}

      {payments.length === 0 && (
        <div className="p-10 text-center text-sm text-gray-500">
          No payments found.
        </div>
      )}

    </div>
  );
}