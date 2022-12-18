import React from "react";

function Textarea({ className, text, setText, ...props }) {
    const handleChange = (e) => {
        setText(e.target.value);
    };

    return (
        <textarea
            className={`bg-gray-50 border border-gray-300 w-full mb-3 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none`}
            value={text}
            onChange={handleChange}
            {...props}
        ></textarea>
    );
}

export default Textarea;
