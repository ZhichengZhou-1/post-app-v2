import { Typography } from "@mui/material";
import { PostUpdateItemBody } from "../../../../../../server/interface/post.interface";
import Popup from "../../../../components/Popup";

export interface UpdateFileModalScreenProps {
    open: boolean;
    setOpen: (newValue: boolean) => void;
    loading: boolean;
    userName: string;
    userEmail: string;
    fileId: string;
    filename: string;
    attributes: Record<string, any>;
    content: string;
    onUpdateFile: (fileContent: PostUpdateItemBody) => void;
}

const UpdateFileModalScreen = (props: UpdateFileModalScreenProps) => {
    const {
        open,
        setOpen,
        loading,
        userEmail,
        userName,
        filename,
        attributes,
        content,
        fileId,
        onUpdateFile
    } = props;

    return (
        <Popup
            open={open}
            onClose={() => {
                setOpen(false);
            }}
            loading={loading}
            sx={{
                position: "fixed",
                zIndex: "1300",
                inset: "0px",
                "& .MuiDialog-paper": {
                    width: "600px"
                },
                "& .MuiDialogTitle-root": {
                    fontWeight: "unset",
                    fontFamily: "fantasy",

                    fontSize: "18px"
                }
            }}
            title={"Update File"}
            closeButtonLabel="Cancel"
            confirmButtonLabel="Confirm"
            onCancel={() => {
                setOpen(false);
            }}
            onConfirm={() => {
                onUpdateFile({
                    primaryKey: fileId,
                    attributes: {
                        content: content,
                        attributes: attributes
                    }
                });
            }}
        >
            <>
                <Typography
                    sx={{
                        marginTop: "1rem",
                        color: "#000",
                        fontSize: "16px"
                    }}
                >
                    {`Please confirm you would like to save ${filename}.`}
                </Typography>
            </>
        </Popup>
    );
};

export default UpdateFileModalScreen;
