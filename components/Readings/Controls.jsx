import React, { useContext } from "react";
import { ReadingContext } from "./index";

import { useSWRConfig } from "swr";
import { deleteReading } from "@/lib/app/readings";

function Controls({ _id, setEditMode, setIsCardLoading }) {
    const { setReadings } = useContext(ReadingContext) ?? {};

    const { mutate } = useSWRConfig();

    async function handleDelete() {
        setIsCardLoading(true);
        await deleteReading(_id);
        setIsCardLoading(false);
        mutate("/api/readings");
    }

    function handleEdit() {
        setEditMode(true);
    }

    return (
        <React.Fragment>
            <button className="block mb-2" onClick={handleDelete}>
                <img src={`./assets/icons/delete.svg`} alt="" />
            </button>
            <button className="block mb-2" onClick={handleEdit}>
                <img src={`./assets/icons/edit.svg`} alt="" />
            </button>
        </React.Fragment>
    );
}

export default Controls;
