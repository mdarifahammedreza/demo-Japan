'use client';

import GrandChild from "./GrandChild";

export default function Child({ tempRise, onTempChange }) {
  return (
    <div
      className="p-8 rounded-lg bg-blue-100 shadow-xl border-blue-300
        hover:scale-[1.04] transition-transform duration-300 ease-in-out
        motion-reduce:transform-none"
    >
      <h2 className="font-bold mb-6 text-blue-900 tracking-wide text-2xl">
        Child - Regional Data
      </h2>
      <GrandChild tempRise={tempRise} onTempChange={onTempChange} />
      <div className="mt-8">
        <label className="block mb-2 font-semibold text-blue-700 tracking-wide">
          Update Temp Here Too:
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={tempRise}
          onChange={(e) => onTempChange(parseFloat(e.target.value) || 0)}
          className="w-full px-4 py-2 rounded border border-blue-400
            focus:outline-none focus:ring-4 focus:ring-blue-400
            placeholder-blue-700 placeholder-opacity-70
            transition-shadow duration-300"
          placeholder="Update temperature..."
        />
      </div>
    </div>
  );
}
