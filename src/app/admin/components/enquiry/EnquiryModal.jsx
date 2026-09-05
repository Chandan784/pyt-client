"use client";

import { useEffect, useState } from "react";

import {
  Pencil,
  Trash2,
  X,
  Save,
  User,
  MapPin,
  CalendarDays,
  Users,
  Wallet,
  Mail,
  Phone,
  MessageSquare,
  CircleDot,
  FileText,
} from "lucide-react";

import FormInput from "./common/FormInput";

import {
  ENQUIRY_STATUSES,
  STATUS_STYLES,
  QUOTATION_STYLES,
} from "../../../../constants/enquiryConstants";

const QUOTATION_STATUSES = [
  {
    value: "NONE",
    label: "No Quotation",
  },
  {
    value: "DRAFT",
    label: "Draft",
  },
  {
    value: "SENT",
    label: "Sent",
  },
  {
    value: "VIEWED",
    label: "Viewed",
  },
  {
    value: "ACCEPTED",
    label: "Accepted",
  },
  {
    value: "REJECTED",
    label: "Rejected",
  },
];

const EnquiryModal = ({
  title,
  initialData,
  mode = "create",
  onClose,
  onSubmit,
  onDelete,
  loading = false,
}) => {
  const [currentMode, setCurrentMode] = useState(mode);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    travelDate: "",
    travelers: 1,
    budget: "",
    message: "",
    status: "NEW",
    quotationStatus: "NONE",
  });

  // ============================================
  // LOAD INITIAL DATA
  // ============================================

  useEffect(() => {
    setCurrentMode(mode);

    setForm({
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
      destination: initialData?.destination || "",

      travelDate: initialData?.travelDate
        ? initialData.travelDate.split("T")[0]
        : "",

      travelers: initialData?.travelers || 1,
      budget: initialData?.budget || "",
      message: initialData?.message || "",

      status: initialData?.status || "NEW",

      quotationStatus:
        initialData?.quotationStatus || "NONE",
    });
  }, [initialData, mode]);

  // ============================================
  // UPDATE FIELD
  // ============================================

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ============================================
  // EDIT
  // ============================================

  const handleEdit = () => {
    setCurrentMode("edit");
  };

  // ============================================
  // CANCEL EDIT
  // ============================================

  const handleCancelEdit = () => {
    if (!initialData) {
      onClose();
      return;
    }

    setForm({
      name: initialData.name || "",
      phone: initialData.phone || "",
      email: initialData.email || "",
      destination: initialData.destination || "",

      travelDate: initialData?.travelDate
        ? initialData.travelDate.split("T")[0]
        : "",

      travelers: initialData.travelers || 1,
      budget: initialData.budget || "",
      message: initialData.message || "",

      status: initialData.status || "NEW",

      quotationStatus:
        initialData.quotationStatus || "NONE",
    });

    setCurrentMode("view");
  };

  // ============================================
  // SUBMIT
  // ============================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.phone.trim() ||
      !form.destination.trim() ||
      !form.travelDate
    ) {
      alert("Please fill all required fields.");
      return;
    }

    onSubmit({
      ...form,
      travelers: Number(form.travelers) || 1,
    });
  };

  // ============================================
  // DELETE
  // ============================================

  const handleDelete = () => {
    if (!initialData?.id || !onDelete) {
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete enquiry #${initialData.id}?`
    );

    if (!confirmed) {
      return;
    }

    onDelete(initialData.id);
  };

  // ============================================
  // MODE
  // ============================================

  const isViewMode = currentMode === "view";

  // ============================================
  // LEAD STATUS
  // ============================================

  const statusStyle =
    STATUS_STYLES[form.status] ||
    "bg-gray-50 text-gray-600 border-gray-200";

  const statusLabel =
    ENQUIRY_STATUSES.find(
      (item) => item.value === form.status
    )?.label || form.status;

  // ============================================
  // QUOTATION STATUS
  // ============================================

  const quotationStyle =
    QUOTATION_STYLES[form.quotationStatus] ||
    "bg-gray-50 text-gray-600 ring-gray-200";

  const quotationLabel =
    QUOTATION_STATUSES.find(
      (item) => item.value === form.quotationStatus
    )?.label || form.quotationStatus;

  // ============================================
  // VIEW FIELD
  // ============================================

  const ViewField = ({
    icon: Icon,
    label,
    value,
    full = false,
  }) => {
    return (
      <div className={full ? "sm:col-span-2" : ""}>
        <div className="mb-1.5 flex items-center gap-1.5">
          <Icon
            size={13}
            className="text-gray-400"
          />

          <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
            {label}
          </p>
        </div>

        <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5">
          <p className="text-sm font-medium text-gray-800">
            {value || "—"}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">
      <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* ========================================
            HEADER
        ======================================== */}

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {isViewMode
                  ? "Enquiry Details"
                  : title}
              </h2>

              {initialData && (
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                  #{initialData.id}
                </span>
              )}
            </div>

            <p className="mt-1 text-xs text-gray-400">
              {isViewMode
                ? "View customer enquiry, lead and quotation details."
                : initialData
                ? "Update enquiry, lead and quotation information."
                : "Enter customer and travel details."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition hover:bg-gray-200 disabled:opacity-50"
          >
            <X size={17} />
          </button>
        </div>

        {/* ========================================
            VIEW MODE
        ======================================== */}

        {isViewMode ? (
          <>
            <div className="flex-1 overflow-y-auto p-6">

              {/* CUSTOMER */}

              <div className="mb-6">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <User size={16} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Customer Information
                    </h3>

                    <p className="text-[11px] text-gray-400">
                      Basic customer details
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ViewField
                    icon={User}
                    label="Customer Name"
                    value={form.name}
                  />

                  <ViewField
                    icon={Phone}
                    label="Phone"
                    value={form.phone}
                  />

                  <ViewField
                    icon={Mail}
                    label="Email"
                    value={form.email}
                    full
                  />
                </div>
              </div>

              {/* TRAVEL */}

              <div className="mb-6 border-t border-gray-100 pt-6">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    <MapPin size={16} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Travel Information
                    </h3>

                    <p className="text-[11px] text-gray-400">
                      Trip and budget details
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ViewField
                    icon={MapPin}
                    label="Destination"
                    value={form.destination}
                  />

                  <ViewField
                    icon={CalendarDays}
                    label="Travel Date"
                    value={form.travelDate}
                  />

                  <ViewField
                    icon={Users}
                    label="Travelers"
                    value={form.travelers}
                  />

                  <ViewField
                    icon={Wallet}
                    label="Budget"
                    value={
                      form.budget
                        ? `₹${form.budget}`
                        : "—"
                    }
                  />
                </div>
              </div>

              {/* LEAD + QUOTATION STATUS */}

              <div className="mb-6 border-t border-gray-100 pt-6">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <CircleDot size={16} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      Enquiry Status
                    </h3>

                    <p className="text-[11px] text-gray-400">
                      Lead and quotation progress
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">

                  {/* LEAD STATUS */}

                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                      Lead Status
                    </p>

                    <span
                      className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyle}`}
                    >
                      {statusLabel}
                    </span>
                  </div>

                  {/* QUOTATION STATUS */}

                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                      Quotation Status
                    </p>

                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${quotationStyle}`}
                    >
                      {quotationLabel}
                    </span>
                  </div>
                </div>
              </div>

              {/* MESSAGE */}

              <div className="border-t border-gray-100 pt-6">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <MessageSquare size={16} />
                  </div>

                  <h3 className="text-sm font-semibold text-gray-900">
                    Customer Message
                  </h3>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-gray-600">
                    {form.message ||
                      "No message provided."}
                  </p>
                </div>
              </div>
            </div>

            {/* VIEW FOOTER */}

            <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/50 px-6 py-4">

              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
              >
                <Trash2 size={15} />
                Delete
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  <Pencil size={15} />
                  Edit Enquiry
                </button>
              </div>
            </div>
          </>
        ) : (

          /* ========================================
             CREATE / EDIT MODE
          ======================================== */

          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto p-6"
          >
            <div className="grid gap-5 sm:grid-cols-2">

              <FormInput
                label="Customer Name"
                required
                value={form.name}
                onChange={(value) =>
                  updateField("name", value)
                }
              />

              <FormInput
                label="Phone"
                required
                value={form.phone}
                onChange={(value) =>
                  updateField("phone", value)
                }
              />

              <FormInput
                label="Email"
                type="email"
                value={form.email}
                onChange={(value) =>
                  updateField("email", value)
                }
              />

              <FormInput
                label="Destination"
                required
                value={form.destination}
                onChange={(value) =>
                  updateField(
                    "destination",
                    value
                  )
                }
              />

              <FormInput
                label="Travel Date"
                type="date"
                required
                value={form.travelDate}
                onChange={(value) =>
                  updateField(
                    "travelDate",
                    value
                  )
                }
              />

              <FormInput
                label="Travelers"
                type="number"
                min="1"
                value={form.travelers}
                onChange={(value) =>
                  updateField(
                    "travelers",
                    Number(value)
                  )
                }
              />

              <FormInput
                label="Budget"
                type="number"
                value={form.budget}
                onChange={(value) =>
                  updateField(
                    "budget",
                    value
                  )
                }
              />

              {/* LEAD STATUS */}

              <div>
                <label className="mb-1.5 block text-xs font-medium text-gray-600">
                  Lead Status
                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    updateField(
                      "status",
                      e.target.value
                    )
                  }
                  className="h-[42px] w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                >
                  {ENQUIRY_STATUSES.map(
                    (status) => (
                      <option
                        key={status.value}
                        value={status.value}
                      >
                        {status.label}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* QUOTATION STATUS */}

              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-gray-600">
                  <FileText size={13} />
                  Quotation Status
                </label>

                <select
                  value={form.quotationStatus}
                  onChange={(e) =>
                    updateField(
                      "quotationStatus",
                      e.target.value
                    )
                  }
                  className="h-[42px] w-full rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                >
                  {QUOTATION_STATUSES.map(
                    (quotation) => (
                      <option
                        key={quotation.value}
                        value={quotation.value}
                      >
                        {quotation.label}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* MESSAGE */}

            <div className="mt-5">
              <label className="mb-1.5 block text-xs font-medium text-gray-600">
                Message
              </label>

              <textarea
                value={form.message}
                onChange={(e) =>
                  updateField(
                    "message",
                    e.target.value
                  )
                }
                rows={4}
                placeholder="Customer requirements..."
                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
              />
            </div>

            {/* FOOTER */}

            <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">

              <div>
                {initialData && (
                  <button
                    type="button"
                    onClick={handleDelete}
                    disabled={loading}
                    className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={
                    initialData
                      ? handleCancelEdit
                      : onClose
                  }
                  disabled={loading}
                  className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:opacity-50"
                >
                  {loading ? (
                    "Saving..."
                  ) : initialData ? (
                    <>
                      <Save size={15} />
                      Save Changes
                    </>
                  ) : (
                    "Create Enquiry"
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
