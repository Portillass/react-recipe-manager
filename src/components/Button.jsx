export function Button({ children, Onclick, className = "" }) {
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${className}`}
     onClick={Onclick}
    >
      {children}
    </button>
  );
}