import React, { useState, forwardRef, useImperativeHandle } from "react";

const PasswordInput = forwardRef(
  ({ label, placeholder, validateRegex = false }, ref) => {
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
      const value = e.target.value;
      setPassword(value);

      if (validateRegex) {
        const regex =
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()-_=+{};:,<.>?]).{10,255}$/;
        setIsValid(regex.test(value));
      }
    };

    useImperativeHandle(ref, () => ({
      getValue: () => password,
    }));

    return (
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 font-bold mb-2"
        >
          {label}
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className={`w-full rounded-md p-2 pr-7 border ${
              !isValid ? "border-red-500" : "border-gray-400"
            } focus:outline-none focus:border-indigo-500`}
            placeholder={placeholder}
            value={password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="absolute top-1/2 transform -translate-y-1/2 right-0 p-1 rounded focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "🙉" : "🙈"}
          </button>
        </div>
        {!isValid && (
          <p className="text-red-500 text-sm mt-1">
            Password should contain at least one uppercase letter, one lowercase
            letter, one number, one special character, and be between 10 and 255
            characters long.
          </p>
        )}
      </div>
    );
  }
);

export default PasswordInput;
