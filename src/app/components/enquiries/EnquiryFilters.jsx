import {
  ENQUIRY_STATUSES,
} from "../../../constants/enquiryConstants";

const EnquiryFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row">

      <div className="flex h-11 flex-1 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 shadow-sm">
        <span className="text-lg text-gray-400">
          ⌕
        </span>

        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search by name, phone or destination..."
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </div>

      <select
        value={statusFilter}
        onChange={(e) =>
          setStatusFilter(
            e.target.value
          )
        }
        className="h-11 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none"
      >
        <option value="ALL">
          All Status
        </option>

        {ENQUIRY_STATUSES.map(
          (status) => (
            <option
              key={status.value}
              value={status.value}
            >
              {status.label}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default EnquiryFilters;