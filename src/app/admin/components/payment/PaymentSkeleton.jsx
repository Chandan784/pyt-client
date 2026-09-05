export default function PaymentSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="animate-pulse">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="flex items-center gap-6 border-b border-gray-100 p-5"
          >
            <div className="h-10 w-32 rounded bg-gray-100" />
            <div className="h-5 w-24 rounded bg-gray-100" />
            <div className="h-5 w-20 rounded bg-gray-100" />
            <div className="h-5 w-24 rounded bg-gray-100" />
            <div className="h-5 w-20 rounded bg-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}