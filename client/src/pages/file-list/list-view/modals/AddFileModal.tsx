import { useNavigate } from "react-router-dom";
import useFileMutation from "../../../../hooks/useFileMutation";
import AddFileModalScreen from "./AddFileModal.screen";

interface AddFileModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    email: string;
    name: string;
    currentLength: number;
}

const AddFileModal = (props: AddFileModalProps) => {
    const { open, setOpen, email, name, currentLength } = props;
    const navigate = useNavigate();
    const addFileMutation = useFileMutation();
    console.log("email and name: ", email, name);

    const handleAddFile = async (filepath: string) => {
        try {
            await addFileMutation.saveFile({
                title: filepath,
                postId: (currentLength + 1).toString(),
                author: name,
                authorEmail: email,
                content: "",
                lastModified: new Date().toISOString()
            });
            // const filenameEncoded = encodeURIComponent(filepath);
            navigate(`/admin/file/detail/${(currentLength + 1).toString()}`);
            setOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AddFileModalScreen
            onAddFile={(filepath) => {
                void handleAddFile(filepath);
            }}
            open={open}
            setOpen={setOpen}
            error={addFileMutation.isError}
            loading={addFileMutation.isLoading}
            email={email}
            name={name}
        />
    );
};

export default AddFileModal;
