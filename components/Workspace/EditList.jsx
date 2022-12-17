import { updateList } from "@/lib/app/workspace/lists";
import React, { useState } from "react";
import { useSWRConfig } from "swr";
function EditList({ list, setIsEditMode }) {
    const [title, setTitle] = useState(list.title);
    const [isAddMode, setIsAddMode] = useState(false);
    const { mutate } = useSWRConfig();

    async function handleSubmit() {
        setIsEditMode(false);

        if (title === "") return;

        const data = {
            title,
        };
        await updateList(list._id, data);
        mutate("/api/workspace/lists");
    }
    return (
        <div className="flex justify-between items-center">
            <input
                className="text-lg font-semibold"
                value={title}
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleSubmit}
            ></input>
        </div>
    );
}

export default EditList;
