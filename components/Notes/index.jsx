import React, { useEffect } from "react";
import Form from "./Form";
import Card from "./Card";
import PageLoading from "../Common/PageLoading";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function index() {
    const { data, error } = useSWR("/api/notes", fetcher);
    const [notes, setNotes] = React.useState(data);

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
        <React.Fragment>
            <div className="container mx-auto my-10 flex flex-wrap justify-center sm:justify-start gap-6 max-w-[1300px] ">
                {notes &&
                    notes.map((note) => <Card key={note._id} note={note} />)}
                <Form setNotes={setNotes} />
            </div>
        </React.Fragment>
    );
}

export default index;
