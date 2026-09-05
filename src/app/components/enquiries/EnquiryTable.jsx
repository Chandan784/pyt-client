import TableHeader from "../../admin/components/enquiry/common/TableHeader";
import StatusBadge from "../../admin/components/enquiry/common/StatusBadge";
import QuotationBadge from "../../admin/components/enquiry/common/QuotationBadge";

import { formatDate } from "../../../utils/formatDate";

const EnquiryTable = ({
  enquiries,
  onView,
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-sm font-semibold">
          All Enquiries
        </h2>

        <p className="mt-0.5 text-xs text-gray-400">
          {enquiries.length} enquiries
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[950px]">

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
                Lead Status
              </TableHeader>

              <TableHeader>
                Quotation
              </TableHeader>

              <TableHeader />
            </tr>
          </thead>

          <tbody>
            {enquiries.length ===
            0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-5 py-12 text-center text-sm text-gray-400"
                >
                  No enquiries found.
                </td>
              </tr>
            ) : (
              enquiries.map(
                (enquiry) => (
                  <tr
                    key={enquiry.id}
                    onClick={() =>
                      onView(
                        enquiry
                      )
                    }
                    className="cursor-pointer border-t border-gray-100 hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold">
                          {enquiry.name?.[0]}
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            {
                              enquiry.name
                            }
                          </p>

                          <p className="text-xs text-gray-400">
                            {
                              enquiry.phone
                            }
                          </p>
                        </div>

                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium">
                      {
                        enquiry.destination
                      }
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {formatDate(
                        enquiry.travelDate
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {
                        enquiry.travelers
                      }
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge
                        status={
                          enquiry.status
                        }
                      />
                    </td>

                    <td className="px-5 py-4">
                      {enquiry.quotationStatus ===
                      "NONE" ? (
                        <span className="text-sm text-gray-300">
                          —
                        </span>
                      ) : (
                        <div>
                          <QuotationBadge
                            status={
                              enquiry.quotationStatus
                            }
                          />

                          <p className="mt-1 text-xs text-gray-400">
                            ₹
                            {Number(
                              enquiry.quotationAmount ||
                                0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();

                          onView(
                            enquiry
                          );
                        }}
                        className="text-xs font-semibold text-gray-600 hover:text-gray-900"
                      >
                        View →
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnquiryTable;