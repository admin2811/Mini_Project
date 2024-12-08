"use client";
import { AnimatePresence, motion } from "framer-motion";
import { FiAlertCircle } from "react-icons/fi";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const ExampleWrapper = () => {
  const router = useRouter();
  const [newStoreData, setNewStoreData] = useState({
    name: "",
    email: "",
    msv: "",
    password: "",
    compatibility: 0,
    group: "",
  });

  const handleClick = async () => {
    const storeData = localStorage.getItem("data");

    if (storeData) {
      const parseData = JSON.parse(storeData);
      setNewStoreData({
        name: parseData.name,
        email: parseData.email,
        msv: parseData.msv,
        password: parseData.password,
        compatibility: parseData.highest_similarity_score,
        group: parseData.suitable_group,
      });

      try {
        const response = await fetch("/api/saveGroup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: parseData.name,
            email: parseData.email,
            msv: parseData.msv,
            compatibility: parseData.highest_similarity_score,
            group: parseData.suitable_group,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Group saved:", data);

          // Tự động đăng nhập
          await handleSignIn(parseData.email, parseData.password);
        } else {
          console.error("Error saving group:", response.statusText);
        }
      } catch (error) {
        console.error("Error joining group:", error);
      }
    }
  };

  interface StoreData {
    name: string;
    email: string;
    msv: string;
    password: string;
    highest_similarity_score: number;
    suitable_group: string;
  }

  interface SignInResponse {
    ok: boolean;
    error: string | null;
  }

  interface CheckGroupResponse {
    exists: boolean;
    name: string;
    group: string;
  }

  const handleSignIn = async (email: string, password: string): Promise<void> => {
    const res: SignInResponse | undefined = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.ok) {
      console.log("Signed in successfully!");
      const checkGroupRes = await fetch(`/api/check-group?email=${email}`);
      const data: CheckGroupResponse = await checkGroupRes.json();

      if (data.exists) {
        console.log("User:", data.name, "Group:", data.group);
        router.replace(`/dashboard/${data.group}`);
      } else {
        router.replace("/admin");
      }
    } else {
      console.error("Sign-in failed:", res?.error);
    }
  };

  const handleGoBack = () => {
    router.push("/sign-in");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
      >
        <motion.div
          initial={{ scale: 0, rotate: "12.5deg" }}
          animate={{ scale: 1, rotate: "0deg" }}
          exit={{ scale: 0, rotate: "0deg" }}
          onClick={(e) => e.stopPropagation()}
          className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
        >
          <FiAlertCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
          <div className="relative z-10">
            <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
              <FiAlertCircle />
            </div>
            <h3 className="text-3xl font-bold text-center mb-2">
              Bạn có chắc đã muốn chọn vào nhóm chưa?
            </h3>
            <p className="text-center mb-6">
              Đây là giai đoạn khởi đầu cho cuộc hành trình gian nan của bạn
            </p>
            <div className="flex gap-2">
              <button
                className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                onClick={handleGoBack}
              >
                Nah, go back
              </button>
              <button
                className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                onClick={handleClick}
              >
                Understood!
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ExampleWrapper;
