import React, { useState } from "react";
import FloatingInput from "../assets/FloatingInput"; // Update path as needed

export default function RegisterNgo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    website: "",
    contactPerson: "",
    phone: ""
  });
  const [successMessage, setSuccessMessage] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("NGO Registration Data:", formData);

    // Simulate success
    setSuccessMessage("✅ Successfully registered! Organization code sent via email.");
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 text-white rounded-2xl shadow-xl w-full max-w-xl px-8 py-10 space-y-5"
      >
        <h2 className="text-3xl font-extrabold text-center text-blue-400">NGO Registration</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingInput label="Organization Name" name="name" value={formData.name} onChange={handleChange} required />
          <FloatingInput label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <FloatingInput label="Password" name="password" type="password" value={formData.password} onChange={handleChange} required />
          <FloatingInput label="Website (optional)" name="website" value={formData.website} onChange={handleChange} />
          <FloatingInput label="Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleChange} />
          <FloatingInput label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 py-3 rounded-lg font-semibold mt-4"
        >
          Register NGO
        </button>

        {successMessage && (
          <p className="text-green-400 font-medium text-center mt-4">{successMessage}</p>
        )}
      </form>
    </div>
  );
}
