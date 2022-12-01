import React, { useEffect, useRef, useState } from "react";

function Input({ className, text, setText, error, setError, ...props }) {
    const inputRef = useRef();

    useEffect(() => {
        if (error) {
            inputRef.current.classList.add("border-red-500");
            inputRef.current.classList.add("bg-red-200");
            setTimeout(() => {
                inputRef.current.classList.remove("border-red-500");
                inputRef.current.classList.remove("bg-red-200");
            }, 3000);
        }
    }, [error]);

    function handleChange(e) {
        setText(e.target.value);
    }

    return (
        <input
            type="text"
            id="todo"
            className={`bg-gray-50 border border-gray-300 w-full h-11 mb-3 text-gray-900 text-sm rounded-lg block p-2.5 focus:outline-none ${className}`}
            placeholder="Enter a todo"
            onChange={handleChange}
            value={text}
            ref={inputRef}
            {...props}
        />
    );
}

export default Input;
