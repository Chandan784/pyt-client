"use client";

import { useState } from "react";

import useEnquiries from "../../../hooks/useEnquiries";

import EnquiryHeader from "./EnquiryHeader";
import EnquirySummary from "./EnquirySummary";
import EnquiryFilters from "./EnquiryFilters";
import EnquiryTable from "./EnquiryTable";
import EnquiryDrawer from "./EnquiryDrawer";
import EnquiryModal from "../../admin/components/enquiry/EnquiryModal";
import QuotationModal from "./QuotationModal";

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
    updateStatus,
    createQuotation,
    sendQuotation,
  } = useEnquiries();

  const [selectedEnquiry, setSelectedEnquiry] =
    useState(null);

  const [editingEnquiry, setEditingEnquiry] =
    useState(null);

  const [quotation, setQuotation] =
    useState(null);

  const [modal, setModal] =
    useState(null);

  // -----------------------------
  // CREATE ENQUIRY
  // -----------------------------

  const handleCreate = async (formData) => {
    try {
      const created =
        await createEnquiry(formData);

      setSelectedEnquiry(created);
      setModal(null);
    } catch (error) {
      alert(error.message);
    }
  };

  // -----------------------------
  // UPDATE ENQUIRY
  // -----------------------------

  const handleUpdate = async (formData) => {
    try {
      const updated =
        await updateEnquiry(
          editingEnquiry.id,
          formData
        );

      setSelectedEnquiry(updated);
      setEditingEnquiry(null);
      setModal(null);
    } catch (error) {
      alert(error.message);
    }
  };

  // -----------------------------
  // UPDATE STATUS
  // -----------------------------

  const handleStatusChange = async (
    id,
    status
  ) => {
    try {
      const updated =
        await updateStatus(id, status);

      setSelectedEnquiry(updated);
    } catch (error) {
      alert(error.message);
    }
  };

  // -----------------------------
  // EDIT
  // -----------------------------

  const handleEdit = (enquiry) => {
    setEditingEnquiry(enquiry);
    setModal("edit");
  };

  // -----------------------------
  // CREATE QUOTATION
  // -----------------------------

  const handleCreateQuotation = async (
    enquiry
  ) => {
    try {
      const updated =
        await createQuotation(enquiry.id);

      setSelectedEnquiry(updated);
      setQuotation(updated);
    } catch (error) {
      alert(error.message);
    }
  };

  // -----------------------------
  // SEND QUOTATION
  // -----------------------------

  const handleSendQuotation = async () => {
    if (!quotation) return;

    try {
      const updated =
        await sendQuotation(
          quotation.id
        );

      setQuotation(updated);
      setSelectedEnquiry(updated);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-gray-900">
      <div className="mx-auto max-w-[1600px] p-5 sm:p-7 lg:p-8">

        <EnquiryHeader
          onCreate={() =>
            setModal("create")
          }
        />

        <EnquirySummary
          summary={summary}
        />

        <EnquiryFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={
            setStatusFilter
          }
        />

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
            Loading enquiries...
          </div>
        ) : (
          <EnquiryTable
            enquiries={enquiries}
            onView={setSelectedEnquiry}
          />
        )}
      </div>

      {/* DRAWER */}

      {selectedEnquiry && (
        <EnquiryDrawer
          enquiry={selectedEnquiry}
          onClose={() =>
            setSelectedEnquiry(null)
          }
          onEdit={handleEdit}
          onStatusChange={
            handleStatusChange
          }
          onCreateQuotation={
            handleCreateQuotation
          }
          onViewQuotation={() =>
            setQuotation(
              selectedEnquiry
            )
          }
        />
      )}

      {/* CREATE MODAL */}

      {modal === "create" && (
        <EnquiryModal
          title="Create New Enquiry"
          onClose={() =>
            setModal(null)
          }
          onSubmit={handleCreate}
          loading={loading}
        />
      )}

      {/* EDIT MODAL */}

      {modal === "edit" &&
        editingEnquiry && (
          <EnquiryModal
            title="Edit Enquiry"
            initialData={
              editingEnquiry
            }
            onClose={() => {
              setModal(null);
              setEditingEnquiry(null);
            }}
            onSubmit={handleUpdate}
            loading={loading}
          />
        )}

      {/* QUOTATION MODAL */}

      {quotation && (
        <QuotationModal
          quotation={quotation}
          onClose={() =>
            setQuotation(null)
          }
          onSend={
            handleSendQuotation
          }
        />
      )}
    </div>
  );
};

export default Enquiries;