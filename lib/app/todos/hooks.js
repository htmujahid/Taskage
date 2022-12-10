import useSWR from "swr";
import fetcher from "@/lib/app/fetch";
export function useTodos() {
    return useSWR("/api/todos", fetcher);
}
