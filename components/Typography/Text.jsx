import React from "react";

function Text({ children, className, type, ...props }) {
    if (type === 1) {
        return (
            <p
                className={`text-xs font-light text-gray-900 ${className}`}
                {...props}
            >
                {children}
            </p>
        );
    } else if (type === 2) {
        return (
            <p
                className={`text-sm font-medium text-gray-900 ${className}`}
                {...props}
            >
                {children}
            </p>
        );
    } else if (type === 3) {
        return (
            <p
                className={`text-base font-semibold text-gray-900 ${className}`}
                {...props}
            >
                {children}
            </p>
        );
    } else if (type === 4) {
        return (
            <p
                className={`text-lg font-bold text-gray-900 ${className}`}
                {...props}
            >
                {children}
            </p>
        );
    }
}

export default Text;
