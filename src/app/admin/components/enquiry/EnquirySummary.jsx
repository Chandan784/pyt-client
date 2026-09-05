import SummaryCard from "./common/SummaryCard";

const EnquirySummary = ({ summary }) => {
  return (
    <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-7">

      {/* TOTAL */}
      <SummaryCard
        title="Total Enquiries"
        value={summary.total}
        variant="TOTAL"
      />

      {/* NEW */}
      <SummaryCard
        title="New"
        value={summary.newCount}
        variant="NEW"
      />

      {/* CONTACTED */}
      <SummaryCard
        title="Contacted"
        value={summary.contactedCount}
        variant="CONTACTED"
      />

      {/* QUALIFIED */}
      <SummaryCard
        title="Qualified"
        value={summary.qualifiedCount}
        variant="QUALIFIED"
      />

      {/* FOLLOW UP */}
      <SummaryCard
        title="Follow-ups"
        value={summary.followUpCount}
        variant="FOLLOW_UP"
      />

      {/* CONVERTED */}
      <SummaryCard
        title="Converted"
        value={summary.convertedCount}
        variant="CONVERTED"
      />

      {/* LOST */}
      <SummaryCard
        title="Lost"
        value={summary.lostCount}
        variant="LOST"
      />

    </div>
  );
};

export default EnquirySummary;