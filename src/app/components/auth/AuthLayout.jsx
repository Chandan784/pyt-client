"use client";

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {children}
        </div>
      </div>
    </main>
  );
}