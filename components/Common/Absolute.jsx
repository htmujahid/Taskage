import React from "react";

function Absolute({ className, children, top, left, bottom, right }) {
    return (
        <div
            className={`absolute ${top !== undefined && "top-" + top} ${
                left !== undefined && "left-" + left
            } ${bottom !== undefined && "bottom-" + bottom} ${
                right !== undefined && "right-" + right
            } ${className}`}
        >
            {children}
        </div>
    );
}

export default Absolute;
