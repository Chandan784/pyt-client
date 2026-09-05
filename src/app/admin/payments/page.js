"use client";

import { useState } from "react";
import {
  Plus,
  RefreshCw,
  CreditCard,
} from "lucide-react";




import usePayments from "../../../hooks/usePayments";


import PaymentStats from "../components/payment/PaymentStats";
import PaymentFilters from "../components/payment/PaymentFilters";
import PaymentTable from "../components/payment/PaymentTable";
import PaymentModal from "../components/payment/PaymentModal";
import PaymentDetails from "../components/payment/PaymentDetails";
import PaymentSkeleton from "../components/payment/PaymentSkeleton";
import EmptyPayments from "../components/payment/EmptyPayments";

export default function PaymentsPage() {
  const {
    payments,
    summary,
    loading,
    saving,
    error,
    filters,
    setFilters,
    addPayment,
    editPayment,
    changeStatus,
    refresh,
  } = usePayments();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPayment, setEditingPayment] =
    useState(null);

  const [selectedPayment, setSelectedPayment] =
    useState(null);

  const openCreate = () => {
    setEditingPayment(null);
    setModalOpen(true);
  };

  const openEdit = (payment) => {
    setEditingPayment(payment);
    setModalOpen(true);
  };

  const handleSubmit = async (data) => {
    if (editingPayment) {
      await editPayment(
        editingPayment.id,
        data
      );
    } else {
      await addPayment(data);
    }
  };

  const handleVerify = async (payment) => {
    const confirmed = window.confirm(
      `Verify payment of ₹${Number(
        payment.amount
      ).toLocaleString("en-IN")}?`
    );

    if (!confirmed) return;

    try {
      await changeStatus(
        payment.id,
        "PAID"
      );
    } catch (err) {
      window.alert(
        err.message || "Failed to verify payment"
      );
    }
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "",
      payment_method: "",
    });
  };

  const hasFilters =
    filters.search ||
    filters.status ||
    filters.payment_method;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[1600px] space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CreditCard
                size={22}
                className="text-gray-700"
              />

              <h1 className="text-2xl font-bold text-gray-900">
                Payments
              </h1>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Track and manage customer payments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refresh}
              disabled={loading}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh
            </button>

            <button
              onClick={openCreate}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-gray-900 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-800"
            >
              <Plus size={17} />

              Record Payment
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">
              {error}
            </p>

            <button
              onClick={refresh}
              className="text-sm font-medium text-red-800 underline"
            >
              Retry
            </button>
          </div>
        )}

        {/* Stats */}
        <PaymentStats summary={summary} />

        {/* Filters */}
        <PaymentFilters
          filters={filters}
          setFilters={setFilters}
        />

        {/* Content */}
        {loading ? (
          <PaymentSkeleton />
        ) : payments.length === 0 ? (
          <EmptyPayments
            hasFilters={Boolean(hasFilters)}
            onClear={clearFilters}
          />
        ) : (
          <PaymentTable
            payments={payments}
            onView={setSelectedPayment}
            onEdit={openEdit}
            onVerify={handleVerify}
          />
        )}

        {/* Result count */}
        {!loading && payments.length > 0 && (
          <p className="text-sm text-gray-500">
            Showing {payments.length} payment
            {payments.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Create/Edit Modal */}
      <PaymentModal
        open={modalOpen}
        payment={editingPayment}
        saving={saving}
        onClose={() => {
          setModalOpen(false);
          setEditingPayment(null);
        }}
        onSubmit={handleSubmit}
      />

      {/* Details */}
      {selectedPayment && (
        <PaymentDetails
          payment={selectedPayment}
          onClose={() =>
            setSelectedPayment(null)
          }
        />
      )}
    </main>
  );
}