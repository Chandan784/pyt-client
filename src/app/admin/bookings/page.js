
"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import bookingApi from "../../../api/bookingApi";
import { getCustomers } from "../../../api/customerApi";
import packageApi from "../../../api/packageApi";
import destinationApi from "../../../api/destinationApi";

import BookingStats from "../components/bookings/BookingStats";
import BookingFilters from "../components/bookings/BookingFilters";
import BookingTable from "../components/bookings/BookingTable";
import BookingDetailsModal from "../components/bookings/BookingDetailsModal";
import CreateBookingModal from "../components/bookings/CreateBookingModal";

export default function BookingsPage() {
  // ==================================================
  // STATE
  // ==================================================

  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // Selected booking for view/edit
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Create modal
  const [showCreateModal, setShowCreateModal] =
    useState(false);

  // Edit modal
  const [showEditModal, setShowEditModal] =
    useState(false);

  // ==================================================
  // LOAD BOOKINGS
  // ==================================================

  const loadBookings = async () => {
    try {
      setLoading(true);

      const response =
        await bookingApi.getBookings({
          search,
          status,
        });

      console.log(
        "BOOKINGS RESPONSE:",
        response
      );

      /*
       * API may return:
       *
       * [
       *   ...
       * ]
       *
       * OR
       *
       * {
       *   data: [...]
       * }
       *
       * OR
       *
       * {
       *   bookings: [...]
       * }
       */

      const bookingData = Array.isArray(
        response
      )
        ? response
        : response?.data ||
          response?.bookings ||
          [];

      setBookings(
        Array.isArray(bookingData)
          ? bookingData
          : []
      );
    } catch (error) {
      console.error(
        "Failed to load bookings:",
        error
      );

      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // LOAD CUSTOMER / PACKAGE / DESTINATION DATA
  // ==================================================

  const loadFormData = async () => {
    try {
      setFormLoading(true);

      console.log(
        "========== LOADING BOOKING FORM DATA =========="
      );

      const [
        customerResponse,
        packageResponse,
        destinationResponse,
      ] = await Promise.all([
        // CUSTOMERS
        getCustomers({
          page: 1,
          limit: 1000,
          status: "All",
        }),

        // PACKAGES
        packageApi.getPackages({
          page: 1,
          limit: 1000,
        }),

        // DESTINATIONS
        destinationApi.getDestinations({
          page: 1,
          limit: 1000,
        }),
      ]);

      console.log(
        "CUSTOMER RESPONSE:",
        customerResponse
      );

      console.log(
        "PACKAGE RESPONSE:",
        packageResponse
      );

      console.log(
        "DESTINATION RESPONSE:",
        destinationResponse
      );

      // ==================================================
      // CUSTOMERS
      // ==================================================

      const customerData = Array.isArray(
        customerResponse
      )
        ? customerResponse
        : customerResponse?.data ||
          customerResponse?.customers ||
          [];

      // ==================================================
      // PACKAGES
      // ==================================================

      const packageData = Array.isArray(
        packageResponse
      )
        ? packageResponse
        : packageResponse?.data ||
          packageResponse?.packages ||
          [];

      // ==================================================
      // DESTINATIONS
      // ==================================================

      const destinationData = Array.isArray(
        destinationResponse
      )
        ? destinationResponse
        : destinationResponse?.data ||
          destinationResponse?.destinations ||
          [];

      console.log(
        "CUSTOMERS DATA:",
        customerData
      );

      console.log(
        "PACKAGES DATA:",
        packageData
      );

      console.log(
        "DESTINATIONS DATA:",
        destinationData
      );

      // ==================================================
      // SET STATE
      // ==================================================

      setCustomers(
        Array.isArray(customerData)
          ? customerData
          : []
      );

      setPackages(
        Array.isArray(packageData)
          ? packageData
          : []
      );

      setDestinations(
        Array.isArray(destinationData)
          ? destinationData
          : []
      );
    } catch (error) {
      console.error(
        "FAILED TO LOAD BOOKING FORM DATA:",
        error
      );

      setCustomers([]);
      setPackages([]);
      setDestinations([]);
    } finally {
      setFormLoading(false);
    }
  };

  // ==================================================
  // INITIAL LOAD
  // ==================================================

  useEffect(() => {
    loadFormData();
  }, []);

  // ==================================================
  // LOAD BOOKINGS WHEN FILTER CHANGES
  // ==================================================

  useEffect(() => {
    loadBookings();
  }, [search, status]);

  // ==================================================
  // FILTER BOOKINGS
  // ==================================================

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const keyword = search
        .toLowerCase()
        .trim();

      const bookingId = String(
        booking.booking_id ??
          booking.bookingId ??
          booking.id ??
          ""
      ).toLowerCase();

      const customerName = String(
        booking.customer_name ??
          booking.customerName ??
          booking.customer?.name ??
          ""
      ).toLowerCase();

      const packageName = String(
        booking.package_name ??
          booking.packageName ??
          booking.package?.name ??
          booking.package?.title ??
          ""
      ).toLowerCase();

      const destinationName = String(
        booking.destination_name ??
          booking.destinationName ??
          booking.destination?.name ??
          booking.destination?.country ??
          ""
      ).toLowerCase();

      const matchesSearch =
        !keyword ||
        bookingId.includes(keyword) ||
        customerName.includes(keyword) ||
        packageName.includes(keyword) ||
        destinationName.includes(keyword);

      const matchesStatus =
        !status ||
        booking.status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    bookings,
    search,
    status,
  ]);

  // ==================================================
  // CREATE BOOKING
  // ==================================================

  const handleCreateBooking = async (
    data
  ) => {
    try {
      console.log(
        "CREATE BOOKING DATA:",
        data
      );

      setFormLoading(true);

      await bookingApi.createBooking(
        data
      );

      alert(
        "Booking created successfully."
      );

      setShowCreateModal(false);

      await loadBookings();
    } catch (error) {
      console.error(
        "Failed to create booking:",
        error
      );

      alert(
        error?.message ||
          "Failed to create booking"
      );

      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  // ==================================================
  // OPEN EDIT MODAL
  // ==================================================

  const handleEditBooking = (
    booking
  ) => {
    console.log(
      "EDIT BOOKING:",
      booking
    );

    setSelectedBooking(
      booking
    );

    setShowEditModal(true);
  };

  // ==================================================
  // UPDATE BOOKING
  // ==================================================

  const handleUpdateBooking = async (
    data
  ) => {
    if (!selectedBooking?.id) {
      alert(
        "Booking ID not found."
      );

      return;
    }

    try {
      console.log(
        "UPDATE BOOKING ID:",
        selectedBooking.id
      );

      console.log(
        "UPDATE BOOKING DATA:",
        data
      );

      setFormLoading(true);

      await bookingApi.updateBooking(
        selectedBooking.id,
        data
      );

      alert(
        "Booking updated successfully."
      );

      setShowEditModal(false);

      setSelectedBooking(null);

      await loadBookings();
    } catch (error) {
      console.error(
        "Failed to update booking:",
        error
      );

      alert(
        error?.message ||
          "Failed to update booking"
      );

      throw error;
    } finally {
      setFormLoading(false);
    }
  };

  // ==================================================
  // DELETE BOOKING
  // ==================================================

  const handleDeleteBooking = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this booking?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await bookingApi.deleteBooking(
        id
      );

      setBookings(
        (previous) =>
          previous.filter(
            (booking) =>
              booking.id !== id
          )
      );

      alert(
        "Booking deleted successfully."
      );
    } catch (error) {
      console.error(
        "Failed to delete booking:",
        error
      );

      alert(
        error?.message ||
          "Failed to delete booking"
      );
    }
  };

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Bookings
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage customer bookings,
              payments and travel details.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setShowCreateModal(true)
            }
            className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            + New Booking
          </button>

        </div>

        {/* ==================================================
            STATS
        ================================================== */}

        <BookingStats
          bookings={bookings}
        />

        {/* ==================================================
            FILTERS
        ================================================== */}

        <BookingFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          onCreate={() =>
            setShowCreateModal(true)
          }
        />

        {/* ==================================================
            TABLE
        ================================================== */}

        <BookingTable
          bookings={filteredBookings}
          loading={loading}
          onView={setSelectedBooking}
          onEdit={handleEditBooking}
          onDelete={handleDeleteBooking}
        />

      </div>

      {/* ==================================================
          BOOKING DETAILS MODAL
      ================================================== */}

      <BookingDetailsModal
        booking={selectedBooking}
        onClose={() =>
          setSelectedBooking(null)
        }
      />

      {/* ==================================================
          CREATE BOOKING MODAL
      ================================================== */}

      <CreateBookingModal
        open={showCreateModal}
        onClose={() =>
          setShowCreateModal(false)
        }
        onSubmit={
          handleCreateBooking
        }
        customers={customers}
        packages={packages}
        destinations={destinations}
        loading={formLoading}
        editMode={false}
        booking={null}
      />

      {/* ==================================================
          EDIT BOOKING MODAL
      ================================================== */}

      <CreateBookingModal
        open={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedBooking(null);
        }}
        onSubmit={
          handleUpdateBooking
        }
        customers={customers}
        packages={packages}
        destinations={destinations}
        loading={formLoading}
        editMode={true}
        booking={selectedBooking}
      />

    </div>
  );
}

