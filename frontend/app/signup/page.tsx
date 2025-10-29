"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register/`, {
        username,
        password,
      });

      toast.success("Account created successfully! 🎉 Redirecting to login...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err: any) {
      console.error(err);
      setError("Signup failed. Try again.");
      toast.error("Signup failed. Please try again!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Create an account
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-800 text-sm font-semibold mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-800 text-sm font-semibold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-5">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}





