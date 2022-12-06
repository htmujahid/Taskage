import React, { useContext } from "react";
import { ReadingContext } from "./index";

import { useSWRConfig } from "swr";

function Controls({ _id, setEditMode, setIsCardLoading }) {
    const { setReadings } = useContext(ReadingContext) ?? {};

    const { mutate } = useSWRConfig();

    async function handleDelete() {
        setIsCardLoading(true);
        setReadings((prev) => prev.filter((r) => r._id != _id));
        setIsCardLoading(false);

        await fetch(`/api/readings/${_id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => console.log(err))
            .finally(() => {
                mutate("/api/readings");
            });
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
