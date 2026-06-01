"use client";

import { useState } from "react";

import axios from "axios";

import { Mail, Lock, Loader2, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  /* =====================================================
      INPUT
  ===================================================== */

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  /* =====================================================
      LOGIN
  ===================================================== */

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");

    setError(false);

    try {
      setLoading(true);

      const res = await axios.post(
        "https://api.primevistajourney.com/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
      );

      console.log(res.data);

      /* ==========================================
          SUCCESS
      ========================================== */

      if (res.data?.success) {
        /* ADMIN CHECK */

        if (res.data.user?.type !== "admin") {
          setError(true);

          setMessage("Access denied. Admin only.");

          return;
        }

        /* SAVE */

        localStorage.setItem("admin_token", "loggedin");

        localStorage.setItem("admin_user", JSON.stringify(res.data.user));

        setError(false);

        setMessage("Login successful");

        /* REDIRECT */

        setTimeout(() => {
          window.location.href = "/admin";
        }, 1000);
      } else {
        setError(true);

        setMessage(res.data?.message || "Login failed");
      }
    } catch (err) {
      console.log(err);

      setError(true);

      setMessage(err?.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7fb] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[36px] shadow-2xl border border-gray-100 overflow-hidden">
        {/* =====================================================
            TOP
        ===================================================== */}

        <div className="bg-black px-8 py-10 text-white text-center">
          <div className="w-20 h-20 rounded-3xl bg-white text-black mx-auto flex items-center justify-center shadow-xl">
            <ShieldCheck size={38} />
          </div>

          <h1 className="text-4xl font-black mt-5">Admin Login</h1>

          <p className="text-gray-300 mt-2">Secure access to dashboard</p>
        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* MESSAGE */}

            {message && (
              <div
                className={`rounded-2xl px-4 py-4 text-sm font-semibold border
                ${
                  error
                    ? " bg-red-100 text-red-600 border-red-200"
                    : "bg-green-50 text-green-600 border-green-200"
                }
                `}
              >
                {message}
              </div>
            )}

            {/* EMAIL */}

            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Email Address
              </label>

              <div className="h-14 rounded-2xl border border-gray-200 px-4 flex items-center gap-3 focus-within:border-black transition-all">
                <Mail size={20} className="text-gray-500" />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="flex-1 bg-transparent outline-none text-gray-800"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Password
              </label>

              <div className="h-14 rounded-2xl border border-gray-200 px-4 flex items-center gap-3 focus-within:border-black transition-all">
                <Lock size={20} className="text-gray-500" />

                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="flex-1 bg-transparent outline-none text-gray-800"
                  required
                />
              </div>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className={`
                w-full
                min-h-[56px]
                rounded-2xl
                text-white
                font-black
                text-lg
                flex
                items-center
                justify-center
                gap-3
                transition-all
                duration-300
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-black hover:scale-[1.02]"
                }
              `}
            >
              {loading ? (
                <>
                  <Loader2 size={22} className="animate-spin" />
                  Please wait...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* FOOTER */}

          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-2xl p-4">
            <p className="font-bold text-gray-800 mb-2">Admin Access</p>

            <p className="text-sm text-gray-600">
              Only admin accounts can login here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
