import CustomerForm from "./CustomerForm";

export default function CustomerFormModal({
  open,
  customer,
  loading,
  onClose,
  onSubmit,
}) {
  if (!open) return null;

  const isEditing = Boolean(customer);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing
                ? "Edit Customer"
                : "Add Customer"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isEditing
                ? "Update customer information."
                : "Create a new customer."}
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-500 hover:bg-slate-100"
          >
            ×
          </button>
        </div>

        <CustomerForm
          customer={customer}
          loading={loading}
          onCancel={onClose}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}