// src/app/dangky/loading.tsx
"use client"
import React from "react";
import LoadingSpinner from "@/components/Loading";
import { useRouter } from "next/navigation";
export default function Loading() {
  const router = useRouter();
  setTimeout(() => {
    router.push("/notification");
  }, 10000);
    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <LoadingSpinner />
      </div>
    );
  }
  