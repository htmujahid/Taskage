import React from "react";

function Paragraph({ className, children }) {
    return (
        <p className={`text-sm text-gray-500 mt-3 ${className}`}>{children}</p>
    );
}

export default Paragraph;
