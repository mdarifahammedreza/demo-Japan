'use client';

import GreatGrandChild from "./GreatGrandChild";

export default function GrandChild({ tempRise, onTempChange }) {
  return (
    <div
      className="p-6 rounded-lg bg-green-100 shadow-lg border-green-300
        hover:scale-[1.03] transition-transform duration-300 ease-in-out
        motion-reduce:transform-none"
    >
      <h3 className="font-bold mb-5 text-green-900 tracking-wide text-xl">
        GrandChild - Climate Summary
      </h3>
      <GreatGrandChild tempRise={tempRise} onTempChange={onTempChange} />
      <div className="mt-6">
        <label className="block mb-2 font-semibold text-green-700 tracking-wide">
          Update Temp Here Too:
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={tempRise}
          onChange={(e) => onTempChange(parseFloat(e.target.value) || 0)}
          className="w-full px-4 py-2 rounded border border-green-400
            focus:outline-none focus:ring-4 focus:ring-green-400
            placeholder-green-700 placeholder-opacity-70
            transition-shadow duration-300"
          placeholder="Update temperature..."
        />
      </div>
    </div>
  );
}
