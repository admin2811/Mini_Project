"use client"
import LogoIcon from "@/assets/logo.svg"
import MenuIcon from "@/assets/icon-menu.svg"
import Link from "next/link";
export const Header = () => {
  return <header className="py-4 border-b border-white/15 md:border-none">
    <div className = "container">
      <div className = "flex justify-between items-center md:border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto">
        <div className="border h-10 w-10 rounded-lg inline-flex justify-center items-center border-white/15">
          <LogoIcon className = "h-8 w-8" />
        </div>
        <div className="hidden md:block">
        <nav className = 'flex gap-8 text-sm'>
          <a href="#" className="text-white/70 hover:text-white transition">Feature</a>
          <a href="#" className="text-white/70 hover:text-white transition">Developer</a>
          <a href="#" className="text-white/70 hover:text-white transition">Pricing</a>
          <a href="#" className="text-white/70 hover:text-white transition">Changelog</a>
        </nav>
      </div>
      <div className="flex gap-4 items-center">
        <Link href = "/sign-in" className="text-white">Sign In</Link>
        <Link href="/sign-up" className="relative border py-2 px-3 rounded-lg font-medium text-sm bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff]"
        >
          <div className = "absolute inset-0">
            <div className="rounded-lg border border-white/20 absolute inset-0 [mask-image:liner-gradient(to_bottom,black,transparent)]"></div>
            <div className = "rounded-lg border absolute inset-0 border-white/40 [mask-image:liner-gradient(to_top,black,transparent)]"></div>
            <div className="absolute inset-0 shadow-[0_0_10px_rgb(140,69,255,.7)_inset] rounded-lg"></div>
          </div>
          <span className="text-white">Sign Up</span>
        </Link>
        <MenuIcon className = "md:hidden"/>
      </div>
      </div>

    </div>
  </header>;
};
