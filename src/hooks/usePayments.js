"use client";

import { useCallback, useEffect, useState } from "react";

import {
  getPayments,
  getPaymentSummary,
  createPayment,
  updatePayment,
  updatePaymentStatus,
} from "../api/paymentApi.js";

export default function usePayments() {
  const [payments, setPayments] = useState([]);
  const [summary, setSummary] = useState({
    total_transactions: 0,
    total_collected: 0,
    total_pending: 0,
    total_refunded: 0,
    total_failed: 0,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    payment_method: "",
  });

  const loadPayments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [paymentResponse, summaryResponse] =
        await Promise.all([
          getPayments(filters),
          getPaymentSummary(),
        ]);

      setPayments(paymentResponse.data || []);

      setSummary(
        summaryResponse.data || {
          total_transactions: 0,
          total_collected: 0,
          total_pending: 0,
          total_refunded: 0,
          total_failed: 0,
        }
      );
    } catch (err) {
      setError(err.message || "Failed to load payments");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  const addPayment = async (data) => {
    try {
      setSaving(true);

      await createPayment(data);

      await loadPayments();

      return {
        success: true,
      };
    } catch (err) {
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const editPayment = async (id, data) => {
    try {
      setSaving(true);

      await updatePayment(id, data);

      await loadPayments();

      return {
        success: true,
      };
    } catch (err) {
      throw err;
    } finally {
      setSaving(false);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      setSaving(true);

      await updatePaymentStatus(id, status);

      await loadPayments();

      return {
        success: true,
      };
    } catch (err) {
      throw err;
    } finally {
      setSaving(false);
    }
  };

  return {
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

    refresh: loadPayments,
  };
}