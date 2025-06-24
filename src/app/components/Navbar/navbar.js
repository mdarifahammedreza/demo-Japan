"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [hide, ishide] = useState('block');
  const sidebarRef = useRef(null); // ✅ Removed <HTMLDivElement>

  // Detect outside click to close sidebar
  useEffect(() => {
    if(isOpen)
        ishide('hidden');
    else
        ishide('block');
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      html.setAttribute("data-theme", savedTheme);
      setIsDark(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      html.setAttribute("data-theme", prefersDark ? "dark" : "light");
      setIsDark(prefersDark);
    }
  }, []);

  // Toggle light/dark theme
  const toggleDarkMode = () => {
    const html = document.documentElement;
    const newTheme = isDark ? "light" : "dark";
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setIsDark(!isDark);
  };

  const handleLinkClick = () => setIsOpen(false);
 
  return (
    <div>
      {/* Top bar with toggle buttons */}
      
       <section className="flex  items-center w-full bg-emerald-950 p-2 text-2xl    text-white dark:text-gray-100 fixed top-0 z-[100]">
       <button
  onClick={() => setIsOpen(!isOpen)}
  aria-label="Toggle sidebar"
  className={`text-2xl p-2 bg-green-950  rounded text-white dark:text-gray-100 z-[100] ${hide}`}
>
  ☰
</button>
<h1 className="text-2xl font-bold">ModernSite</h1>
       </section>

      

      {/* Sidebar drawer */}
      <nav
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-emerald-950 border-r border-emerald-500 shadow-lg p-4 flex flex-col gap-4 transition-transform duration-300 ease-in-out z-[999] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className=" text-gray-100 text-xl font-semibold mb-4">
          Navigation
        </h2>
        <Link
          href="/"
          onClick={handleLinkClick}
          className="rounded-md px-4 py-2 hover:bg-emerald-800 text-gray-100 transition-colors"
        >
          Home
        </Link>
        <Link
          href="/about"
          onClick={handleLinkClick}
          className="rounded-md px-4 py-2  hover:bg-emerald-800 text-gray-100 transition-colors"
        >
          About
        </Link>
        <Link
          href="/contact"
          onClick={handleLinkClick}
          className="rounded-md px-4 py-2 hover:bg-emerald-800 text-gray-100 transition-colors"
        >
          Contact
        </Link>
        <Link
          href="/props"
          onClick={handleLinkClick}
          className="rounded-md px-4 py-2 hover:bg-emerald-800 text-gray-100 transition-colors"
        >
          Props
        </Link>
        <Link
          href="/climate"
          onClick={handleLinkClick}
          className="rounded-md px-4 py-2 hover:bg-emerald-800 text-gray-100 transition-colors"
        >
          climate
        </Link>
        <Link
          href="/climate/info"
          onClick={handleLinkClick}
          className="rounded-md px-4 py-2 hover:bg-emerald-800 text-gray-100 transition-colors"
        >
          climate info
        </Link>
      </nav>

      {/* Overlay backdrop */}
      {isOpen && (
        <div
  onClick={() => setIsOpen(false)}
  className="fixed inset-0 bg-transparent bg-opacity-10 backdrop-blur-sm z-[998] cursor-pointer"
/>

      )}
    </div>
  );
}
