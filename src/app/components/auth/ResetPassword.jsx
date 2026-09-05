"use client";

import { useState } from "react";

import PasswordInput from "./PasswordInput";
import AuthButton from "./AuthButton";
import AuthMessage from "./AuthMessage";

export default function ResetPassword({
  email,
  otp,
  onComplete,
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  // ==================================================
  // SUBMIT
  // ==================================================

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ==================================================
    // VALIDATION
    // ==================================================

    if (!email) {
      setError("Email is required.");
      return;
    }

    if (!otp) {
      setError("OTP is required.");
      return;
    }

    if (!password) {
      setError("Password is required.");
      return;
    }

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

    // ==================================================
    // API REQUEST
    // ==================================================

    try {
      setLoading(true);

      console.log("RESET DATA:", {
    email,
    otp,
    newPassword: password,
});

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email,
            otp: otp,
            newPassword: password,
          }),
        }
      );

      // ==================================================
      // RESPONSE
      // ==================================================

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Password reset failed."
        );
      }

      // ==================================================
      // SUCCESS
      // ==================================================

      setSuccess(
        "Password reset successfully."
      );

      setPassword("");
      setConfirmPassword("");

      // Go back to login
      setTimeout(() => {
        if (onComplete) {
          onComplete(data);
        }
      }, 800);

    } catch (error) {
      setError(
        error.message ||
        "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  // ==================================================
  // UI
  // ==================================================

  return (
    <div>
      {/* HEADER */}

      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          Reset password
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Create your new password.
        </p>
      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* ERROR */}

        <AuthMessage
          message={error}
        />

        {/* SUCCESS */}

        <AuthMessage
          message={success}
          type="success"
        />

        {/* NEW PASSWORD */}

        <PasswordInput
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="New password"
        />

        {/* CONFIRM PASSWORD */}

        <PasswordInput
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          placeholder="Confirm new password"
        />

        {/* SUBMIT */}

        <AuthButton loading={loading}>
          Reset password
        </AuthButton>
      </form>
    </div>
  );
}