"use client";

export default function TripForm({
  data,
  cover,
  inclusionsTags,
  onQuotationChange,
  onCoverChange,
  onTagsChange,
}) {
  const update = (key, value) => {
    onQuotationChange({
      ...data,
      [key]: value,
    });
  };

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-lg font-bold">
        Trip Details
      </h2>

      <div className="grid gap-5 md:grid-cols-3">

        <Input
          label="Destination"
          value={data.destination}
          onChange={(e) =>
            update("destination", e.target.value)
          }
        />

        <Input
          label="Departure Date"
          value={data.departureDate}
          onChange={(e) =>
            update("departureDate", e.target.value)
          }
        />

        <Input
          label="Duration"
          value={data.duration}
          onChange={(e) =>
            update("duration", e.target.value)
          }
        />

        <Input
          label="Travellers"
          value={data.travellers}
          onChange={(e) =>
            update("travellers", e.target.value)
          }
        />

        <Input
          label="Quotation Date"
          value={data.quotationDate}
          onChange={(e) =>
            update("quotationDate", e.target.value)
          }
        />

      </div>

      <div className="my-8 border-t" />

      <h3 className="mb-4 font-semibold">
        Cover Details
      </h3>

      <div className="grid gap-5 md:grid-cols-3">

        <Input
          label="Cover Title"
          value={cover.title}
          onChange={(e) =>
            onCoverChange({
              ...cover,
              title: e.target.value,
            })
          }
        />

        <Input
          label="Cover Destination"
          value={cover.destination}
          onChange={(e) =>
            onCoverChange({
              ...cover,
              destination: e.target.value,
            })
          }
        />

      </div>

      <div className="my-8 border-t" />

      <h3 className="mb-4 font-semibold">
        Cover Inclusion Labels
      </h3>

      <div className="grid gap-3 md:grid-cols-3">

        {inclusionsTags.map((tag, index) => (
          <input
            key={index}
            value={tag}
            onChange={(e) => {
              const next = [...inclusionsTags];
              next[index] = e.target.value;
              onTagsChange(next);
            }}
            className="rounded-lg border px-3 py-2 text-sm"
          />
        ))}

      </div>

    </section>
  );
}

function Input({ label, ...props }) {
  return (
    <label>
      <span className="mb-2 block text-sm font-medium">
        {label}
      </span>

      <input
        {...props}
        className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-orange-500 focus:outline-none"
      />
    </label>
  );
}