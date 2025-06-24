"use client";

import Image from "next/image";

export default function ImageView({ img }) {
  if (img === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-red-600 font-bold">Image Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-emerald-700 mb-4">{img.heading}</h1>

      <div className="relative w-[300px] h-[400px] sm:w-[400px] sm:h-[500px] border-2 border-emerald-500 rounded-xl shadow-lg overflow-hidden">
        <Image
          src={img.filename}
          alt={img.heading}
          fill
          className="object-cover"
        />
      </div>

      <p className="mt-6 text-gray-600 text-center max-w-xl">{img.summary}</p>
    </div>
  );
}
