import React, { useRef } from "react";

function Password({ className, password, setPassword, ...props }) {
    function handleChange(e) {
        setPassword(e.target.value);
    }

    return (
        <input
            type="password"
            className={`bg-gray-50 border border-gray-300 w-full h-11 mb-3 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none ${className}`}
            placeholder="Enter a todo"
            onChange={handleChange}
            value={password}
            required
            {...props}
        />
    );
}

export default Password;
