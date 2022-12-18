import React, { useRef } from "react";

function Time({ setTime }) {
    const hoursRef = useRef();
    const minutesRef = useRef();
    const secondsRef = useRef();

    function handleTimeChange() {
        setTime({
            hours: hoursRef.current.value,
            minutes: minutesRef.current.value,
            seconds: secondsRef.current.value,
        });
    }

    return (
        <div className="flex gap-4 w-64 mx-auto">
            <div className="">
                <input
                    type="number"
                    min={0}
                    id="hours"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    onChange={handleTimeChange}
                    ref={hoursRef}
                />
                <label htmlFor="hours" className="text-gray-500 text-sm">
                    Hours
                </label>
            </div>
            <div className="">
                <input
                    type="number"
                    min={0}
                    id="minutes"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    onChange={handleTimeChange}
                    ref={minutesRef}
                />
                <label htmlFor="minutes" className="text-gray-500 text-sm">
                    Minutes
                </label>
            </div>
            <div className="">
                <input
                    type="number"
                    min={0}
                    id="seconds"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    onChange={handleTimeChange}
                    ref={secondsRef}
                />
                <label htmlFor="seconds" className="text-gray-500 text-sm">
                    Seconds
                </label>
            </div>
        </div>
    );
}

export default Time;
