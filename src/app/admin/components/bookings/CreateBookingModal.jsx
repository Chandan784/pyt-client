"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

export default function CreateBookingModal({
  open,
  onClose,
  onSubmit,
  customers = [],
  packages = [],
  destinations = [],
  loading = false,
  editMode = false,
  booking = null,
}) {
  const getInitialForm = () => ({
    customerId: "",
    destinationId: "",
    packageId: "",

    travelStartDate: "",
    travelEndDate: "",

    travelerCount: 1,

    totalAmount: "",
    paidAmount: 0,

    status: "PENDING",

    bookingSource: "WEBSITE",
  });

  const [form, setForm] = useState(
    getInitialForm()
  );

  const [submitting, setSubmitting] =
    useState(false);

  /*
   * --------------------------------------------------
   * FILTER PACKAGES BY DESTINATION
   * --------------------------------------------------
   */

  const filteredPackages = useMemo(() => {
    if (!form.destinationId) {
      return [];
    }

    return packages.filter((pkg) => {
      const packageDestinationId =
        pkg.destination_id ??
        pkg.destinationId ??
        pkg.destination?.id;

      return (
        String(packageDestinationId) ===
        String(form.destinationId)
      );
    });
  }, [
    packages,
    form.destinationId,
  ]);

  /*
   * --------------------------------------------------
   * LOAD CREATE / EDIT FORM
   * --------------------------------------------------
   */

  useEffect(() => {
    if (!open) {
      setForm(getInitialForm());
      return;
    }

    if (editMode && booking) {
      const customerId =
        booking.customerId ??
        booking.customer_id ??
        booking.customer?.id ??
        "";

      const destinationId =
        booking.destinationId ??
        booking.destination_id ??
        booking.destination?.id ??
        "";

      const packageId =
        booking.packageId ??
        booking.package_id ??
        booking.package?.id ??
        "";

      setForm({
        customerId,

        destinationId,

        packageId,

        travelStartDate:
          booking.travelStartDate ??
          booking.travel_start_date ??
          "",

        travelEndDate:
          booking.travelEndDate ??
          booking.travel_end_date ??
          "",

        travelerCount:
          booking.travelerCount ??
          booking.traveler_count ??
          1,

        totalAmount:
          booking.totalAmount ??
          booking.total_amount ??
          "",

        paidAmount:
          booking.paidAmount ??
          booking.paid_amount ??
          0,

        status:
          booking.status ??
          "PENDING",

        bookingSource:
          booking.bookingSource ??
          booking.booking_source ??
          "WEBSITE",
      });
    } else {
      setForm(getInitialForm());
    }
  }, [
    open,
    editMode,
    booking,
  ]);

  /*
   * --------------------------------------------------
   * UPDATE FIELD
   * --------------------------------------------------
   */

  const updateField = (
    field,
    value
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  /*
   * --------------------------------------------------
   * DESTINATION CHANGE
   * --------------------------------------------------
   *
   * When destination changes,
   * package is cleared.
   */

  const handleDestinationChange = (
    event
  ) => {
    const destinationId =
      event.target.value;

    setForm((previous) => ({
      ...previous,

      destinationId,

      packageId: "",
    }));
  };

  /*
   * --------------------------------------------------
   * SUBMIT
   * --------------------------------------------------
   */

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    /*
     * Customer
     */

    if (!form.customerId) {
      alert(
        "Please select a customer."
      );
      return;
    }

    /*
     * Destination
     */

    if (!form.destinationId) {
      alert(
        "Please select a destination."
      );
      return;
    }

    /*
     * Package
     */

    if (!form.packageId) {
      alert(
        "Please select a package."
      );
      return;
    }

    /*
     * Start date
     */

    if (!form.travelStartDate) {
      alert(
        "Please select travel start date."
      );
      return;
    }

    /*
     * End date validation
     */

    if (
      form.travelEndDate &&
      form.travelStartDate &&
      form.travelEndDate <
        form.travelStartDate
    ) {
      alert(
        "Travel end date cannot be before travel start date."
      );

      return;
    }

    /*
     * Total amount
     */

    if (
      form.totalAmount === "" ||
      form.totalAmount === null
    ) {
      alert(
        "Please enter total amount."
      );

      return;
    }

    /*
     * Paid amount
     */

    if (
      Number(form.paidAmount || 0) >
      Number(form.totalAmount || 0)
    ) {
      alert(
        "Paid amount cannot be greater than total amount."
      );

      return;
    }

    /*
     * Payload
     */

    const payload = {
      customerId:
        Number(form.customerId),

      packageId:
        Number(form.packageId),

      destinationId:
        Number(form.destinationId),

      travelStartDate:
        form.travelStartDate,

      travelEndDate:
        form.travelEndDate || null,

      travelerCount:
        Number(form.travelerCount || 1),

      totalAmount:
        Number(form.totalAmount),

      paidAmount:
        Number(form.paidAmount || 0),

      status:
        form.status,

      bookingSource:
        form.bookingSource,
    };

    console.log(
      editMode
        ? "UPDATE BOOKING:"
        : "CREATE BOOKING:",
      payload
    );

    try {
      setSubmitting(true);

      await onSubmit(payload);
    } catch (error) {
      console.error(
        "Booking submit error:",
        error
      );
    } finally {
      setSubmitting(false);
    }
  };

  /*
   * --------------------------------------------------
   * CLOSE
   * --------------------------------------------------
   */

  const handleClose = () => {
    if (submitting) {
      return;
    }

    setForm(getInitialForm());

    onClose();
  };

  /*
   * --------------------------------------------------
   * MODAL
   * --------------------------------------------------
   */

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

        {/* ============================================
            HEADER
        ============================================ */}

        <div className="flex items-center justify-between border-b px-6 py-5">

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editMode
                ? "Edit Booking"
                : "Create New Booking"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {editMode
                ? "Update the booking information."
                : "Add a new customer booking."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={submitting}
            className="text-2xl leading-none text-gray-400 hover:text-gray-700 disabled:opacity-50"
          >
            ×
          </button>

        </div>

        {/* ============================================
            FORM
        ============================================ */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          {/* ==========================================
              CUSTOMER
          ========================================== */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Customer
            </label>

            <select
              value={form.customerId}
              onChange={(event) =>
                updateField(
                  "customerId",
                  event.target.value
                )
              }
              disabled={
                loading ||
                submitting
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="">
                {loading
                  ? "Loading customers..."
                  : "Select Customer"}
              </option>

              {customers.map(
                (customer) => (
                  <option
                    key={customer.id}
                    value={customer.id}
                  >
                    {customer.name ||
                      customer.full_name ||
                      customer.email ||
                      `Customer #${customer.id}`}

                    {customer.phone
                      ? ` - ${customer.phone}`
                      : ""}
                  </option>
                )
              )}
            </select>

            {!loading &&
              customers.length === 0 && (
                <p className="mt-1 text-xs text-red-500">
                  No customers found.
                </p>
              )}
          </div>

          {/* ==========================================
              DESTINATION
          ========================================== */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Destination
            </label>

            <select
              value={
                form.destinationId
              }
              onChange={
                handleDestinationChange
              }
              disabled={
                loading ||
                submitting
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="">
                {loading
                  ? "Loading destinations..."
                  : "Select Destination"}
              </option>

              {destinations.map(
                (destination) => (
                  <option
                    key={destination.id}
                    value={destination.id}
                  >
                    {destination.country ||
                      destination.name ||
                      destination.title ||
                      `Destination #${destination.id}`}

                    {destination.state
                      ? ` - ${destination.state}`
                      : ""}
                  </option>
                )
              )}
            </select>

            {!loading &&
              destinations.length === 0 && (
                <p className="mt-1 text-xs text-red-500">
                  No destinations found.
                </p>
              )}
          </div>

          {/* ==========================================
              PACKAGE
          ========================================== */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Package
            </label>

            <select
              value={form.packageId}
              onChange={(event) =>
                updateField(
                  "packageId",
                  event.target.value
                )
              }
              disabled={
                loading ||
                submitting ||
                !form.destinationId
              }
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="">
                {loading
                  ? "Loading packages..."
                  : !form.destinationId
                  ? "Select destination first"
                  : filteredPackages.length ===
                    0
                  ? "No packages available"
                  : "Select Package"}
              </option>

              {filteredPackages.map(
                (item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.title ||
                      item.name ||
                      item.package_name ||
                      `Package #${item.id}`}
                  </option>
                )
              )}
            </select>

            {!loading &&
              form.destinationId &&
              filteredPackages.length ===
                0 && (
                <p className="mt-1 text-xs text-red-500">
                  No packages found for this
                  destination.
                </p>
              )}

            {form.destinationId &&
              filteredPackages.length >
                0 && (
                <p className="mt-1 text-xs text-gray-500">
                  {filteredPackages.length}{" "}
                  package
                  {filteredPackages.length !==
                  1
                    ? "s"
                    : ""}{" "}
                  available.
                </p>
              )}
          </div>

          {/* ==========================================
              DATES
          ========================================== */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* START DATE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Travel Start Date
              </label>

              <input
                type="date"
                value={
                  form.travelStartDate
                }
                onChange={(event) =>
                  updateField(
                    "travelStartDate",
                    event.target.value
                  )
                }
                disabled={submitting}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black disabled:bg-gray-100"
              />
            </div>

            {/* END DATE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Travel End Date
              </label>

              <input
                type="date"
                value={
                  form.travelEndDate
                }
                min={
                  form.travelStartDate ||
                  undefined
                }
                onChange={(event) =>
                  updateField(
                    "travelEndDate",
                    event.target.value
                  )
                }
                disabled={submitting}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black disabled:bg-gray-100"
              />
            </div>

          </div>

          {/* ==========================================
              TRAVELERS
          ========================================== */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Number of Travelers
            </label>

            <input
              type="number"
              min="1"
              value={
                form.travelerCount
              }
              onChange={(event) =>
                updateField(
                  "travelerCount",
                  event.target.value
                )
              }
              disabled={submitting}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black disabled:bg-gray-100"
            />
          </div>

          {/* ==========================================
              PAYMENT
          ========================================== */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* TOTAL */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Total Amount
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={
                  form.totalAmount
                }
                onChange={(event) =>
                  updateField(
                    "totalAmount",
                    event.target.value
                  )
                }
                placeholder="0.00"
                disabled={submitting}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black disabled:bg-gray-100"
              />
            </div>

            {/* PAID */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Paid Amount
              </label>

              <input
                type="number"
                min="0"
                step="0.01"
                value={
                  form.paidAmount
                }
                onChange={(event) =>
                  updateField(
                    "paidAmount",
                    event.target.value
                  )
                }
                placeholder="0.00"
                disabled={submitting}
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black disabled:bg-gray-100"
              />
            </div>

          </div>

          {/* ==========================================
              STATUS + SOURCE
          ========================================== */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

            {/* STATUS */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Booking Status
              </label>

              <select
                value={form.status}
                onChange={(event) =>
                  updateField(
                    "status",
                    event.target.value
                  )
                }
                disabled={submitting}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black disabled:bg-gray-100"
              >
                <option value="PENDING">
                  Pending
                </option>

                <option value="CONFIRMED">
                  Confirmed
                </option>

                <option value="COMPLETED">
                  Completed
                </option>

                <option value="CANCELLED">
                  Cancelled
                </option>
              </select>
            </div>

            {/* SOURCE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Booking Source
              </label>

              <select
                value={
                  form.bookingSource
                }
                onChange={(event) =>
                  updateField(
                    "bookingSource",
                    event.target.value
                  )
                }
                disabled={submitting}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black disabled:bg-gray-100"
              >
                <option value="WEBSITE">
                  Website
                </option>

                <option value="PHONE">
                  Phone
                </option>

                <option value="WALK_IN">
                  Walk In
                </option>

                <option value="WHATSAPP">
                  WhatsApp
                </option>

                <option value="AGENT">
                  Agent
                </option>

                <option value="OTHER">
                  Other
                </option>
              </select>
            </div>

          </div>

          {/* ==========================================
              FOOTER
          ========================================== */}

          <div className="flex justify-end gap-3 border-t pt-5">

            <button
              type="button"
              onClick={handleClose}
              disabled={submitting}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                submitting ||
                loading ||
                !form.customerId ||
                !form.destinationId ||
                !form.packageId
              }
              className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? editMode
                  ? "Updating..."
                  : "Creating..."
                : editMode
                ? "Update Booking"
                : "Create Booking"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}