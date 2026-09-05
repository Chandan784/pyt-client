export const ENQUIRY_STATUSES = [
  {
    value: "NEW",
    label: "New",
  },
  {
    value: "CONTACTED",
    label: "Contacted",
  },
  {
    value: "QUALIFIED",
    label: "Qualified",
  },
  {
    value: "FOLLOW_UP",
    label: "Follow-up",
  },
  {
    value: "CONVERTED",
    label: "Converted",
  },
  {
    value: "LOST",
    label: "Lost",
  },
];

export const QUOTATION_STATUSES = [
  {
    value: "NONE",
    label: "No Quotation",
  },
  {
    value: "DRAFT",
    label: "Draft",
  },
  {
    value: "SENT",
    label: "Sent",
  },
  {
    value: "VIEWED",
    label: "Viewed",
  },
  {
    value: "ACCEPTED",
    label: "Accepted",
  },
  {
    value: "REJECTED",
    label: "Rejected",
  },
];

export const STATUS_STYLES = {
  NEW: "bg-blue-50 text-blue-700 ring-blue-100",
  CONTACTED: "bg-sky-50 text-sky-700 ring-sky-100",
  QUALIFIED: "bg-violet-50 text-violet-700 ring-violet-100",
  FOLLOW_UP: "bg-amber-50 text-amber-700 ring-amber-100",
  CONVERTED: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  LOST: "bg-red-50 text-red-700 ring-red-100",
};

export const QUOTATION_STYLES = {
  NONE: "bg-gray-100 text-gray-500 ring-gray-200",
  DRAFT: "bg-gray-100 text-gray-600 ring-gray-200",
  SENT: "bg-blue-50 text-blue-700 ring-blue-100",
  VIEWED: "bg-violet-50 text-violet-700 ring-violet-100",
  ACCEPTED: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  REJECTED: "bg-red-50 text-red-700 ring-red-100",
};