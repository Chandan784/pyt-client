"use client";

import { useState } from "react";

import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import OtpVerification from "../components/auth/OtpVerification";
import CreatePassword from "../components/auth/CreatePassword";
import ForgotPassword from "../components/auth/ForgotPassword";
import ResetPassword from "../components/auth/ResetPassword";

export default function AuthPage() {
    const [screen, setScreen] = useState("login");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");

    // ======================================================
    // LOGIN
    // ======================================================

    if (screen === "login") {
        return (
            <AuthLayout>
                <LoginForm
                    onSignup={() => {
                        setScreen("signup");
                    }}
                    onForgotPassword={() => {
                        setScreen("forgot-password");
                    }}
                />
            </AuthLayout>
        );
    }

    // ======================================================
    // SIGNUP
    // ======================================================

    if (screen === "signup") {
        return (
            <AuthLayout>
                <SignupForm
                    onLogin={() => {
                        setScreen("login");
                    }}
                    onOtp={(userEmail) => {
                        setEmail(userEmail);
                        setOtp("");
                        setScreen("signup-otp");
                    }}
                />
            </AuthLayout>
        );
    }

    // ======================================================
    // SIGNUP OTP
    // ======================================================

    if (screen === "signup-otp") {
        return (
            <AuthLayout>
                <OtpVerification
                    email={email}
                    purpose="SIGNUP"
                    onVerified={() => {
                        setScreen("create-password");
                    }}
                    onBack={() => {
                        setScreen("signup");
                    }}
                />
            </AuthLayout>
        );
    }

    // ======================================================
    // CREATE PASSWORD
    // ======================================================

    if (screen === "create-password") {
        return (
            <AuthLayout>
                <CreatePassword
                    email={email}
                    onComplete={() => {
                        setEmail("");
                        setOtp("");
                        setScreen("login");
                    }}
                />
            </AuthLayout>
        );
    }

    // ======================================================
    // FORGOT PASSWORD
    // ======================================================

    if (screen === "forgot-password") {
        return (
            <AuthLayout>
                <ForgotPassword
                    onLogin={() => {
                        setScreen("login");
                    }}
                    onOtp={(userEmail) => {
                        setEmail(userEmail);
                        setOtp("");
                        setScreen("reset-otp");
                    }}
                />
            </AuthLayout>
        );
    }

    // ======================================================
    // RESET PASSWORD OTP
    // ======================================================

   if (screen === "reset-otp") {
    return (
        <AuthLayout>
            <OtpVerification
                email={email}
                purpose="PASSWORD_RESET"
                onVerified={(verifiedOtp) => {
                    setOtp(verifiedOtp);
                    setScreen("reset-password");
                }}
                onBack={() => {
                    setOtp("");
                    setScreen("forgot-password");
                }}
            />
        </AuthLayout>
    );
}
    // ======================================================
    // RESET PASSWORD
    // ======================================================

    if (screen === "reset-password") {
        return (
            <AuthLayout>
                <ResetPassword
                    email={email}
                    otp={otp}
                    onComplete={() => {
                        setEmail("");
                        setOtp("");
                        setScreen("login");
                    }}
                />
            </AuthLayout>
        );
    }

    // ======================================================
    // FALLBACK
    // ======================================================

    return null;
}