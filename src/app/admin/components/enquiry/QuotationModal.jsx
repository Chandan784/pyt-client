"use client";

import InfoItem from "./common/InfoItem";
import QuotationBadge from "./common/QuotationBadge";

import { formatDate } from "../../../../utils/formatDate";

const QuotationModal = ({
  quotation,
  onClose,
  onSend,
}) => {
  const isDraft =
    quotation.quotationStatus ===
    "DRAFT";

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm">

      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

          <div>
            <p className="text-[10px] font-bold tracking-wider text-gray-400">
              QUOTATION
            </p>

            <h2 className="mt-1 text-lg font-semibold">
              QT-
              {String(
                quotation.id
              ).padStart(4, "0")}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100"
          >
            ×
          </button>

        </div>

        {/* BODY */}

        <div className="p-6">

          <div className="rounded-xl bg-gray-50 p-5">

            <p className="text-xs text-gray-400">
              Customer
            </p>

            <p className="mt-1 font-semibold">
              {quotation.name}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-5">

              <InfoItem
                label="Destination"
                value={
                  quotation.destination
                }
              />

              <InfoItem
                label="Travelers"
                value={
                  quotation.travelers
                }
              />

              <InfoItem
                label="Travel Date"
                value={formatDate(
                  quotation.travelDate
                )}
              />

              <InfoItem
                label="Budget"
                value={`₹${Number(
                  quotation.budget || 0
                ).toLocaleString(
                  "en-IN"
                )}`}
              />

            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">

            <div>
              <p className="text-xs text-gray-400">
                Quotation Amount
              </p>

              <p className="mt-1 text-2xl font-semibold">
                ₹
                {Number(
                  quotation.quotationAmount ||
                    0
                ).toLocaleString(
                  "en-IN"
                )}
              </p>
            </div>

            <QuotationBadge
              status={
                quotation.quotationStatus
              }
            />

          </div>

          <div className="mt-6 flex justify-end gap-3">

            <button
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold"
            >
              Close
            </button>

            {isDraft && (
              <button
                onClick={onSend}
                className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Send Quotation
              </button>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotationModal;