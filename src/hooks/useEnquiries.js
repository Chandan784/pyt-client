
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import enquiryApi from "../api/enquiryApi";

const useEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // ============================================
  // FETCH
  // ============================================

  const fetchEnquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await enquiryApi.getAll({
        search,
        status: statusFilter,
      });

      setEnquiries(response.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  // ============================================
  // CREATE
  // ============================================

  const createEnquiry = async (data) => {
    try {
      setLoading(true);

      const response = await enquiryApi.create(data);

      setEnquiries((prev) => [
        response.data,
        ...prev,
      ]);

      return response.data;
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // UPDATE
  // ============================================

  const updateEnquiry = async (id, data) => {
    try {
      setLoading(true);

      const response = await enquiryApi.update(
        id,
        data
      );

      setEnquiries((prev) =>
        prev.map((item) =>
          item.id === id
            ? response.data
            : item
        )
      );

      return response.data;
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // DELETE
  // ============================================

  const deleteEnquiry = async (id) => {
    try {
      setLoading(true);

      await enquiryApi.delete(id);

      setEnquiries((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // SUMMARY
  // ============================================

  const summary = useMemo(() => {
    return {
      total: enquiries.length,

      newCount: enquiries.filter(
        (item) => item.status === "NEW"
      ).length,

      contactedCount: enquiries.filter(
        (item) => item.status === "CONTACTED"
      ).length,

      qualifiedCount: enquiries.filter(
        (item) => item.status === "QUALIFIED"
      ).length,

      followUpCount: enquiries.filter(
        (item) => item.status === "FOLLOW_UP"
      ).length,

      convertedCount: enquiries.filter(
        (item) => item.status === "CONVERTED"
      ).length,

      lostCount: enquiries.filter(
        (item) => item.status === "LOST"
      ).length,
    };
  }, [enquiries]);

  return {
    enquiries,
    loading,
    error,

    search,
    setSearch,

    statusFilter,
    setStatusFilter,

    summary,

    fetchEnquiries,

    createEnquiry,
    updateEnquiry,
    deleteEnquiry,
  };
};

export default useEnquiries;
