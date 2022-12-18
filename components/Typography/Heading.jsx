import React from "react";

function Heading({ type, children, className, ...props }) {
    if (type === 6) {
        return (
            <h1
                className={`text-6xl font-bold mb-3 leading-tight tracking-tight text-gray-900 ${className}`}
                {...props}
            >
                {children}
            </h1>
        );
    } else if (type === 5) {
        return (
            <h2
                className={`text-5xl font-bold mb-3 leading-tight tracking-tight text-gray-900 md:text-6xl ${className}`}
                {...props}
            >
                {children}
            </h2>
        );
    } else if (type === 4) {
        return (
            <h3
                className={`text-4xl font-bold mb-3 leading-tight tracking-tight text-gray-900 md:text-5xl ${className}`}
                {...props}
            >
                {children}
            </h3>
        );
    } else if (type === 3) {
        return (
            <h4
                className={`text-3xl font-bold mb-3 leading-tight tracking-tight text-gray-900 md:text-4xl ${className}`}
                {...props}
            >
                {children}
            </h4>
        );
    } else if (type === 2) {
        return (
            <h5
                className={`text-2xl font-bold mb-3 leading-tight tracking-tight text-gray-900 md:text-3xl ${className}`}
                {...props}
            >
                {children}
            </h5>
        );
    } else if (type === 1) {
        return (
            <h6
                className={`text-xl font-bold mb-3 leading-tight tracking-tight text-gray-900 md:text-2xl ${className}`}
                {...props}
            >
                {children}
            </h6>
        );
    }
}

export default Heading;
