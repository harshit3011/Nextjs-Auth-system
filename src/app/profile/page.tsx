"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout failed", error.message);
      toast.error(error.message || "Logout failed");
    }
  };

  const handleData = async () => {
    try {
      const user = await axios.get("/api/users/data");
      const userData = user?.data?.data || {};

      setUserName(userData.username || "");
      setEmail(userData.email || "");

      toast.success("Data Fetched successfully");
      console.log("Data fetched successfully");

    } catch (error: any) {
      console.log("Data fetch failed", error.message);
      toast.error(error.message || "Fetch failed");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1>Profile</h1>
      <hr />
      <p className="mb-4">Profile Page</p>

      <div className="mb-4 flex w-full max-w-sm flex-col gap-3">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
          className="rounded border border-gray-300 px-3 py-2"
        />

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <button
        className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
        onClick={handleData}
      >
        Get data
      </button>
      <button
        onClick={handleLogout}
        className="mt-4 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}