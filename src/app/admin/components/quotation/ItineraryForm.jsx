"use client";

export default function ItineraryForm({ data, onChange }) {

  const update = (index, key, value) => {
    const next = [...data];

    next[index] = {
      ...next[index],
      [key]: value,
    };

    onChange(next);
  };

  const addDay = () => {
    onChange([
      ...data,
      {
        day: `Day ${data.length + 1}`,
        date: "",
        title: "",
        description: "",
        breakfast: "Included",
        lunch: "Not Included",
        dinner: "Not Included",
      },
    ]);
  };

  return (
    <section className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-lg font-bold">
            Itinerary
          </h2>

          <p className="text-sm text-slate-500">
            Add each day of the trip.
          </p>
        </div>

        <button
          type="button"
          onClick={addDay}
          className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-50"
        >
          + Add Day
        </button>

      </div>

      <div className="space-y-6">

        {data.map((item, index) => (

          <div
            key={index}
            className="rounded-xl border bg-slate-50 p-5"
          >

            <div className="mb-4 grid gap-4 md:grid-cols-3">

              <Input
                label="Day"
                value={item.day}
                onChange={(e) =>
                  update(index, "day", e.target.value)
                }
              />

              <Input
                label="Date"
                value={item.date}
                onChange={(e) =>
                  update(index, "date", e.target.value)
                }
              />

              <Input
                label="Title"
                value={item.title}
                onChange={(e) =>
                  update(index, "title", e.target.value)
                }
              />

            </div>

            <label className="block">

              <span className="mb-2 block text-xs font-semibold">
                Description
              </span>

              <textarea
                rows={5}
                value={item.description}
                onChange={(e) =>
                  update(
                    index,
                    "description",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />

            </label>

            <div className="mt-4 grid gap-4 md:grid-cols-3">

              <Input
                label="Breakfast"
                value={item.breakfast}
                onChange={(e) =>
                  update(
                    index,
                    "breakfast",
                    e.target.value
                  )
                }
              />

              <Input
                label="Lunch"
                value={item.lunch}
                onChange={(e) =>
                  update(index, "lunch", e.target.value)
                }
              />

              <Input
                label="Dinner"
                value={item.dinner}
                onChange={(e) =>
                  update(
                    index,
                    "dinner",
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        ))}

      </div>

    </section>
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