import { PostUpdateItemBody } from "../../../../../../server/interface/post.interface";
import useFileUpdateMutation from "../../../../hooks/useFileUpdateMutation";
import { useLocalStorage } from "../../../../utils/localStorage";
import UpdateFileModalScreen, {
    UpdateFileModalScreenProps
} from "./UpdateFileModal.screen";

interface UpdateFileModalProps
    extends Omit<Omit<UpdateFileModalScreenProps, "loading">, "onUpdateFile"> {
    localFileKey: string;
}

const UpdateFileModal = (props: UpdateFileModalProps) => {
    const {
        open,
        setOpen,
        userEmail,
        userName,
        filename,
        attributes,
        content,
        fileId,
        localFileKey
    } = props;
    const { updateFile, isLoading, isError } = useFileUpdateMutation();

    const [, setLocalData] = useLocalStorage(localFileKey);

    const handleUpdateFile = async (fileBody: PostUpdateItemBody) => {
        try {
            await updateFile({
                primaryKey: fileId,
                attributes: {
                    content: content,
                    attributes: attributes
                }
            });
            setLocalData(null);
            setOpen(false);
        } catch (err) {
            console.log("error in saving file: ", err);
        }
    };

    return (
        <UpdateFileModalScreen
            open={open}
            setOpen={setOpen}
            loading={isLoading}
            userName={userName}
            userEmail={userEmail}
            fileId={fileId}
            filename={filename}
            attributes={attributes}
            content={content}
            onUpdateFile={(fileBody) => {
                void handleUpdateFile(fileBody);
            }}
        />
    );
};

export default UpdateFileModal;
