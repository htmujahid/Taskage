import { useSWRConfig } from "swr";

export async function createNote(data) {
    const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateNote(id, data) {
    const res = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteNote(id) {
    const res = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}
