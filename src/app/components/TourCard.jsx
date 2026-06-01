"use client";

import Link from "next/link";

import { Clock3, Star, ArrowRight, BadgeCheck, Sparkles } from "lucide-react";

export default function TourCard({ tour }) {
  const featured = Number(tour?.featured) === 1;

  const status = String(tour?.status || "").toLowerCase();

  const startingPrice = Number(tour?.startingFrom || 0);

  const originalPrice = Number(tour?.originalPrice || 0);

  const discount =
    originalPrice > startingPrice
      ? Math.round(((originalPrice - startingPrice) / originalPrice) * 100)
      : 0;

  return (
    <div
      className="
        bg-white
        rounded-[28px]
        overflow-hidden
        border
        border-gray-200
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        group
      "
    >
      {/* IMAGE */}

      <div className="relative h-64 overflow-hidden">
        <img
          src={tour?.thumbnail}
          alt={tour?.title}
          className="
            w-full
            h-full
            object-cover
            group-hover:scale-105
            transition-transform
            duration-500
          "
        />

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* TOP BADGES */}

        <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
          {featured ? (
            <div
              className="
                bg-yellow-400
                text-black
                px-3
                py-1.5
                rounded-full
                text-xs
                font-bold
                flex
                items-center
                gap-1
              "
            >
              <Sparkles size={12} />
              Featured
            </div>
          ) : (
            <div />
          )}

          <div
            className={`
              px-3
              py-1.5
              rounded-full
              text-xs
              font-semibold
              flex
              items-center
              gap-1
              ${
                status === "active"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }
            `}
          >
            <BadgeCheck size={12} />
            {status === "active" ? "Active" : "Inactive"}
          </div>
        </div>
      </div>

      {/* CONTENT */}

      <div className="p-5">
        {/* TITLE */}

        <h2
          className="
            text-[22px]
            font-bold
            text-gray-900
            leading-snug
            line-clamp-2
            min-h-[60px]
            group-hover:text-blue-600
            transition-colors
          "
        >
          {tour?.title}
        </h2>

        {/* PRICE SECTION */}

        <div className="mt-5">
          <div className="flex items-end gap-2 flex-wrap">
            <h3 className="text-2xl font-black text-gray-900 leading-none">
              {tour?.currency || "₹"}
              {startingPrice.toLocaleString("en-IN")}
            </h3>

            <span className="text-sm text-gray-500 font-medium mb-[2px]">
              {tour?.perText || "Per Person"}
            </span>
          </div>

          {/* ORIGINAL PRICE */}

          {originalPrice > 0 && (
            <div className="flex items-center gap-3 mt-2">
              <span className="text-sm text-gray-400 line-through font-medium">
                {tour?.currency || "₹"}
                {originalPrice.toLocaleString("en-IN")}
              </span>

              {discount > 0 && (
                <span
                  className="
                    bg-red-50
                    text-red-600
                    text-xs
                    font-bold
                    px-2.5
                    py-1
                    rounded-full
                  "
                >
                  {discount}% OFF
                </span>
              )}
            </div>
          )}
        </div>

        {/* INFO */}

        <div className="flex items-center justify-between mt-6">
          {/* DURATION */}

          <div className="flex items-center gap-3">
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-blue-50
                flex
                items-center
                justify-center
              "
            >
              <Clock3 size={18} className="text-blue-600" />
            </div>

            <div>
              <p className="text-xs text-gray-400">Duration</p>

              <p className="font-semibold text-gray-800 text-sm">
                {tour?.duration} Days
              </p>
            </div>
          </div>

          {/* RATING */}

          <div className="flex items-center gap-3">
            <div
              className="
                w-10
                h-10
                rounded-xl
                bg-yellow-50
                flex
                items-center
                justify-center
              "
            >
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
            </div>

            <div>
              <p className="text-xs text-gray-400">Rating</p>

              <p className="font-semibold text-gray-800 text-sm">
                {tour?.ratings}/5
              </p>
            </div>
          </div>
        </div>

        {/* BUTTON */}

        <Link href={`/packages/details/${tour?.packageId}`}>
          <button
            className="
              w-full
              h-12
              mt-6
              rounded-2xl
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              text-[15px]
              transition-all
              duration-300
              flex
              items-center
              justify-center
              gap-2
            "
          >
            View Details
            <ArrowRight size={18} />
          </button>
        </Link>
      </div>
    </div>
  );
}
