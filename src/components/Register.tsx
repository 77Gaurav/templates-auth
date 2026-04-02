// src/components/Register.tsx
import React, { useState } from "react";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom"; // Link is better than <a>
import { validateEmail, validatePassword } from "../utils/authvalidation";
import type { AuthErrors } from "../utils/authvalidation";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<AuthErrors>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: AuthErrors = {};

    // 1. Validation Checks
    if (!validateEmail(email))
      newErrors.email = "Please enter a valid email address.";
    if (!validatePassword(password))
      newErrors.password = "Password must be at least 6 characters.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // Stop execution if there are errors
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/welcome");
    } catch (error: any) {
      // Mapping Firebase errors to our UI
      setErrors({ general: error.message });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-50 p-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl flex flex-col gap-5"
      >
        <h2 className="text-4xl font-[inter] font-bold text-slate-800">
          Register
        </h2>

        {errors.general && (
          <p className="text-red-500 text-sm bg-red-50 p-2 rounded">
            {errors.general}
          </p>
        )}

        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email Address"
            className={`border-2 p-3 rounded-xl outline-none transition-all ${
              errors.email
                ? "border-red-400"
                : "border-slate-200 focus:border-blue-400"
            }`}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined })); // Clear error as user types
            }}
          />
          {errors.email && (
            <span className="text-red-500 text-xs px-1">{errors.email}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-slate-500 ml-1">
            Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`w-full border-2 p-3 pr-12 rounded-xl outline-none transition-all ${
                errors.password
                  ? "border-red-400"
                  : "border-slate-200 focus:border-blue-400"
              }`}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
            />

            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer p-1"
            >
              {showPassword ? (
                // Eye Slashed (Hide)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                // Eye Open (Show)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.644C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          </div>

          {errors.password && (
            <span className="text-red-500 text-xs px-1">{errors.password}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all cursor-pointer"
        >
          CREATE ACCOUNT
        </button>

        <p className="text-center text-slate-600 mt-2">
          Already have an account?{" "}
          <Link
            to="/auth/signin"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign In instead
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
