import React from "react";

function FlexWrapper({ children, className, type }) {
    if (type === 0) {
        return <div className={`flex w-full ${className}`}>{children}</div>;
    }
    if (type === 1) {
        return (
            <div
                className={`flex items-center justify-between gap-4 w-full ${className}`}
            >
                {children}
            </div>
        );
    } else if (type === 2) {
        return (
            <div
                className={`flex justify-between gap-2 mt-2 flex-wrap ${className}`}
            >
                {children}
            </div>
        );
    } else if (type === 3) {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {children}
            </div>
        );
    }
}

export default FlexWrapper;
