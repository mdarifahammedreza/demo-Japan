'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function ImgCarousel() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [images, setImages] = useState([]);
  const intervalRef = useRef(null);

  // Fetch image data from JSON
  useEffect(() => {
    fetch("/Data/Image/Curosol/image.json")
      .then((res) => res.json())
      .then((data) => setImages(data))
      .catch((err) => console.error("Error fetching images:", err));
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isPaused && images.length > 0) {
      intervalRef.current = setInterval(() => {
        setActive((prev) => (prev + 1) % images.length);
      }, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, images]);

  const next = () => setActive((prev) => (prev + 1) % images.length);
  const prev = () => setActive((prev) => (prev - 1 + images.length) % images.length);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-10 px-4 sm:px-6 md:px-8 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-48 md:w-72 h-48 md:h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-48 md:w-72 h-48 md:h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-48 md:w-72 h-48 md:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Carousel + Text */}
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-7xl flex flex-col items-center"
      >
        {/* Carousel */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
          <button
            onClick={prev}
            className="absolute left-2 sm:left-4 z-30 bg-gray-800 text-white rounded-full p-2 shadow hover:bg-black transition"
          >
            &lt;
          </button>

          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            {images.map((img, index) => {
              const offset = index - active;
              let className = "absolute transition-all duration-700 ease-in-out";

              if (offset === 0) {
                className += " scale-100 opacity-100 z-20";
              } else if (
                offset === -1 || (index === images.length - 1 && active === 0)
              ) {
                className +=
                  " scale-75 -translate-x-[250px] opacity-60 z-10 rounded hidden lg:block";
              } else if (
                offset === 1 || (index === 0 && active === images.length - 1)
              ) {
                className +=
                  " scale-75 translate-x-[250px] rounded opacity-60 z-10 hidden lg:block";
              } else {
                className += " scale-50 opacity-0";
              }

              return (
                <div key={img.id} className={className}>
                  <div className="relative w-[220px] sm:w-[300px] lg:w-[400px] h-[300px] sm:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-xl border-2 border-teal-500">
                    <Link href={`/event/${img.id}`}>
                      <Image
                        src={img.filename}
                        alt={`Slide ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === active}
                      />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={next}
            className="absolute right-2 sm:right-4 z-30 bg-gray-800 text-white rounded-full p-2 shadow hover:bg-black transition"
          >
            &gt;
          </button>
        </div>

        {/* Text under carousel */}
        {images[active] && (
          <div className="mt-10 max-w-2xl text-center space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">
              {images[active].heading}
            </h1>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {images[active].summary}
            </p>
          </div>
        )}
      </div>

      {/* CSS blob animation */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}
