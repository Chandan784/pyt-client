"use client";

export default function AuthButton({
  children,
  loading = false,
  type = "submit",
}) {
  return (
    <button
      type={type}
      disabled={loading}
      className="w-full rounded-lg bg-black px-4 py-3 text-white font-medium
                 hover:bg-gray-800 transition disabled:opacity-50
                 disabled:cursor-not-allowed"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}