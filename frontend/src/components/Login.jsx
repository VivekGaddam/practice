import React, { useState } from "react";
import { Link } from "react-router-dom";
import FloatingInput from "../assets/FloatingInput";

export default function Login() {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
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
    console.log("Login data:", formData, "Role:", role);
    // API login logic here
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <div className="space-y-2">
          <label className="text-sm text-gray-300">Choose role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none"
            required
          >
            <option value="" disabled>
              -- Select Role --
            </option>
            <option value="ngo">NGO</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        <FloatingInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <FloatingInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {role === "volunteer" && (
          <FloatingInput
            label="Organization Code"
            name="organizationCode"
            value={formData.organizationCode}
            onChange={handleChange}
            required
          />
        )}

        <button
          type="submit"
          disabled={!role}
          className={`w-full py-3 rounded font-semibold transition-all ${
            role === "ngo"
              ? "bg-blue-600 hover:bg-blue-700"
              : role === "volunteer"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          {role ? `Login as ${role === "ngo" ? "NGO" : "Volunteer"}` : "Select a role to login"}
        </button>

        <Link
          to={role ? `/register/${role}` : "#"}
          className={`text-sm ${
            role === "ngo"
              ? "text-blue-400"
              : role === "volunteer"
              ? "text-green-400"
              : "text-gray-400"
          } hover:underline block text-center mt-3`}
        >
          Not a user? Register here
        </Link>
      </form>
    </div>
  );
}

