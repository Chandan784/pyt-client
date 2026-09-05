const FormInput = ({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  min,
}) => {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-600">
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        value={value ?? ""}
        min={min}
        required={required}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="h-10 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
      />
    </div>
  );
};

export default FormInput;