const ActivityItem = ({
  title,
  time,
}) => {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700" />
      </div>

      <div>
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-1 text-xs text-gray-400">
          {time || "-"}
        </p>
      </div>
    </div>
  );
};

export default ActivityItem;