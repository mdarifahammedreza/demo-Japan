"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClimateReportsPage() {
  // Form state
  const [form, setForm] = useState({
    title: "",
    region: "",
    type: "",
    temperatureChange: "",
    co2ppm: "",
    description: "",
    date: "",
  });

  const [loadingForm, setLoadingForm] = useState(false);

  // Reports state
  const [reports, setReports] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch reports
  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    setLoadingList(true);
    setError(null);
    try {
      const res = await fetch("/api/climate-reports");
      if (!res.ok) throw new Error("Failed to fetch reports");
      const data = await res.json();
      setReports(data);
    } catch (err) {
      setError(err.message || "Error loading reports");
    } finally {
      setLoadingList(false);
    }
  }

  // Form handlers
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoadingForm(true);

    try {
      const res = await fetch("/api/climate-reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          temperatureChange: parseFloat(form.temperatureChange),
          co2ppm: parseInt(form.co2ppm),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Report submitted successfully!");
        setForm({
          title: "",
          region: "",
          type: "",
          temperatureChange: "",
          co2ppm: "",
          description: "",
          date: "",
        });
        fetchReports(); // Refresh list after new submit
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Network error.");
    } finally {
      setLoadingForm(false);
    }
  }

  // Delete handler
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

      setReports((prev) => prev.filter((r) => r._id !== id));
      toast.success("Report deleted successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <main className="min-h-screen w-full bg-emerald-50 p-4 md:p-10 flex flex-col md:flex-row md:items-start md:justify-center gap-8">
        {/* Submission form */}
        <section className="w-full max-w-md bg-white p-6 rounded-md shadow-md flex-shrink-0">
          <h2 className="text-2xl font-semibold mb-6 text-emerald-800 text-center">
            Submit Climate Report
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
            <Input label="Region" name="region" value={form.region} onChange={handleChange} required />
            <Input label="Type" name="type" value={form.type} onChange={handleChange} required />
            <Input
              label="Temperature Change (°C)"
              name="temperatureChange"
              type="number"
              step="0.1"
              value={form.temperatureChange}
              onChange={handleChange}
              required
            />
            <Input
              label="CO₂ ppm"
              name="co2ppm"
              type="number"
              value={form.co2ppm}
              onChange={handleChange}
              required
            />
            <Textarea label="Description" name="description" value={form.description} onChange={handleChange} required />
            <Input label="Date" name="date" type="date" value={form.date} onChange={handleChange} required />

            <button
              type="submit"
              disabled={loadingForm}
              className="w-full py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
            >
              {loadingForm ? "Submitting..." : "Submit Report"}
            </button>
          </form>
        </section>

        {/* Reports list */}
        <section className="w-full max-w-4xl bg-white p-6 rounded-md shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-emerald-800 text-center">Climate Change Reports</h2>

          {loadingList && <p className="text-emerald-700 text-center">Loading reports...</p>}
          {error && <p className="text-red-600 text-center">Error: {error}</p>}
          {!loadingList && reports.length === 0 && (
            <p className="text-emerald-700 text-center">No reports found.</p>
          )}

          <ul className="space-y-6">
            {reports.map((report) => (
              <li
                key={report._id}
                className="bg-emerald-50 p-4 rounded-md shadow flex flex-col md:flex-row justify-between items-start"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-emerald-900">{report.title}</h3>
                  <p className="text-emerald-700 mt-1 mb-2">
                    <strong>Region:</strong> {report.region} | <strong>Type:</strong> {report.type}
                  </p>
                  <p className="text-emerald-700 mb-2">
                    <strong>Temp Change:</strong> {report.temperatureChange}°C |{" "}
                    <strong>CO₂ ppm:</strong> {report.co2ppm}
                  </p>
                  <p className="text-emerald-700 mb-3">{report.description}</p>
                  <p className="text-sm text-emerald-600 italic">
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
        </section>
      </main>
    </>
  );
}

function Input({ label, name, type = "text", value, onChange, required }) {
  return (
    <label className="block">
      <span className="text-emerald-700 font-medium">{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full rounded-md border border-emerald-300 bg-white px-3 py-2 shadow-sm placeholder-emerald-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
      />
    </label>
  );
}

function Textarea({ label, name, value, onChange, required }) {
  return (
    <label className="block">
      <span className="text-emerald-700 font-medium">{label}</span>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={4}
        className="mt-1 block w-full rounded-md border border-emerald-300 bg-white px-3 py-2 shadow-sm placeholder-emerald-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
      />
    </label>
  );
}
