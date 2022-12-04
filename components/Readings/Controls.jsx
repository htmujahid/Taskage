import React from "react";
import { useSWRConfig } from "swr";

function Controls({ _id, setEditMode, setIsCardLoading }) {
    const { mutate } = useSWRConfig();

    async function handleDelete() {
        setIsCardLoading(true);
        await fetch(`/api/readings/${_id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => console.log(err))
            .finally(() => {
                setIsCardLoading(false);
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
