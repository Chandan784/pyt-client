"use client";

import { useEffect, useState } from "react";

import OtpInput from "./OtpInput";
import AuthButton from "./AuthButton";
import AuthMessage from "./AuthMessage";

export default function OtpVerification({
    email,
    purpose = "SIGNUP",
    onVerified,
    onBack,
}) {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [timer, setTimer] = useState(60);

    // ==================================================
    // TIMER
    // ==================================================

    useEffect(() => {
        if (timer <= 0) {
            return;
        }

        const interval = setInterval(() => {
            setTimer((previous) => previous - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    // ==================================================
    // VERIFY OTP
    // ==================================================

    async function handleVerify(e) {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!email) {
            setError("Email is required.");
            return;
        }

        if (otp.length !== 6) {
            setError("Enter the complete 6-digit OTP.");
            return;
        }

        // ==================================================
        // PASSWORD RESET
        // ==================================================
        // IMPORTANT:
        // Do NOT call /reset-password/verify-otp
        //
        // The OTP will be verified together with the
        // new password in /api/auth/reset-password.
        // ==================================================

        if (purpose === "PASSWORD_RESET") {
            onVerified(otp);
            return;
        }

        // ==================================================
        // SIGNUP OTP
        // ==================================================

        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup/verify-otp`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        email,
                        otp,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                        "OTP verification failed."
                );
            }

            // For signup, backend has verified the OTP.
            onVerified(data);

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
    // RESEND OTP
    // ==================================================

    async function resendOtp() {
        if (timer > 0) {
            return;
        }

        try {
            setResending(true);
            setError("");
            setSuccess("");

            const endpoint =
                purpose === "SIGNUP"
                    ? "/api/auth/signup/send-otp"
                    : "/api/auth/forgot-password";

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
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
                throw new Error(
                    data.message ||
                        "Unable to send OTP."
                );
            }

            setTimer(60);
            setOtp("");
            setSuccess("OTP sent successfully.");

        } catch (error) {
            setError(
                error.message ||
                    "Something went wrong."
            );
        } finally {
            setResending(false);
        }
    }

    // ==================================================
    // UI
    // ==================================================

    return (
        <div>

            {/* HEADER */}

            <div className="mb-8 text-center">

                <h1 className="text-2xl font-bold">
                    Verify your email
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Enter the 6-digit code sent to
                </p>

                <p className="mt-1 font-medium">
                    {email}
                </p>

            </div>


            {/* FORM */}

            <form
                onSubmit={handleVerify}
                className="space-y-6"
            >

                <AuthMessage
                    message={error}
                />

                <AuthMessage
                    message={success}
                    type="success"
                />

                <OtpInput
                    value={otp}
                    onChange={setOtp}
                />

                <AuthButton
                    loading={loading}
                >
                    Verify OTP
                </AuthButton>

            </form>


            {/* RESEND OTP */}

            <div className="mt-6 text-center">

                {timer > 0 ? (

                    <p className="text-sm text-gray-500">
                        Resend OTP in {timer}s
                    </p>

                ) : (

                    <button
                        type="button"
                        onClick={resendOtp}
                        disabled={resending}
                        className="text-sm font-semibold"
                    >
                        {resending
                            ? "Sending..."
                            : "Resend OTP"}
                    </button>

                )}

            </div>


            {/* BACK */}

            <button
                type="button"
                onClick={onBack}
                className="mt-4 w-full text-sm text-gray-500"
            >
                ← Back
            </button>

        </div>
    );
}