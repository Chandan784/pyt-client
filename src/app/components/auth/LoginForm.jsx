"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import AuthButton from "./AuthButton";
import PasswordInput from "./PasswordInput";
import AuthMessage from "./AuthMessage";
import { loginSuccess } from "@/store/slices/authSlice";

export default function LoginForm({
onSignup,
onForgotPassword,
}) {
const dispatch = useDispatch();
const router = useRouter();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

async function handleSubmit(e) {
e.preventDefault();
setError("");

const normalizedEmail = email.trim();

if (!normalizedEmail || !password) {
  setError("Email and password are required.");
  return;
}

try {
  setLoading(true);

  const API_URL = (
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api"
  ).replace(/\/+$/, "");

  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: normalizedEmail,
      password,
    }),
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(data.message || "Login failed.");
  }

  if (!data.token || !data.user) {
    throw new Error(
      "Login response is missing the user or authentication token."
    );
  }

  // Save authentication data.
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  // Update Redux authentication state.
  dispatch(
    loginSuccess({
      user: data.user,
      token: data.token,
    })
  );

  // Redirect after successful login.
  router.push("/");
} catch (err) {
  setError(
    err.message || "Unable to log in. Please try again."
  );
} finally {
  setLoading(false);
}


}

return ( <div> <div className="mb-8"> <h1 className="text-2xl font-bold">
Welcome back </h1>

    <p className="mt-2 text-sm text-gray-500">
      Login to your account
    </p>
  </div>

  <form onSubmit={handleSubmit} className="space-y-4">
    <AuthMessage message={error} />

    <input
      type="email"
      placeholder="Email address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      autoComplete="email"
      required
      className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
    />

    <PasswordInput
      value={password}
      onChange={(e) => setPassword(e.target.value)}
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
      type="button"
      onClick={onSignup}
      className="font-semibold text-black"
    >
      Sign up
    </button>
  </p>
</div>


);
}
