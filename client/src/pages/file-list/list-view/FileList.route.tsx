import { useNavigate } from "react-router-dom";
import useFileList from "../../../hooks/useFileList";
import FileListScreen from "./FileList.screen";
import FileListTable from "./FileListTable";
import AddFileModal from "./modals/AddFileModal";
import useUserProfile from "../../../hooks/useUserProfile";
import { useState } from "react";
import DeleteFileModal from "./modals/DeleteFileModal";

const FileListRoute = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useFileList();
    const userProfile = useUserProfile();

    const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
    const [deletedId, setDeletedId] = useState<string | undefined>(undefined);
    const [deletedTitle, setDeletedTitle] = useState<string | undefined>(
        undefined
    );

    return (
        <>
            <DeleteFileModal
                open={!!deletedId}
                setOpen={() => {
                    setDeletedId("");
                }}
                title={deletedTitle ?? ""}
                id={deletedId ?? ""}
            />
            <AddFileModal
                open={saveModalOpen}
                setOpen={setSaveModalOpen}
                email={userProfile.data?.email ?? ""}
                name={userProfile.data?.name ?? ""}
                currentLength={data?.length ?? 0}
            />
            <FileListScreen
                isLoading={isLoading}
                children={
                    <FileListTable
                        data={data ?? []}
                        isLoading={isLoading}
                        handlers={{
                            onAddFile: () => {
                                setSaveModalOpen(true);
                            },
                            onClone: () => {},
                            onDelete: (row) => {
                                setDeletedId(row.original.postId);
                                setDeletedTitle(row.original.title);
                            }
                        }}
                    />
                }
            />
        </>
    );
};

export default FileListRoute;
