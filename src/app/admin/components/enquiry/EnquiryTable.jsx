"use client";

import { Eye } from "lucide-react";

import TableHeader from "./common/TableHeader";
import StatusBadge from "./common/StatusBadge";
import QuotationBadge from "./common/QuotationBadge";
import { formatDate } from "../../../../utils/formatDate";

const EnquiryTable = ({ enquiries, onView }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* HEADER */}
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-sm font-semibold text-gray-900">
          All Enquiries
        </h2>

        <p className="mt-0.5 text-xs text-gray-400">
          {enquiries.length} enquiries
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1200px]">
          <thead>
            <tr className="bg-gray-50">
              <TableHeader>
                Customer
              </TableHeader>

              <TableHeader>
                Destination
              </TableHeader>

              <TableHeader>
                Travel Date
              </TableHeader>

              <TableHeader>
                Travelers
              </TableHeader>

              <TableHeader>
                Message
              </TableHeader>

              {/* LEAD STATUS FIRST */}
              <TableHeader>
                Lead Status
              </TableHeader>

              {/* QUOTATION STATUS SECOND */}
              <TableHeader>
                Quotation
              </TableHeader>

              <TableHeader>
                Actions
              </TableHeader>
            </tr>
          </thead>

          <tbody>
            {enquiries.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  className="px-5 py-12 text-center text-sm text-gray-400"
                >
                  No enquiries found.
                </td>
              </tr>
            ) : (
              enquiries.map((enquiry) => (
                <tr
                  key={enquiry.id}
                  className="border-t border-gray-100 transition-colors hover:bg-gray-50"
                >
                  {/* CUSTOMER */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-700">
                        {enquiry.name?.[0]?.toUpperCase() || "?"}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {enquiry.name}
                        </p>

                        <p className="text-xs text-gray-400">
                          {enquiry.phone}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* DESTINATION */}
                  <td className="px-5 py-4 text-sm font-medium text-gray-700">
                    {enquiry.destination || "—"}
                  </td>

                  {/* TRAVEL DATE */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {formatDate(enquiry.travelDate)}
                  </td>

                  {/* TRAVELERS */}
                  <td className="px-5 py-4 text-sm text-gray-600">
                    {enquiry.travelers || "—"}
                  </td>

                  {/* MESSAGE */}
                  <td className="max-w-[280px] px-5 py-4">
                    {enquiry.message ? (
                      <p
                        title={enquiry.message}
                        className="line-clamp-2 text-sm leading-5 text-gray-600"
                      >
                        {enquiry.message}
                      </p>
                    ) : (
                      <span className="text-sm text-gray-300">
                        —
                      </span>
                    )}
                  </td>

                  {/* LEAD STATUS */}
                  <td className="px-5 py-4">
                    <StatusBadge status={enquiry.status} />
                  </td>

                  {/* QUOTATION STATUS */}
                  <td className="px-5 py-4">
                    {enquiry.quotationStatus ? (
                      <QuotationBadge
                        status={enquiry.quotationStatus}
                      />
                    ) : (
                      <span className="text-sm text-gray-300">
                        —
                      </span>
                    )}
                  </td>

                  {/* ACTION */}
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      title="View enquiry"
                      onClick={() => onView(enquiry)}
                      className="
                        flex h-8 w-8 items-center justify-center
                        rounded-lg
                        border border-transparent
                        text-gray-500
                        transition
                        hover:border-gray-200
                        hover:bg-white
                        hover:text-gray-900
                      "
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiryTable;