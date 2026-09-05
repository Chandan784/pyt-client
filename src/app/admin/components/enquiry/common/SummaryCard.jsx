import { ArrowUpRight } from "lucide-react";

import {
  STATUS_STYLES,
} from "../../../../../constants/enquiryConstants";

const getCardStyles = (variant) => {
  const status = variant.toUpperCase();

  const style = STATUS_STYLES[status];

  if (!style) {
    return {
      card: "border-gray-200 bg-gray-50",
      icon: "bg-white border-gray-200 text-gray-600",
      value: "text-gray-900",
      badge: "bg-white text-gray-600 border border-gray-200",
      accent: "bg-gray-400",
    };
  }

  const styles = {
    NEW: {
      card: `${style} border-blue-100`,
      icon: "bg-blue-100 border-blue-200 text-blue-700",
      value: "text-blue-900",
      badge: "bg-blue-100 text-blue-700",
      accent: "bg-blue-500",
    },

    CONTACTED: {
      card: `${style} border-amber-100`,
      icon: "bg-amber-100 border-amber-200 text-amber-700",
      value: "text-amber-900",
      badge: "bg-amber-100 text-amber-700",
      accent: "bg-amber-500",
    },

    QUALIFIED: {
      card: `${style} border-emerald-100`,
      icon: "bg-emerald-100 border-emerald-200 text-emerald-700",
      value: "text-emerald-900",
      badge: "bg-emerald-100 text-emerald-700",
      accent: "bg-emerald-500",
    },

    FOLLOW_UP: {
      card: `${style} border-orange-100`,
      icon: "bg-orange-100 border-orange-200 text-orange-700",
      value: "text-orange-900",
      badge: "bg-orange-100 text-orange-700",
      accent: "bg-orange-500",
    },

    CONVERTED: {
      card: `${style} border-teal-100`,
      icon: "bg-teal-100 border-teal-200 text-teal-700",
      value: "text-teal-900",
      badge: "bg-teal-100 text-teal-700",
      accent: "bg-teal-500",
    },

    LOST: {
      card: `${style} border-red-100`,
      icon: "bg-red-100 border-red-200 text-red-700",
      value: "text-red-900",
      badge: "bg-red-100 text-red-700",
      accent: "bg-red-500",
    },
  };

  return styles[status] || {
    card: "border-gray-200 bg-gray-50",
    icon: "bg-white border-gray-200 text-gray-600",
    value: "text-gray-900",
    badge: "bg-white text-gray-600 border border-gray-200",
    accent: "bg-gray-400",
  };
};

const SummaryCard = ({
  title,
  value,
  change,
  icon: Icon,
  variant = "neutral",
}) => {
  const styles = getCardStyles(variant);

  return (
    <div
      className={`
        group relative overflow-hidden
        rounded-2xl border p-5 shadow-sm
        transition-all duration-200
        hover:-translate-y-0.5 hover:shadow-md
        ${styles.card}
      `}
    >
      {/* TOP */}
      <div className="relative flex items-start justify-between">

        <div>
          <p className="text-xs font-semibold text-gray-500">
            {title}
          </p>

          <p
            className={`
              mt-3 text-3xl font-bold tracking-tight
              ${styles.value}
            `}
          >
            {value}
          </p>
        </div>

        {/* ICON */}
        {Icon && (
          <div
            className={`
              flex h-10 w-10 items-center
              justify-center rounded-xl border
              ${styles.icon}
            `}
          >
            <Icon
              size={18}
              strokeWidth={2}
            />
          </div>
        )}
      </div>

      {/* CHANGE */}
      {change && (
        <div className="relative mt-4 flex items-center gap-2">

          <span
            className={`
              inline-flex items-center gap-1
              rounded-full px-2.5 py-1
              text-[11px] font-bold
              ${styles.badge}
            `}
          >
            <ArrowUpRight size={12} />
            {change}
          </span>

          <span className="text-[11px] font-medium text-gray-400">
            vs last month
          </span>

        </div>
      )}

      {/* STATUS ACCENT */}
      <div
        className={`
          absolute bottom-0 left-0
          h-1 w-full
          ${styles.accent}
        `}
      />
    </div>
  );
};

export default SummaryCard;