import useFileMutation from "../../../../hooks/useFileMutation";
import DeleteFileModalScreen from "./DeleteFileModal.screen";

interface DeleteFileModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    id: string;
}

const DeleteFileModal = (props: DeleteFileModalProps) => {
    const { open, setOpen, title, id } = props;

    const { deleteFile, isLoading } = useFileMutation();

    const handleDelete = async ({ id }: { id: string }) => {
        await deleteFile(id);
        setOpen(false);
    };

    return (
        <DeleteFileModalScreen
            open={open}
            loading={isLoading}
            filename={title}
            setOpen={setOpen}
            onCancel={() => {
                setOpen(false);
            }}
            onDelete={() => {
                void handleDelete({ id });
            }}
        />
    );
};

export default DeleteFileModal;
