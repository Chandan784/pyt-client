"use client";

import { useState } from "react";

import CustomerForm from "./CustomerForm";
import TripForm from "./TripForm";
import StayForm from "./StayForm";
import FlightForm from "./FlightForm";
import ItineraryForm from "./ItineraryForm";
import PricingForm from "./PricingForm";

import { downloadQuotationPdf } from "../../quotation/lib/quotationPdf";

export default function QuotationBuilder({ initialData }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const updateSection = (section, value) => {
    setData((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const handleDownload = async () => {
    try {
      setLoading(true);

      await downloadQuotationPdf(data);

    } catch (error) {
      console.error(error);
      alert("Unable to generate quotation PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}
      <div className="sticky top-0 z-40 border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Quotation Builder
            </h1>

            <p className="text-sm text-slate-500">
              PrimeVistaJourney
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating PDF..." : "Download Quotation PDF"}
          </button>

        </div>
      </div>

      {/* Form */}
      <main className="mx-auto max-w-7xl px-6 py-8">

        <div className="space-y-6">

          <CustomerForm
            data={data.customer}
            onChange={(value) =>
              updateSection("customer", value)
            }
          />

          <TripForm
            data={data.quotation}
            cover={data.cover}
            inclusionsTags={data.inclusionsTags}
            onQuotationChange={(value) =>
              updateSection("quotation", value)
            }
            onCoverChange={(value) =>
              updateSection("cover", value)
            }
            onTagsChange={(value) =>
              updateSection("inclusionsTags", value)
            }
          />

          <StayForm
            data={data.stays}
            onChange={(value) =>
              updateSection("stays", value)
            }
          />

          <FlightForm
            data={data.flights}
            onChange={(value) =>
              updateSection("flights", value)
            }
          />

          <ItineraryForm
            data={data.itinerary}
            onChange={(value) =>
              updateSection("itinerary", value)
            }
          />

          <PricingForm
            pricing={data.pricing}
            inclusions={data.inclusions}
            exclusions={data.exclusions}
            onPricingChange={(value) =>
              updateSection("pricing", value)
            }
            onInclusionsChange={(value) =>
              updateSection("inclusions", value)
            }
            onExclusionsChange={(value) =>
              updateSection("exclusions", value)
            }
          />

        </div>

        {/* Bottom Download */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleDownload}
            disabled={loading}
            className="rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {loading
              ? "Generating..."
              : "Download Quotation PDF"}
          </button>
        </div>

      </main>
    </div>
  );
}