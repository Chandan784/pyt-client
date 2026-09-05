"use client";

export default function AuthMessage({
  message,
  type = "error",
}) {
  if (!message) return null;

  return (
    <div>
      {message}
    </div>
  );
}