"use client";

import { useRef } from "react";

export default function OtpInput({ value, onChange }) {
  const inputRefs = useRef([]);

  const digits = value.padEnd(6, "").split("");

  function handleChange(index, inputValue) {
    const digit = inputValue.replace(/\D/g, "").slice(-1);

    const newOtp = digits.map((digit) => digit || "").join("").split("");

    newOtp[index] = digit;

    const result = newOtp.join("").slice(0, 6);

    onChange(result);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index, event) {
    if (
      event.key === "Backspace" &&
      !digits[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <input
          key={index}
          ref={(element) => {
            inputRefs.current[index] = element;
          }}
          value={digits[index] || ""}
          maxLength={1}
          inputMode="numeric"
          onChange={(e) =>
            handleChange(index, e.target.value)
          }
          onKeyDown={(e) =>
            handleKeyDown(index, e)
          }
          className="h-12 w-11 rounded-lg border border-gray-300
                     text-center text-xl font-semibold
                     outline-none focus:border-black"
        />
      ))}
    </div>
  );
}