"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";


export default function LoginPage() {
  const router = useRouter()
  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("api/users/login",user)
      console.log("Login is successful", response.data);
      toast.success("Successfully logged in")
      router.push("/profile")
    } catch (error: any) {
      console.log("Login failed",error.message);
      toast.error(error.message)
    } finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
      if(user.email.length>0 && user.password.length>0){
        setButtonDisabled(false)
      }
      else{
        setButtonDisabled(true)
      }
    },[user])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            {loading? "Processing":"Create Your Account"}
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={user.password}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <button
            onClick={onLogin}
            className="w-full rounded-lg bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700 active:scale-[0.98]"
          >
            {buttonDisabled?"Can't Login Yet":"Login"}
          </button>
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-purple-400 transition hover:text-purple-300"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}