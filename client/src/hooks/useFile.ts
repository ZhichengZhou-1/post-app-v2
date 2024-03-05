import { useQuery } from "@tanstack/react-query";
import zodFetch from "../utils/zodFetch";
import { PostGetItemResponseSchema } from "../../../server/interface/post.interface";

export default function useFile(id: string) {
    const fileQuery = useQuery({
        queryKey: ["fileContent", { id }],
        queryFn: async () => {
            const response = await zodFetch(
                PostGetItemResponseSchema,
                `/api/post/get?primaryKey=${id}`
            );
            return response.Data;
        }
    });

    return {
        data: fileQuery.data,
        isLoading: fileQuery.isPending,
        isError: fileQuery.isError
    };
}
