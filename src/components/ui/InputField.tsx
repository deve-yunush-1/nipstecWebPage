/** @format */

export function InputField({
  id,
  label,
  type = "text",
  value,
  onChange,
  className,
}: {
  id: any;
  label: any;
  type: any;
  value: any;
  onChange: any;
  className: any;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      />
    </div>
  );
}
