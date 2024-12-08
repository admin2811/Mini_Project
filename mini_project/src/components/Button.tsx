"use client";

import React from "react";
import { useRouter } from "next/navigation";

type ButtonProps = {
  label?: string; // Nếu bạn muốn chỉ dùng children thì label là không bắt buộc
  href: string; // Đường dẫn cần chuyển hướng
};

export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  label,
  href,
  children,
}) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)} // Điều hướng khi click
      className="relative border py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff]"
    >
      {/* Hiệu ứng nền */}
      <div className="absolute inset-0">
        <div className="rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        <div className="rounded-lg border absolute inset-0 border-white/40 [mask-image:linear-gradient(to_top,black,transparent)]"></div>
        <div className="absolute inset-0 shadow-[0_0_10px_rgb(140,69,255,.7)_inset] rounded-lg"></div>
      </div>
      {/* Hiển thị nội dung nút */}
      <span>{label || children}</span>
    </button>
  );
};
