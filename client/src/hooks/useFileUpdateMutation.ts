import { useIsMutating, useMutation } from "@tanstack/react-query";
import { queryClient } from "../main";
import zodFetch from "../utils/zodFetch";
import { errorNotification, successNotification } from "../utils/toasts";
import {
    PostUpdateItemBody,
    PostUpdateItemResponseSchema
} from "../../../server/interface/post.interface";

export default function useFileUpdateMutation() {
    const invalidateQueries = async () => {
        void queryClient.invalidateQueries({
            queryKey: ["fileContent"]
        });
    };

    const updateFileMutation = useMutation({
        mutationKey: ["updateFileMutation"],
        mutationFn: async (fileBody: PostUpdateItemBody) => {
            const response = await zodFetch(
                PostUpdateItemResponseSchema,
                `/api/post/update`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(fileBody)
                }
            );
            return response;
        },
        onSuccess: async (response, variables) => {
            void invalidateQueries();
            successNotification(
                `Successfully updated file ${variables.primaryKey}`,
                "Update File"
            );
        },
        onError: (err, variables) => {
            console.log(err);
            errorNotification(
                `Failed to update file: ${variables.primaryKey}`,
                "Update File"
            );
        }
    });

    const numberOfFileMutations = useIsMutating({
        mutationKey: ["updateFileMutation"]
    });

    return {
        updateFile: async (fileBody: PostUpdateItemBody) => {
            return await updateFileMutation.mutateAsync(fileBody);
        },
        isLoading: numberOfFileMutations > 0,
        isError: updateFileMutation.isError
    };
}
