import React, { useState, useEffect, createContext } from "react";
export const ReadingContext = createContext();

import Card from "./Card";
import Form from "./Form";

import useSWR from "swr";
import Skelton from "./Skelton";

const fetcher = (url) => fetch(url).then((res) => res.json());
function index() {
    const { data, error } = useSWR("/api/readings", fetcher);

    const [readings, setReadings] = useState(data);

    let contextData = {
        readings,
        setReadings,
    };

    useEffect(() => {
        if (data !== undefined && data.error !== "Not authenticated") {
            setReadings(data);
        } else {
            setReadings([]);
        }
    }, [data]);

    if (error) return <div>failed to load</div>;
    if (!data) return <Skelton />;

    return (
        <ReadingContext.Provider value={contextData}>
            <div className="my-10">
                <Form />
            </div>

            {readings.length === 0 && (
                <div className="text-center text-gray-500">No readings yet</div>
            )}
            <div className="mx-auto grid w-fit grid-cols-1 gap-6 sm:grid-cols-2">
                {readings &&
                    readings?.map((reading) => (
                        <Card key={reading.id} reading={reading} />
                    ))}
            </div>
        </ReadingContext.Provider>
    );
}

export default index;
