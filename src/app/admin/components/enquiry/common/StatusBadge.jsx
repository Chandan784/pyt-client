import {
  STATUS_STYLES,
} from "../../../../../constants/enquiryConstants";

const StatusBadge = ({
  status,
}) => {
  return (
    <span
      className={`
        inline-flex rounded-full
        px-2.5 py-1
        text-[10px]
        font-bold
        ring-1 ring-inset
        ${
          STATUS_STYLES[status] ||
          "bg-gray-100 text-gray-500"
        }
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;