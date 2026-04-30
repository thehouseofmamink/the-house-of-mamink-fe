"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, Image, UserCircle, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="fixed top-0 left-0 w-full z-50">
                <nav className="w-full flex items-center justify-between bg-gradient-to-r from-amber-700 via-yellow-600 to-amber-700 text-white shadow-md px-6 md:px-12 py-4 backdrop-blur-md">

                    {/* Logo */}
                    <h1 className="text-lg md:text-xl font-bold tracking-wide text-yellow-100">
                        the house of mamink
                    </h1>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
                        <Link href="/" className={`flex items-center gap-2 transition-all duration-300 ${pathname === "/" ? "text-yellow-300" : "hover:text-yellow-200"}`}>
                            <Home size={18} /> Home
                        </Link>

                        <Link href="/activity" className={`flex items-center gap-2 transition-all duration-300 ${pathname === "/about" ? "text-yellow-300" : "hover:text-yellow-200"}`}>
                            <Info size={18} /> Activity
                        </Link>

                        <Link href="/gallery" className={`flex items-center gap-2 transition-all duration-300 ${pathname.startsWith("/gallery") ? "text-yellow-300" : "hover:text-yellow-200"}`}>
                            <Image size={18} /> Gallery
                        </Link>
                        
                        <Link href="/profile" className={`flex items-center gap-2 transition-all duration-300 ${pathname === "/profile" ? "text-yellow-300" : "hover:text-yellow-200"}`}>
                            <UserCircle size={18} /> Profile
                        </Link>
                    </div>

                    {/* Right */}
                    <div className="hidden md:flex items-center gap-2 text-sm">
                        <span>🇮🇩</span>
                        <span className="text-yellow-100">Indonesia</span>
                    </div>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden p-2"
                    >
                        {open ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </nav>
            </div>

            {open && (
                <div>
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                        onClick={() => setOpen(false)}
                    />

                    {/* Mobile Menu */}
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="fixed top-20 left-1/2 -translate-x-1/2 w-[70%] max-w-sm bg-amber-600 text-sm text-white z-50 p-6 rounded-2xl shadow-2xl space-y-6 transition-all duration-300"
                    >

                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold">The House Of Mamink</h2>
                        </div>

                        <div className="border-b border-yellow-300/40 mb-4"></div>

                        <Link href="/" onClick={() => setOpen(false)} className={`flex items-center gap-3 text-sm py-2 transition-all duration-300 ${pathname === "/" ? "text-yellow-200 font-semibold" : "hover:text-yellow-200"}`}>
                            <Home /> Home
                        </Link>

                        <Link href="/activity" onClick={() => setOpen(false)} className={`flex items-center gap-3 text-sm py-2 transition-all duration-300 ${pathname === "/about" ? "text-yellow-200 font-semibold" : "hover:text-yellow-200"}`}>
                            <Info /> Activity
                        </Link>

                        <Link href="/gallery" onClick={() => setOpen(false)} className={`flex items-center gap-3 text-sm py-2 transition-all duration-300 ${pathname.startsWith("/gallery") ? "text-yellow-200 font-semibold" : "hover:text-yellow-200"}`}>
                            <Image /> Gallery
                        </Link>

                        <Link href="/profile" onClick={() => setOpen(false)} className={`flex items-center gap-3 text-sm py-2 transition-all duration-300 ${pathname === "/profile" ? "text-yellow-200 font-semibold" : "hover:text-yellow-200"}`}>
                            <UserCircle /> Profile
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
