"use client";

export default function CustomerForm({ data, onChange }) {
  const update = (key, value) => {
    onChange({
      ...data,
      [key]: value,
    });
  };

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Customer Details
        </h2>

        <p className="text-sm text-slate-500">
          Information shown on the quotation.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">

        <Input
          label="Customer Name"
          value={data.name}
          onChange={(e) =>
            update("name", e.target.value)
          }
        />

        <Input
          label="Email"
          value={data.email}
          onChange={(e) =>
            update("email", e.target.value)
          }
        />

        <Input
          label="Phone"
          value={data.phone}
          onChange={(e) =>
            update("phone", e.target.value)
          }
        />

      </div>
    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </span>

      <input
        {...props}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
      />
    </label>
  );
}