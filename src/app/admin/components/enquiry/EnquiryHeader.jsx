const EnquiryHeader = ({
  onCreate,
}) => {
  return (
    <div className="mb-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-xs font-medium text-gray-400">
          CRM / Enquiries
        </p>

        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Enquiries
        </h1>

        <p className="mt-1.5 text-sm text-gray-500">
          Manage and follow up with your
          travel enquiries.
        </p>
      </div>

      <button
        onClick={onCreate}
        className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
      >
        + New Enquiry
      </button>
    </div>
  );
};

export default EnquiryHeader;