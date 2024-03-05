import Popup from "../../../../components/Popup";

interface ConfirmExitModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    setEditable: (value: boolean) => void;
}

const ConfirmExitModal = ({
    open,
    setEditable,
    setOpen
}: ConfirmExitModalProps) => {
    const handleConfirm = () => {
        setEditable(false);
        setOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Popup
            sx={{
                position: "fixed",
                zIndex: "11111",
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
            title={"Exit Editor Mode"}
            closeButtonLabel={"Cancel"}
            confirmButtonLabel={"Confirm"}
            open={open}
            onClose={handleClose}
            onCancel={handleClose}
            onConfirm={handleConfirm}
        >
            <p
                style={{
                    marginTop: "2rem"
                }}
            >
                {`Changes will be saved locally until cache is cleared or 'discard changes' is selected.`}
            </p>
            <p
                style={{
                    marginTop: "2rem"
                }}
            >
                {`Select 'CONFIRM' to exit edit mode`}
            </p>
        </Popup>
    );
};

export default ConfirmExitModal;
