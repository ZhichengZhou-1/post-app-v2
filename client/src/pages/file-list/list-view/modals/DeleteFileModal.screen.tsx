import { Typography } from "@mui/material";
import Popup from "../../../../components/Popup";

interface DeleteFileModalScreenProps {
    open: boolean;
    loading: boolean;
    filename: string;
    setOpen: (newValue: boolean) => void;
    onCancel: () => void;
    onDelete: () => void;
}

const DeleteFileModalScreen = (props: DeleteFileModalScreenProps) => {
    const { open, setOpen, onCancel, onDelete, filename, loading } = props;

    return (
        <Popup
            title="Delete Page"
            loading={loading}
            open={open}
            closeButtonLabel={"Cancel"}
            confirmButtonLabel={"Delete"}
            onClose={() => {
                setOpen(false);
            }}
            onCancel={() => {
                onCancel();
            }}
            onConfirm={() => {
                onDelete();
            }}
        >
            <Typography>
                Please confirm that you want to delete the following file:
                {filename}
            </Typography>
        </Popup>
    );
};

export default DeleteFileModalScreen;
