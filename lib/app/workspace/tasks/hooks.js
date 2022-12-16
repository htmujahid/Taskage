import useSWR from "swr";
import fetcher from "@/lib/app/fetch";
export function useTasks() {
    return useSWR("/api/workspace/tasks", fetcher);
}
