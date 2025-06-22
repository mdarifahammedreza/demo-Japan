"use client";

import { useEffect, useState } from "react";

export default function ClimateReportsList() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch all reports
  useEffect(() => {
    async function fetchReports() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/climate-reports");
        if (!res.ok) throw new Error("Failed to fetch reports");
        const data = await res.json();
        setReports(data);
      } catch (err) {
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  // Delete report by id
  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this report?")) return;

    setDeletingId(id);
    try {
      const res = await fetch("/api/climate-reports", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");

      // Remove from state
      setReports((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) return <p className="text-teal-700 p-6">Loading reports...</p>;
  if (error) return <p className="text-red-600 p-6">Error: {error}</p>;

  return (
    <dev className="min-h-screen w-full bg-teal-50 flex flex-col items-center p-4 md:p-8 overflow-auto">
      <h2 className="text-4xl font-extrabold mb-8 text-teal-900 max-w-4xl w-full text-center">
        Climate Change Reports
      </h2>

      {reports.length === 0 && (
        <p className="text-teal-700 text-lg max-w-4xl w-full text-center">No reports found.</p>
      )}

      <ul className="space-y-6 max-w-4xl w-full">
        {reports.map((report) => (
          <li
            key={report._id}
            className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row justify-between items-start"
          >
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-teal-900">{report.title}</h3>
              <p className="text-teal-700 mt-1 mb-2">
                <strong>Region:</strong> {report.region} | <strong>Type:</strong> {report.type}
              </p>
              <p className="text-teal-700 mb-2">
                <strong>Temp Change:</strong> {report.temperatureChange}°C |{" "}
                <strong>CO₂ ppm:</strong> {report.co2ppm}
              </p>
              <p className="text-teal-700 mb-3">{report.description}</p>
              <p className="text-sm text-teal-600 italic">
                Date: {new Date(report.date).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(report._id)}
              disabled={deletingId === report._id}
              className="mt-4 md:mt-0 md:ml-6 px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition disabled:opacity-50 self-start"
              aria-label={`Delete report titled ${report.title}`}
            >
              {deletingId === report._id ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </dev>
  );
}
