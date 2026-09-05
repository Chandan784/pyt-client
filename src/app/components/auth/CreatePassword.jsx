"use client";

import { useState } from "react";
import PasswordInput from "./PasswordInput";
import AuthButton from "./AuthButton";
import AuthMessage from "./AuthMessage";

export default function CreatePassword({
  email,
  onComplete,
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (password.length < 8) {
      setError(
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup/create-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      onComplete();

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
          Create password
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Create a secure password for your account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <AuthMessage message={error} />

        <PasswordInput
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Create password"
        />

        <PasswordInput
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(e.target.value)
          }
          placeholder="Confirm password"
        />

        <AuthButton loading={loading}>
          Create account
        </AuthButton>
      </form>
    </div>
  );
}