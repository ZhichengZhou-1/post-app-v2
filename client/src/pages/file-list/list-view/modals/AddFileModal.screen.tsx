import { useState } from "react";
import Popup from "../../../../components/Popup";
import { TextField } from "@mui/material";

interface AddFileModalScreenProps {
    onAddFile: (filepath: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    error: boolean;
    loading: boolean;
    email: string;
    name: string;
}

const AddFileModalScreen = (props: AddFileModalScreenProps) => {
    const { onAddFile, setOpen, open, error, loading, email, name } = props;

    const [filepath, setFilepath] = useState<string>("");

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
            title={"Add File"}
            closeButtonLabel={"Cancel"}
            confirmButtonLabel={"Confirm"}
            onCancel={() => {
                setOpen(false);
            }}
            onConfirm={() => {
                onAddFile(filepath);
            }}
        >
            <p>Specify the name of the file</p>
            <div
                style={{
                    marginBottom: "30px"
                }}
            >
                <div
                    style={{
                        width: "100%",
                        marginTop: "8px",
                        marginBottom: "4px",
                        display: "inline-flex",
                        flexDirection: "column",
                        verticalAlign: "top"
                    }}
                >
                    <TextField
                        inputProps={{
                            style: {
                                width: "544px",
                                height: "38px",
                                boxSizing: "border-box"
                            }
                        }}
                        value={filepath}
                        onChange={(e) => {
                            const value = e.target.value;
                            setFilepath(value);
                        }}
                    />
                </div>
                <div
                    style={{
                        marginTop: "20px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                ></div>
            </div>
        </Popup>
    );
};

export default AddFileModalScreen;
