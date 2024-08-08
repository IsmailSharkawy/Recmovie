import PropTypes from "prop-types";

const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  onChange = () => {},
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {labelText || name}
      </label>
      {type === "checkbox" ? (
        <input
          type={type}
          id={name}
          name={name}
          className="mt-1"
          checked={Boolean(defaultValue)}
          value={Boolean(defaultValue)}
          onChange={(e) => onChange(e.target.checked)}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          defaultValue={defaultValue || ""}
          onChange={onChange}
          required
        />
      )}
    </div>
  );
};

FormRow.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  labelText: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func,
};

export default FormRow;
