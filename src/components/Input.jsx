export function Input({ value, onChange, placeholder = "", className = "" }) {
  return (
    <input
      className={`border border-gray-300 rounded px-4 py-2 w-full ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}