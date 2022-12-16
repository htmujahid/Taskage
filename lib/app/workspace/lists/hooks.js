import useSWR from "swr";
import fetcher from "@/lib/app/fetch";
export function useLists() {
    return useSWR("/api/workspace/lists", fetcher);
}
