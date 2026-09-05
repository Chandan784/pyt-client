"use client";

import { useEffect, useMemo, useState } from "react";

import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "@/api/customerApi";

import CustomerHeader from "./CustomerHeader";
import CustomerStats from "./CustomerStats";
import CustomerFilters from "./CustomerFilters";
import CustomerTable from "./CustomerTable";
import CustomerPagination from "./CustomerPagination";
import CustomerDetailsModal from "./CustomerDetailsModal";
import CustomerFormModal from "./CustomerFormModal";
import EmptyCustomers from "./EmptyCustomers";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [error, setError] = useState("");

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [showDetails, setShowDetails] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [editingCustomer, setEditingCustomer] = useState(null);

  const normalizeCustomer = (customer) => {
    return {
      id: customer.id,

      customerId:
        customer.customerId ||
        customer.customer_id ||
        customer.id,

      name: customer.name || "",

      email: customer.email || "",

      phone: customer.phone || "",

      address: customer.address || "",

      createdAt:
        customer.createdAt ||
        customer.created_at ||
        null,

      updatedAt:
        customer.updatedAt ||
        customer.updated_at ||
        null,

      stats: {
        status:
          customer.stats?.status ||
          customer.status ||
          "New",

        totalBookings:
          customer.stats?.totalBookings ??
          customer.totalBookings ??
          0,

        lastBooking:
          customer.stats?.lastBooking ??
          customer.lastBooking ??
          null,

        totalPaid:
          customer.stats?.totalPaid ??
          customer.totalPaid ??
          customer.totalSpent ??
          0,

        paymentStatus:
          customer.stats?.paymentStatus ||
          customer.paymentStatus ||
          "Pending",
      },
    };
  };

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getCustomers({
        page,
        limit,
        search,
      });

      const data = response?.data || response;

      const customerList =
        data?.customers ||
        data?.data ||
        data ||
        [];

      setCustomers(
        Array.isArray(customerList)
          ? customerList.map(normalizeCustomer)
          : []
      );

      if (data?.pagination) {
        setPagination(data.pagination);
      } else {
        setPagination({
          page,
          limit,
          total:
            Array.isArray(customerList)
              ? customerList.length
              : 0,
          totalPages: 1,
        });
      }
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Failed to load customers"
      );
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, [page, search]);

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleView = async (customer) => {
    try {
      setActionLoading(true);

      const response = await getCustomer(customer.id);

      const data = response?.data || response;

      setSelectedCustomer(
        normalizeCustomer(data?.customer || data)
      );

      setShowDetails(true);
    } catch (err) {
      setError(
        err.message || "Failed to load customer"
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleSubmit = async (formData) => {
    try {
      setActionLoading(true);
      setError("");

      if (editingCustomer) {
        await updateCustomer(
          editingCustomer.id,
          formData
        );
      } else {
        await createCustomer(formData);
      }

      setShowForm(false);
      setEditingCustomer(null);

      await loadCustomers();
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Failed to save customer"
      );

      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (customer) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${customer.name}?`
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);
      setError("");

      await deleteCustomer(customer.id);

      await loadCustomers();
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Failed to delete customer"
      );
    } finally {
      setActionLoading(false);
    }
  };

  const stats = useMemo(() => {
    const totalCustomers =
      pagination.total || customers.length;

    const activeCustomers = customers.filter(
      (customer) =>
        customer.stats?.status === "Active"
    ).length;

    const newCustomers = customers.filter(
      (customer) =>
        customer.stats?.status === "New"
    ).length;

    const totalBookings = customers.reduce(
      (sum, customer) =>
        sum +
        Number(customer.stats?.totalBookings || 0),
      0
    );

    const totalPaid = customers.reduce(
      (sum, customer) =>
        sum +
        Number(customer.stats?.totalPaid || 0),
      0
    );

    return {
      totalCustomers,
      activeCustomers,
      newCustomers,
      totalBookings,
      totalPaid,
    };
  }, [customers, pagination.total]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6">
      <div className="mx-auto max-w-[1600px] space-y-6">
        <CustomerHeader onCreate={handleCreate} />

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <CustomerStats stats={stats} />

        <CustomerFilters
          search={search}
          onSearch={handleSearch}
        />

        {!loading && customers.length === 0 ? (
          <EmptyCustomers
            search={search}
            onCreate={handleCreate}
          />
        ) : (
          <>
            <CustomerTable
              customers={customers}
              loading={loading}
              actionLoading={actionLoading}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />

            <CustomerPagination
              page={pagination.page || page}
              totalPages={
                pagination.totalPages || 1
              }
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      <CustomerDetailsModal
        customer={selectedCustomer}
        open={showDetails}
        onClose={() => {
          setShowDetails(false);
          setSelectedCustomer(null);
        }}
      />

      <CustomerFormModal
        open={showForm}
        customer={editingCustomer}
        loading={actionLoading}
        onClose={() => {
          setShowForm(false);
          setEditingCustomer(null);
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}