import { useSWRConfig } from "swr";

export async function createScheduler(data) {
    const res = await fetch("/api/scheduler", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateScheduler(id, data) {
    const res = await fetch(`/api/scheduler/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function updateSchedulerStatus(id, data) {
    const res = await fetch(`/api/scheduler/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deleteScheduler(id) {
    const res = await fetch(`/api/scheduler/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.json();
}
