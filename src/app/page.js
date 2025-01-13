"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ComingSoon() {
  const router = useRouter();
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/70" /> {/* Dark overlay */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <div className="space-y-8">
          {/* Logo or Brand Icon */}
          <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Something Amazing is Coming Soon
            </h1>
            <p className="text-lg md:text-xl text-gray-200 drop-shadow">
              We're working hard to bring you something extraordinary. Stay tuned!
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12 flex gap-2">
            <h1
              className="px-6 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 flex-grow font-bold"
            >
              Already Signed Up  Account?
            </h1>
            <button
              onClick={()=>{router.push('/hotel/login')}}
              className="px-6 py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Start Working
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
