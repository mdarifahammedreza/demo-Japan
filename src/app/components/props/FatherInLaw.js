'use client';

export default function FatherInLaw({ seaLevel, onSeaLevelChange }) {
  return (
    <div
      className="p-8 rounded-lg bg-red-100 shadow-xl border-red-300
        hover:scale-[1.04] transition-transform duration-300 ease-in-out
        motion-reduce:transform-none flex flex-col justify-between"
    >
      <h2 className="font-bold mb-4 text-red-900 tracking-wide text-2xl">
        FatherInLaw - Sea Level Rise
      </h2>
      <p className="text-red-800 text-lg mb-6">
        Sea levels have risen by about{" "}
        <strong className="text-red-900">{seaLevel.toFixed(2)} cm</strong> since 1900.
      </p>
      <label className="block mb-3 font-semibold text-red-700 tracking-wide">
        Update Sea Level Rise:
      </label>
      <input
        type="number"
        step="0.01"
        min="0"
        value={seaLevel}
        onChange={(e) => onSeaLevelChange(parseFloat(e.target.value) || 0)}
        className="w-full px-4 py-2 rounded border border-red-400
          focus:outline-none focus:ring-4 focus:ring-red-400
          placeholder-red-700 placeholder-opacity-70
          transition-shadow duration-300"
        placeholder="Update sea level (cm)..."
      />
    </div>
  );
}
