import React, { useState } from "react";
import FormWrapper from "./FormWrapper";
function Time({ time, setTime }) {
    const [hours, setHours] = useState(time.hours);
    const [minutes, setMinutes] = useState(time.minutes);
    const [seconds, setSeconds] = useState(time.seconds);

    function handleHours(event) {
        setHours(event.target.value);
        setTime((prev) => ({ ...prev, hours: event.target.value }));
    }

    function handleMinutes(event) {
        setMinutes(event.target.value);
        setTime((prev) => ({ ...prev, minutes: event.target.value }));
    }

    function handleSeconds(event) {
        setSeconds(event.target.value);
        setTime((prev) => ({ ...prev, seconds: event.target.value }));
    }

    return (
        <FormWrapper type={3}>
            <div className="mb-3 w-20 text-center">
                <input
                    type="number"
                    min={0}
                    id="hours"
                    defaultValue={0}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    value={hours}
                    onChange={handleHours}
                />
                <label htmlFor="hours" className="text-gray-500 text-sm">
                    Hours
                </label>
            </div>
            <div className="mb-3 w-20 text-center">
                <input
                    type="number"
                    min={0}
                    id="minutes"
                    defaultValue={0}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    value={minutes}
                    onChange={handleMinutes}
                />
                <label htmlFor="minutes" className="text-gray-500 text-sm">
                    Minutes
                </label>
            </div>
            <div className="mb-3 w-20 text-center">
                <input
                    type="number"
                    min={0}
                    id="seconds"
                    defaultValue={0}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none"
                    value={seconds}
                    onChange={handleSeconds}
                />
                <label htmlFor="seconds" className="text-gray-500 text-sm">
                    Seconds
                </label>
            </div>
        </FormWrapper>
    );
}

export default Time;
