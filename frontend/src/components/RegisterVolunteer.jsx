import React, { useState } from "react";
import FloatingInput from "../assets/FloatingInput"; // Adjust path if needed

export default function RegisterVolunteer() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    organizationCode: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Volunteer Registration Data:", formData);
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-white rounded-2xl shadow-xl w-full max-w-md px-8 py-10 space-y-5"
      >
        <h2 className="text-3xl font-extrabold text-center text-green-400">
          Volunteer Registration
        </h2>

        <FloatingInput label="Full Name" name="username" value={formData.username} onChange={handleChange} required />
        <FloatingInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
        <FloatingInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
        <FloatingInput label="Organization Code" name="organizationCode" value={formData.organizationCode} onChange={handleChange} required />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition duration-200 py-3 rounded-lg font-semibold"
        >
          Register as Volunteer
        </button>
      </form>
    </div>
  );
}
