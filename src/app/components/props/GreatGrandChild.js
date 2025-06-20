'use client';

export default function GreatGrandChild({ tempRise, onTempChange }) {
  return (
    <div
      className="p-6 rounded-lg bg-yellow-100 shadow-lg border-yellow-300
        hover:scale-[1.03] transition-transform duration-300 ease-in-out
        motion-reduce:transform-none"
    >
      <h4 className="font-bold mb-3 text-yellow-900 tracking-wide text-lg">
        🌡️ GreatGrandChild - Climate Alert
      </h4>
      <p className="mb-4 text-xl font-semibold text-yellow-800">
        Current Avg Global Temp Rise:{" "}
        <span className="text-yellow-900">{tempRise.toFixed(2)}°C</span>
      </p>
      <input
        type="number"
        step="0.01"
        min="0"
        value={tempRise}
        onChange={(e) => onTempChange(parseFloat(e.target.value) || 0)}
        className="w-full px-4 py-2 rounded border border-yellow-400
          focus:outline-none focus:ring-4 focus:ring-yellow-400
          placeholder-yellow-700 placeholder-opacity-70
          transition-shadow duration-300"
        placeholder="Update temperature..."
      />
      <p className="mt-3 italic text-yellow-900 font-semibold drop-shadow-sm">
        Immediate actions required to reduce emissions!
      </p>
    </div>
  );
}
