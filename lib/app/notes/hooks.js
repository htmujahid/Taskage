import useSWR from "swr";
import fetcher from "@/lib/app/fetch";
export function useNotes() {
    return useSWR("/api/notes", fetcher);
}
