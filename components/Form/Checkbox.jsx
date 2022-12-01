import React from "react";

function Checkbox({ className, label, check, setCheck, ...props }) {
    function handleChange(e) {
        setCheck((prev) => !prev);
    }

    return (
        <label className="text-sm font-medium text-gray-900 w-full flex items-center block">
            <input
                type="checkbox"
                className={`w-4 h-4 border border-gray-300 rounded mr-2 bg-gray-50 focus:outline-none ${className}`}
                checked={check}
                onChange={handleChange}
                {...props}
            />
            {label}
        </label>
    );
}

export default Checkbox;
