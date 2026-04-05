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
  const [errors, setErrors] = useState<Partial<FormData>>({});

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="bg-[#1a1a1a] border border-green-500/30 rounded-2xl p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-5 text-3xl">
          ✓
        </div>
        <h2 className="text-white text-2xl font-bold mb-3">Application Received!</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
          Thanks, <strong className="text-white">{form.name}</strong>! We&apos;ve received your
          application and will be in touch at <strong className="text-white">{form.email}</strong>{" "}
          within 48 hours.
        </p>
        <button
          onClick={() => {
            setForm(initialData);
            setSubmitted(false);
          }}
          className="mt-6 text-[#dc2626] text-sm hover:text-[#b91c1c] transition-colors"
        >
          Submit another application
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#dc2626] transition-colors";
  const errorClass = "text-red-400 text-xs mt-1";
  const labelClass = "block text-gray-300 text-sm font-medium mb-1.5";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 space-y-5"
    >
      <h2 className="text-white font-bold text-xl mb-2">Your Details</h2>

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
          className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
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
            className={`${inputClass} ${errors.email ? "border-red-500" : ""}`}
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
            className={`${inputClass} ${errors.role ? "border-red-500" : ""}`}
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
            className={`${inputClass} ${errors.experience ? "border-red-500" : ""}`}
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

      <button
        type="submit"
        className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold py-3.5 rounded-lg transition-colors text-sm"
      >
        Submit Application
      </button>
    </form>
  );
}
