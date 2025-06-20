'use client';
import { useState } from "react";
import Child from "../components/props/Child";
import FatherInLaw from "../components/props/FatherInLaw";

export default function Page() {
  const [tempRise, setTempRise] = useState(1.2);
  const [seaLevel, setSeaLevel] = useState(20.0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 font-sans p-10">
      <h1
        className="text-4xl font-extrabold text-gray-900 mb-12 text-center
          tracking-wide drop-shadow-md"
      >
        Climate Change Dashboard 🌍
      </h1>

      <div
        className="grid grid-cols-1 md:grid-cols-4 gap-10 max-w-7xl mx-auto
          items-start"
      >
        {/* Left side: main family chain */}
        <section className="md:col-span-3 bg-white rounded-2xl shadow-2xl p-8">
          <Child tempRise={tempRise} onTempChange={setTempRise} />
        </section>

        {/* Right side: sibling */}
        <aside className="bg-white rounded-2xl shadow-2xl p-8">
          <FatherInLaw seaLevel={seaLevel} onSeaLevelChange={setSeaLevel} />
        </aside>
      </div>
    </main>
  );
}
