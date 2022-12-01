import React, { useRef } from "react";
import Image from "next/image";
function Alert({ type, children }) {
    const alert = useRef();
    function handleDestroy() {
        alert.current.remove();
    }

    return (
        <div className="flex p-4 mb-4 bg-red-100" ref={alert}>
            <div className="text-sm font-medium text-red-700 dark:text-red-800">
                This project is currently in testing phase with limited
                features, Bug report is Encouraged{" "}
                <a
                    href="https://github.com/htmujahid/taskage"
                    className="font-semibold underline hover:text-red-800"
                >
                    Github
                </a>{" "}
            </div>
            <button
                onClick={handleDestroy}
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8"
            >
                <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </button>
        </div>
    );
}

export default Alert;
