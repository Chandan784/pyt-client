"use client";

import { useState } from "react";
import AuthButton from "./AuthButton";
import AuthMessage from "./AuthMessage";

export default function SignupForm({
  onOtp,
  onLogin,
}) {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup/send-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      onOtp(email);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Create account
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Enter your email to get started
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <AuthMessage message={error} />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full rounded-lg border border-gray-300
                     px-4 py-3 outline-none focus:border-black"
        />

        <AuthButton loading={loading}>
          Send OTP
        </AuthButton>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <button
          onClick={onLogin}
          className="font-semibold text-black"
        >
          Login
        </button>
      </p>
    </div>
  );
}