"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setSubmitting(true);

    try {
      await login({
        email: email.trim(),
        password,
      });

      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center px-4 py-6 sm:py-10">
      <div className="soft-card-strong w-full max-w-md rounded-[28px] p-6 sm:p-10">
        <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
          <div className="mb-3 rounded-2xl bg-gradient-to-br from-violet-500 to-sky-500 p-3 shadow-lg shadow-violet-200">
            <Image
              src="/symbol.jpeg"
              alt="Zenvest Logo"
              width={64}
              height={64}
              className="rounded-2xl"
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold zv-gradient-text">
            Zenvest
          </h1>

          <p className="text-zv-gray-400 text-sm mt-1">
            Your calm, smart finance companion
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input-surface w-full px-4 py-2.5 rounded-xl"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>

            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter your password"
              className="input-surface w-full px-4 py-2.5 rounded-xl"
            />

            <div className="mt-2 flex items-center gap-2">
              <input
                id="showPassword"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="h-4 w-4 cursor-pointer"
              />
              <label
                htmlFor="showPassword"
                className="text-sm text-gray-600 cursor-pointer"
              >
                Show Password
              </label>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl zv-gradient py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            {submitting ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-zv-primary hover:underline"
          >
            Sign Up
          </Link>
        </p>

        <p className="mt-6 text-center text-xs text-zv-gray-400">
          Secure. Smart. Simple.
        </p>
      </div>
    </div>
  );
}