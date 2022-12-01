import React from "react";

function FormWrapper({ type, children, className }) {
    if (type === 0)
        return (
            <div
                className={`flex flex-col sm:flex-row justify-between items-center ${className}`}
            >
                {children}
            </div>
        );
    else if (type === 1)
        return (
            <div
                className={`flex flex-col sm:flex-row justify-between items-center gap-2 ${className}`}
            >
                {children}
            </div>
        );
    else if (type === 2)
        return (
            <div
                className={`flex justify-between items-center gap-2 ${className}`}
            >
                {children}
            </div>
        );
    else if (type === 3)
        return (
            <div
                className={`flex justify-center items-center gap-2 ${className}`}
            >
                {children}
            </div>
        );
    return <div>{children}</div>;
}

export default FormWrapper;
