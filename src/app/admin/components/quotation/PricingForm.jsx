"use client";

export default function PricingForm({
  pricing,
  inclusions,
  exclusions,
  onPricingChange,
  onInclusionsChange,
  onExclusionsChange,
}) {
  const updatePricing = (key, value) => {
    onPricingChange({
      ...pricing,
      [key]: value,
    });
  };

  const updateList = (
    list,
    setter,
    index,
    value
  ) => {
    const next = [...list];
    next[index] = value;
    setter(next);
  };

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-lg font-bold">
        Pricing & Package
      </h2>

      <div className="grid gap-4 md:grid-cols-3">

        <Input
          label="Package Travellers"
          value={pricing.packageTravellers}
          onChange={(e) =>
            updatePricing(
              "packageTravellers",
              e.target.value
            )
          }
        />

        <Input
          label="Package Per Adult"
          type="number"
          value={pricing.packagePerAdult}
          onChange={(e) =>
            updatePricing(
              "packagePerAdult",
              Number(e.target.value)
            )
          }
        />

        <Input
          label="Package Total"
          type="number"
          value={pricing.packageTotal}
          onChange={(e) =>
            updatePricing(
              "packageTotal",
              Number(e.target.value)
            )
          }
        />

        <Input
          label="Flight Travellers"
          value={pricing.flightTravellers}
          onChange={(e) =>
            updatePricing(
              "flightTravellers",
              e.target.value
            )
          }
        />

        <Input
          label="Flight Per Adult"
          type="number"
          value={pricing.flightPerAdult}
          onChange={(e) =>
            updatePricing(
              "flightPerAdult",
              Number(e.target.value)
            )
          }
        />

        <Input
          label="Flight Total"
          type="number"
          value={pricing.flightTotal}
          onChange={(e) =>
            updatePricing(
              "flightTotal",
              Number(e.target.value)
            )
          }
        />

      </div>

      <div className="my-8 border-t" />

      <ListEditor
        title="Inclusions"
        list={inclusions}
        setter={onInclusionsChange}
        update={(index, value) =>
          updateList(
            inclusions,
            onInclusionsChange,
            index,
            value
          )
        }
      />

      <div className="my-8 border-t" />

      <ListEditor
        title="Exclusions"
        list={exclusions}
        setter={onExclusionsChange}
        update={(index, value) =>
          updateList(
            exclusions,
            onExclusionsChange,
            index,
            value
          )
        }
      />

    </section>
  );
}

function ListEditor({
  title,
  list,
  setter,
  update,
}) {
  return (
    <div>

      <div className="mb-4 flex items-center justify-between">

        <h3 className="font-semibold">
          {title}
        </h3>

        <button
          type="button"
          onClick={() =>
            setter([...list, ""])
          }
          className="text-sm font-medium text-orange-600"
        >
          + Add
        </button>

      </div>

      <div className="space-y-2">

        {list.map((item, index) => (
          <input
            key={index}
            value={item}
            onChange={(e) =>
              update(index, e.target.value)
            }
            className="w-full rounded-lg border px-3 py-2 text-sm"
          />
        ))}

      </div>

    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <label>
      <span className="mb-2 block text-xs font-semibold">
        {label}
      </span>

      <input
        {...props}
        className="w-full rounded-lg border px-3 py-2 text-sm"
      />
    </label>
  );
}