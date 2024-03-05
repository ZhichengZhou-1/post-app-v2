import { Box, Skeleton, Typography } from "@mui/material";
import SectionDetailHeader from "../../../components/SectionDetailHeader";
import Badge from "../../../components/Badge";
import Button from "../../../components/Button";

export interface FileDetailHeaderProps {
    readOnly: boolean;
    hasLocalChanges: boolean;
    loading: boolean;
    filename: string;
    lastSaveTime?: string;
    handlers: {
        onDiscardChange: () => void;
        onExit: () => void;
        onSave: () => void;
        onBack: () => void;
        onEdit: () => void;
    };
}

const FileDetailHeader = (props: FileDetailHeaderProps) => {
    const {
        readOnly,
        hasLocalChanges,
        loading,
        filename,
        lastSaveTime,
        handlers
    } = props;

    return (
        <SectionDetailHeader
            title={
                (readOnly && `File Detail`) || (
                    <FileTitle
                        hasLocalChanges={hasLocalChanges}
                        loading={loading}
                        displayName={filename}
                    />
                )
            }
            subtitle={
                readOnly && (
                    <FileTitle
                        hasLocalChanges={hasLocalChanges}
                        loading={loading}
                        displayName={filename}
                    />
                )
            }
            header={
                <>
                    {!readOnly && (
                        <>
                            <Typography
                                sx={{
                                    paddingRight: "0px",
                                    paddingLeft: "10px",
                                    marginY: "auto !important",
                                    minWidth: 0,
                                    overflow: "hidden"
                                }}
                            >
                                {lastSaveTime && `Auto Saved ${lastSaveTime}`}
                            </Typography>
                            <Button
                                onClick={handlers.onDiscardChange}
                                size="small"
                                type="default"
                                disabled={!hasLocalChanges}
                            >
                                Discard Change
                            </Button>
                            <Button
                                onClick={handlers.onExit}
                                size="small"
                                type="default"
                            >
                                Exit Editor Mode
                            </Button>
                            <Button
                                onClick={handlers.onSave}
                                size="small"
                                type="default"
                                disabled={!hasLocalChanges}
                            >
                                Save
                            </Button>
                        </>
                    )}
                    {readOnly && (
                        <>
                            <Button
                                onClick={handlers.onBack}
                                size="small"
                                type="default"
                            >
                                Back to List
                            </Button>
                            <Button
                                onClick={handlers.onEdit}
                                size="small"
                                type="default"
                            >
                                Edit
                            </Button>
                        </>
                    )}
                </>
            }
            footer={<></>}
        />
    );
};

interface FileTitleProps {
    displayName?: string;
    hasLocalChanges: boolean;
    loading: boolean;
}

const FileTitle = ({
    displayName,
    hasLocalChanges,
    loading
}: FileTitleProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                minWidth: 0
            }}
        >
            {loading && (
                <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                    <Skeleton width={14} height={14} variant="circular" />
                    <Skeleton width={150} />
                    <Skeleton width={300} />
                </Box>
            )}
            {!loading && (
                <>
                    <Typography fontFamily="fantasy" fontSize="25px">
                        {displayName}
                    </Typography>
                </>
            )}
            {hasLocalChanges && <Badge title={"UNSAVED"} />}
        </Box>
    );
};

export default FileDetailHeader;
