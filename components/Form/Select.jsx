import React, { useRef } from "react";

function Select({
    className,
    options = [],
    defaultValue,
    select,
    setSelect,
    ...props
}) {
    function handleChange(e) {
        setSelect(e.target.value);
    }

    return (
        <select
            name="priority"
            id="priority"
            className={`bg-gray-50 border border-gray-300 text-gray-900 h-11 w-full mb-3 text-sm rounded-lg block w-full p-2.5 focus:outline-none ${className}`}
            value={select}
            onChange={handleChange}
            {...props}
        >
            {options.map((option, index) => {
                return (
                    <option key={index} value={option.value}>
                        {option.text}
                    </option>
                );
            })}
        </select>
    );
}

export default Select;
