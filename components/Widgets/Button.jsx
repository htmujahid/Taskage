import React from "react";

function Button({ children, className, ...props }) {
    return (
        <button className={`h-fit ${className}`} {...props}>
            {children}
        </button>
    );
}

export default Button;
