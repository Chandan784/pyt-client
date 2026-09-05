import SummaryCard from "../../admin/components/enquiry/common/SummaryCard";

const EnquirySummary = ({
  summary,
}) => {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <SummaryCard
        title="Total Enquiries"
        value={summary.total}
      />

      <SummaryCard
        title="New"
        value={summary.newCount}
      />

      <SummaryCard
        title="Contacted"
        value={
          summary.contactedCount
        }
      />

      <SummaryCard
        title="Qualified"
        value={
          summary.qualifiedCount
        }
      />
    </div>
  );
};

export default EnquirySummary;