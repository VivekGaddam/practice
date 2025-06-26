// components/FloatingInput.jsx
export default function FloatingInput({ label, type = "text", name, value, onChange, required = false }) {
  return (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="peer h-12 w-full rounded-lg bg-gray-700 text-white px-3 pt-5 pb-2 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder={label}
      />
      <label
        htmlFor={name}
        className="absolute left-3 top-2 text-gray-400 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm peer-focus:text-green-400"
      >
        {label}
      </label>
    </div>
  );
}
