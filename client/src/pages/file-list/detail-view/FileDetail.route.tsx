import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFile from "../../../hooks/useFile";
import useUserProfile from "../../../hooks/useUserProfile";
import useFileEditor from "../../../hooks/useFileEditor";
import { generateLocalFileKey } from "../../../utils/localStorage";
import FileDetailScreen from "./FileDetail.screen";
import CodeEditor from "../../../components/CodeEditor";
import { errorNotification } from "../../../utils/toasts";
import ConfirmExitModal from "./modals/ConfirmExitModal.screen";
import UpdateFileModal from "./modals/UpdateFileModal";

const FileDetailRoute = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { id } = useParams();

    console.log("id is: ", id);

    if (!id) {
        errorNotification("missing path params");
        navigate("/");
        throw Error("");
    }

    const [editable, setEditable] = useState<boolean>(false);
    const [saveFileModalOpen, setSaveFileModalOpen] = useState<boolean>(false);
    const [exitEditModalOpen, setExitEditModalOpen] = useState<boolean>(false);

    const remoteFileData = useFile(id);
    const userProfile = useUserProfile();

    console.log("local remote data: ", remoteFileData.data);

    useEffect(() => {
        console.log("id is: ", id);
    }, [id]);

    /**
     * Editor
     */
    const {
        editorContent,
        attributes,
        setEditorContent,
        setAttributes,
        timeStamp,
        hasLocalChanges,
        discardChanges
    } = useFileEditor({
        remoteContent: remoteFileData.data?.content,
        remoteAttributes: remoteFileData.data?.attribute,
        localFileKey: generateLocalFileKey(id, remoteFileData.data?.filename)
    });

    return (
        <>
            <UpdateFileModal
                localFileKey={generateLocalFileKey(
                    id,
                    remoteFileData.data?.filename
                )}
                open={saveFileModalOpen}
                setOpen={setSaveFileModalOpen}
                userName={userProfile.data?.name ?? ""}
                userEmail={userProfile.data?.email ?? ""}
                fileId={id}
                filename={remoteFileData.data?.filename ?? ""}
                attributes={{}}
                content={editorContent ?? ""}
            />
            <ConfirmExitModal
                open={exitEditModalOpen}
                setOpen={setExitEditModalOpen}
                setEditable={setEditable}
            />
            <FileDetailScreen
                isUsingLocalFile={hasLocalChanges}
                autoSaveTime={timeStamp ?? ""}
                isLoading={remoteFileData.isLoading}
                isSaving={false}
                editable={editable}
                filename={remoteFileData.data?.filename ?? ""}
                EditorTab={
                    <CodeEditor
                        value={editorContent ?? ""}
                        onChange={(value) => {
                            setEditorContent(value);
                        }}
                        readOnly={!editable}
                    />
                }
                AttributesTab={<>placeholder</>}
                EditHistoryTab={<>placeholder</>}
                handlers={{
                    onDiscardChange: discardChanges,
                    onExit: () => {
                        setExitEditModalOpen(true);
                    },
                    onSave: () => {
                        setSaveFileModalOpen(true);
                    },
                    onBack: () => {
                        navigate(
                            location.pathname.split("/").slice(0, 2).join("/")
                        );
                    },
                    onEdit: () => {
                        setEditable(true);
                    }
                }}
            />
        </>
    );
};

export default FileDetailRoute;
