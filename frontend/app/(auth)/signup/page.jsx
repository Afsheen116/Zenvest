"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Show Password State
  const [showPassword, setShowPassword] = useState(false);

  // Password Rules
  const passwordRules = {
    length: password.length >= 6,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const isPasswordValid =
    passwordRules.length &&
    passwordRules.uppercase &&
    passwordRules.lowercase &&
    passwordRules.number &&
    passwordRules.special;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword ||
      !gender
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (!isPasswordValid) {
      setError("Please create a stronger password.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSubmitting(true);

    try {
      await signup({
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword,
        gender,
      });

      router.push("/onboarding");
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

          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Create Account 🚀
          </h2>

          <p className="text-zv-gray-400 text-sm mt-1">
            Join Zenvest and take control of your finances
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="input-surface w-full px-4 py-2.5 rounded-xl"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-surface w-full px-4 py-2.5 rounded-xl"
          />

          {/* Password */}
          <div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Password"
              className="input-surface w-full px-4 py-2.5 rounded-xl"
            />

            {/* Show Password Checkbox */}
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

            {password.length > 0 && !isPasswordValid && (
              <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Password Requirements
                </p>

                <ul className="space-y-1 text-sm">

                  <li
                    className={`flex items-center gap-2 ${
                      passwordRules.length
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <span>{passwordRules.length ? "✔" : "●"}</span>
                    At least 6 characters
                  </li>

                  <li
                    className={`flex items-center gap-2 ${
                      passwordRules.uppercase
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <span>{passwordRules.uppercase ? "✔" : "●"}</span>
                    One uppercase letter
                  </li>

                  <li
                    className={`flex items-center gap-2 ${
                      passwordRules.lowercase
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <span>{passwordRules.lowercase ? "✔" : "●"}</span>
                    One lowercase letter
                  </li>

                  <li
                    className={`flex items-center gap-2 ${
                      passwordRules.number
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <span>{passwordRules.number ? "✔" : "●"}</span>
                    One number
                  </li>

                  <li
                    className={`flex items-center gap-2 ${
                      passwordRules.special
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <span>{passwordRules.special ? "✔" : "●"}</span>
                    One special character
                  </li>

                </ul>
              </div>
            )}
          </div>
                    {/* Confirm Password */}
          <div>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError("");
              }}
              placeholder="Confirm Password"
              className="input-surface w-full px-4 py-2.5 rounded-xl"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-500 font-medium">
              {error}
            </p>
          )}

          {/* Gender */}
          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender
            </label>

            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input-surface w-full px-4 py-2.5 rounded-xl bg-white"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 font-semibold text-white shadow-lg shadow-emerald-200 transition hover:-translate-y-0.5 disabled:opacity-50"
          >
            {submitting ? "Creating account..." : "Signup"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-zv-primary hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}