import { deleteNote } from "@/lib/app/notes";
import React, { useState, useRef, useEffect } from "react";
import { useSWRConfig } from "swr";
import Controls from "./Controls";
import Edit from "./Edit";
function Card({ note }) {
    const [editMode, setEditMode] = useState(false);
    const { mutate } = useSWRConfig();
    const card = useRef(null);

    useEffect(() => {
        if (card.current) {
            card.current.style.backgroundColor = note.color;
            card.current.style.rotate = note.rotate;
        }
    }, [note, editMode]);

    async function handleDelete() {
        await deleteNote(note._id);
        mutate("/api/notes");
    }

    function handleEdit() {
        setEditMode(!editMode);
    }
    return (
        <React.Fragment>
            {!editMode ? (
                <div
                    className="relative h-72 w-60 p-4 shadow-lg flex items-center justify-center"
                    ref={card}
                    onDoubleClick={handleEdit}
                >
                    <div className="absolute top-3 right-3">
                        <button onClick={handleDelete}>X</button>
                    </div>
                    <p className="text-lg font-medium text-center">
                        {note.note}
                    </p>
                </div>
            ) : (
                <Edit
                    note={note}
                    editMode={editMode}
                    setEditMode={setEditMode}
                />
            )}
        </React.Fragment>
    );
}

export default Card;
