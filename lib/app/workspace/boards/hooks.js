import useSWR from "swr";
import fetcher from "@/lib/app/fetch";
export function useBoards() {
    return useSWR("/api/boards", fetcher);
}
