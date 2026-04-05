"use client";

import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  phone: string;
  age: string;
  role: string;
  experience: string;
  availability: string;
  message: string;
};

const initialData: FormData = {
  name: "",
  email: "",
  phone: "",
  age: "",
  role: "",
  experience: "",
  availability: "",
  message: "",
};

export default function JoinForm() {
  const [form, setForm] = useState<FormData>(initialData);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [serverError, setServerError] = useState("");

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.role) newErrors.role = "Please select your playing role";
    if (!form.experience) newErrors.experience = "Please select your experience level";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setServerError("");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setSubmitted(true);
    } catch {
      setServerError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden text-center">
        <div className="h-1.5 bg-green-400" />
        <div className="p-12">
          <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center mx-auto mb-5 text-3xl">
            ✅
          </div>
          <h2 className="text-gray-900 text-2xl font-extrabold tracking-tight mb-3">Application Received!</h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm mx-auto">
            Thanks, <strong className="text-gray-900">{form.name}</strong>! We&apos;ve received your
            application and will be in touch at{" "}
            <strong className="text-gray-900">{form.email}</strong> within 48 hours.
          </p>
          <button
            onClick={() => { setForm(initialData); setSubmitted(false); }}
            className="mt-6 text-[#dc2626] text-sm font-semibold hover:text-[#b91c1c] transition-colors"
          >
            Submit another application →
          </button>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#dc2626] focus:bg-white transition-colors duration-150";
  const errorClass = "text-red-600 text-xs mt-1.5 flex items-center gap-1";
  const labelClass = "block text-gray-700 text-sm font-semibold mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
    >
      <div className="h-1 bg-[#dc2626]" />
      <div className="p-6 sm:p-8 space-y-5">
      <div>
        <p className="text-[#dc2626] text-xs font-bold uppercase tracking-widest mb-1">Application Form</p>
        <h2 className="text-gray-900 font-extrabold text-xl tracking-tight">Your Details</h2>
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className={labelClass}>
          Full Name <span className="text-[#dc2626]">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="e.g. Rahul Singh"
          value={form.name}
          onChange={handleChange}
          className={`${inputClass} ${errors.name ? "border-red-400" : ""}`}
        />
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-[#dc2626]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className={`${inputClass} ${errors.email ? "border-red-400" : ""}`}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+44 7700 900000"
            value={form.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      {/* Age + Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="age" className={labelClass}>
            Age
          </label>
          <input
            id="age"
            name="age"
            type="number"
            placeholder="e.g. 24"
            min="10"
            max="65"
            value={form.age}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="role" className={labelClass}>
            Playing Role <span className="text-[#dc2626]">*</span>
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className={`${inputClass} ${errors.role ? "border-red-400" : ""}`}
          >
            <option value="">Select role</option>
            <option value="opening-batsman">Opening Batsman</option>
            <option value="middle-order">Middle-Order Batsman</option>
            <option value="all-rounder">All-Rounder</option>
            <option value="fast-bowler">Fast Bowler</option>
            <option value="spin-bowler">Spin Bowler</option>
            <option value="wicket-keeper">Wicket-Keeper</option>
          </select>
          {errors.role && <p className={errorClass}>{errors.role}</p>}
        </div>
      </div>

      {/* Experience + Availability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="experience" className={labelClass}>
            Experience Level <span className="text-[#dc2626]">*</span>
          </label>
          <select
            id="experience"
            name="experience"
            value={form.experience}
            onChange={handleChange}
            className={`${inputClass} ${errors.experience ? "border-red-400" : ""}`}
          >
            <option value="">Select level</option>
            <option value="beginner">Beginner (just starting out)</option>
            <option value="intermediate">Intermediate (club level)</option>
            <option value="advanced">Advanced (competitive)</option>
            <option value="professional">Professional / Semi-pro</option>
          </select>
          {errors.experience && <p className={errorClass}>{errors.experience}</p>}
        </div>
        <div>
          <label htmlFor="availability" className={labelClass}>
            Availability
          </label>
          <select
            id="availability"
            name="availability"
            value={form.availability}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select availability</option>
            <option value="weekends">Weekends only</option>
            <option value="weekdays">Weekdays only</option>
            <option value="both">Weekdays &amp; weekends</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>
          Tell us about yourself
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Previous clubs, achievements, why you want to join Dcorp CC..."
          value={form.message}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
        />
      </div>

      {serverError && (
        <p className="text-red-600 text-sm text-center">{serverError}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#dc2626] hover:bg-[#b91c1c] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-150 text-sm shadow-md shadow-red-100 hover:-translate-y-0.5"
      >
        {loading ? "Submitting…" : "Submit Application"}
      </button>
      </div>
    </form>
  );
}
