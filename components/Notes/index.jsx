import React, { useState, createContext, useEffect } from "react";
export const NoteContext = createContext();

import Form from "./Form";
import Card from "./Card";
import PageLoading from "@/components/Common/PageLoading";
import { useNotes } from "@/lib/app/notes";

function index() {
    const { data, error } = useNotes();
    const [notes, setNotes] = useState(data);

    const contextData = {
        notes,
        setNotes,
    };

    useEffect(() => {
        if (!data) {
            setNotes([]);
        }
        if (data !== undefined && data.error !== "Not authenticated") {
            setNotes(data);
        }
    }, [data]);

    if (error) return <div>failed to load</div>;
    if (!data) return <PageLoading />;
    return (
        <NoteContext.Provider value={contextData}>
            <div className="my-10 flex flex-wrap justify-center sm:justify-start gap-6 mx-10">
                {notes &&
                    notes.map((note) => <Card key={note._id} note={note} />)}
                <Form />
            </div>
        </NoteContext.Provider>
    );
}

export default index;
