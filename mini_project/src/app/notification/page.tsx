"use client";

import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Loading from "../sign-up/loading";

export default function Notification() {
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [suitableGroup, setSuitableGroup] = useState(0);
  useEffect(() => {
    const storedData = localStorage.getItem("data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setSuitableGroup(parsedData.suitable_group);

      if (parsedData.similarity_scores) {
        localStorage.setItem(
          "similarityScores",
          JSON.stringify(parsedData.similarity_scores)
        );
      }
    } else {
      console.log("No data found.");
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFormSubmit = async (e: React.FormEvent, path: string) => {
    e.preventDefault();
    const storedData = localStorage.getItem("data");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setPending(true);
      console.log(parsedData);
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(parsedData),
        });
        const data = await res.json();
        console.log(data);
        setLoading(true);
        setPending(false);
        if(res.ok){
        setTimeout(() => {
          setLoading(false);
          window.location.href = path
        }, 15000);
        }else{
          setLoading(false);
          setPending(false);
        }
      } catch (error) {
        console.error("Error during signup:", error);
        setLoading(false);
      }
    } else {
      console.log("No data found in localStorage.");
    }
  };
  
  if (loading) {
    return <Loading />;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: 9999,
      }}
    >
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Confetti width={dimensions.width} height={dimensions.height} />
      )}
      <div className="flex flex-col items-center justify-center h-screen bg-white text-center">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-md py-8 px-8 mx-auto z-20">
          <div className="text-black text-2xl font-bold mb-4">Kết quả gợi ý</div>
          <p className="text-black text-lg font-normal mb-5">
            Bạn là người được chọn vào cụm{" "}
            <span className="font-bold">{suitableGroup}</span>! Hãy tiếp tục hành trình của bạn{" "}
          </p>
          <div className="flex flex-wrap gap-4 items-center justify-center">
            <form onSubmit={(e) => handleFormSubmit(e, "/sign-in")}>
              <Button type="submit" color="danger">
                Từ chối
              </Button>
            </form>
            <form onSubmit={(e) => handleFormSubmit(e, "/confirm")}>
              <Button type="submit" color="primary">
                Chấp nhận
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
