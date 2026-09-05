import {
  IndianRupee,
  Clock3,
  RotateCcw,
  Receipt,
} from "lucide-react";

export default function PaymentStats({ summary }) {
  const cards = [
    {
      title: "Total Collected",
      value: summary.total_collected,
      icon: IndianRupee,
      description: "Successful payments",
    },
    {
      title: "Pending",
      value: summary.total_pending,
      icon: Clock3,
      description: "Awaiting confirmation",
    },
    {
      title: "Refunded",
      value: summary.total_refunded,
      icon: RotateCcw,
      description: "Refunded amount",
    },
    {
      title: "Transactions",
      value: summary.total_transactions,
      icon: Receipt,
      description: "Total transactions",
      isCount: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h3 className="mt-2 text-2xl font-semibold text-gray-900">
                  {card.isCount
                    ? card.value
                    : `₹${Number(card.value || 0).toLocaleString(
                        "en-IN"
                      )}`}
                </h3>
              </div>

              <div className="rounded-lg bg-gray-100 p-3">
                <Icon
                  size={20}
                  className="text-gray-700"
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              {card.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}