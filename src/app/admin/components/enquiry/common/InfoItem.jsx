const InfoItem = ({
  label,
  value,
}) => {
  return (
    <div>
      <p className="text-xs text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-gray-800">
        {value || "-"}
      </p>
    </div>
  );
};

export default InfoItem;