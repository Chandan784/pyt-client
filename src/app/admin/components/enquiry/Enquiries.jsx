
"use client";

import { useState } from "react";

import useEnquiries from "../../../../hooks/useEnquiries";

import EnquiryHeader from "./EnquiryHeader";
import EnquirySummary from "./EnquirySummary";
import EnquiryFilters from "./EnquiryFilters";
import EnquiryTable from "./EnquiryTable";
import EnquiryModal from "./EnquiryModal";

const Enquiries = () => {
  const {
    enquiries,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    summary,
    createEnquiry,
    updateEnquiry,
    deleteEnquiry,
  } = useEnquiries();

  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [modal, setModal] = useState(null);

  // ============================================
  // CREATE
  // ============================================

  const handleCreate = async (formData) => {
    try {
      await createEnquiry(formData);
      handleClose();
    } catch (error) {
      alert(error.message || "Failed to create enquiry.");
    }
  };

  // ============================================
  // UPDATE
  // ============================================

  const handleUpdate = async (formData) => {
    if (!selectedEnquiry?.id) {
      return;
    }

    try {
      const updated = await updateEnquiry(
        selectedEnquiry.id,
        formData
      );

      // Keep the updated enquiry selected
      setSelectedEnquiry(updated);

      // Close modal after successful update
      handleClose();
    } catch (error) {
      alert(error.message || "Failed to update enquiry.");
    }
  };

  // ============================================
  // DELETE
  // ============================================

  const handleDelete = async (id) => {
    try {
      await deleteEnquiry(id);
      handleClose();
    } catch (error) {
      alert(error.message || "Failed to delete enquiry.");
    }
  };

  // ============================================
  // VIEW
  // ============================================

  const handleView = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setModal("view");
  };

  // ============================================
  // CLOSE
  // ============================================

  const handleClose = () => {
    setModal(null);
    setSelectedEnquiry(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-gray-900">
      <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">

        {/* HEADER */}
        <EnquiryHeader
          onCreate={() => {
            setSelectedEnquiry(null);
            setModal("create");
          }}
        />

        {/* SUMMARY */}
        <EnquirySummary summary={summary} />

        {/* FILTERS */}
        <EnquiryFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* ERROR */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* TABLE */}
        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
            Loading enquiries...
          </div>
        ) : (
          <EnquiryTable
            enquiries={enquiries}
            onView={handleView}
          />
        )}
      </div>

      {/* ==========================================
          CREATE MODAL
      ========================================== */}

      {modal === "create" && (
        <EnquiryModal
          title="Create New Enquiry"
          mode="create"
          onClose={handleClose}
          onSubmit={handleCreate}
          loading={loading}
        />
      )}

      {/* ==========================================
          VIEW / EDIT MODAL
      ========================================== */}

      {modal === "view" && selectedEnquiry && (
        <EnquiryModal
          title="Enquiry Details"
          initialData={selectedEnquiry}
          mode="view"
          onClose={handleClose}
          onSubmit={handleUpdate}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Enquiries;
