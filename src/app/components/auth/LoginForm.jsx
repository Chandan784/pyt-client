"use client";

import { useState } from "react";
import AuthButton from "./AuthButton";
import PasswordInput from "./PasswordInput";
import AuthMessage from "./AuthMessage";

export default function LoginForm({
  onSignup,
  onForgotPassword,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
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

      localStorage.setItem("token", data.token);

      console.log("Login successful");

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
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Login to your account
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

        <PasswordInput
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <div className="text-right">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm font-medium hover:underline"
          >
            Forgot password?
          </button>
        </div>

        <AuthButton loading={loading}>
          Login
        </AuthButton>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <button
          onClick={onSignup}
          className="font-semibold text-black"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}