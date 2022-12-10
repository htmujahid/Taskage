import { useSWRConfig } from "swr";

export async function createReading(data) {
    const res = await fetch("/api/readings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateReading(id, data) {
    const res = await fetch(`/api/readings/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateReadingStatus(id, data) {
    const res = await fetch(`/api/readings/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteReading(id) {
    const res = await fetch(`/api/readings/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}
