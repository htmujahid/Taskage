import React, { useEffect, useRef } from "react";

function Date({ className, date, setDate, ...props }) {
    const dateInput = useRef(null);
    function handleChange(e) {
        setDate(e.target.value);
    }

    return (
        <input
            type="text"
            id="date"
            className={`bg-gray-50 border border-gray-300 w-full h-11 text-gray-900 mb-3 text-sm rounded-lg block p-2.5 focus:outline-none ${className}`}
            placeholder="Date"
            ref={dateInput}
            onFocus={() => (dateInput.current.type = "date")}
            onBlur={() => (dateInput.current.type = "text")}
            value={date}
            onChange={handleChange}
            {...props}
        />
    );
}

export default Date;
