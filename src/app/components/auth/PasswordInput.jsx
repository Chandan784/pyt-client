"use client";

import { useState } from "react";

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-4 py-3
                   outline-none focus:border-black"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2
                   text-sm text-gray-500"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
  );
}