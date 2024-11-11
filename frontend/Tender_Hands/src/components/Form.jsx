// src/components/Form.jsx
import React from 'react';

export const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  ...props
}) => {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`
          mt-1 block w-full rounded-md border-gray-300 shadow-sm
          focus:border-purple-500 focus:ring-purple-500 sm:text-sm
          ${error ? 'border-red-500' : ''}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

const Form = ({
  onSubmit,
  children,
  className = '',
  buttonText = 'Submit',
  isLoading = false,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
    >
      {children}
      <button
        type="submit"
        disabled={isLoading}
        className={`
          w-full py-2 px-4 border border-transparent rounded-md
          shadow-sm text-white bg-purple-600 hover:bg-purple-700
          focus:outline-none focus:ring-2 focus:ring-offset-2
          focus:ring-purple-500 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {isLoading ? 'Loading...' : buttonText}
      </button>
    </form>
  );
};

export default Form;
