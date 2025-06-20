"use client";

import Private from "@/app/components/Private/private";
import Image from "next/image";
import { use, useEffect, useState } from "react"; // required to unwrap async params

export default function Page(asyncParams) {
  const { id } = use(asyncParams.params); // ✅ unwrap the async `params`

  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/Data/Image/Curosol/image.json", {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch image data");

        const images = await res.json();
        const matched = images.find((item) => item.id.toString() === id);
        setImg(matched || null);
      } catch (err) {
        console.error("Error loading image:", err);
        setImg(null);
      }
    };

    fetchData();
  }, [id]);

  if (img === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-red-600 font-bold">Image Not Found</h1>
      </div>
    );
  }

  return (
    <Private>
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-emerald-700 mb-4">{img.heading}</h1>

        <div className="relative w-[300px] h-[400px] sm:w-[400px] sm:h-[500px] border-2 border-teal-500 rounded-xl shadow-lg overflow-hidden">
          <Image
            src={img.filename}
            alt={img.heading}
            fill
            className="object-cover"
          />
        </div>

        <p className="mt-6 text-gray-600 text-center max-w-xl">{img.summary}</p>
      </div>
    </Private>
  );
}
