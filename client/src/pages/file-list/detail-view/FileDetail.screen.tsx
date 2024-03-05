import { Box } from "@mui/material";
import FileDetailHeader, {
    FileDetailHeaderProps
} from "../components/FileDetailHeader";
import Tabs from "../../../components/Tabs";
import { useState } from "react";
import LoadingScreen from "../../shared-components/LoadingScreen";
import DetailContentContainer from "../../shared-components/DetailContentContainer";
import ScreenWrapper from "../../shared-components/ScreenWrapper";

interface FileDetailScreenProps {
    isUsingLocalFile: boolean;
    autoSaveTime: string;
    isLoading: boolean;
    isSaving: boolean;
    editable: boolean;
    filename: string;
    EditorTab: React.ReactNode;
    AttributesTab: React.ReactNode;
    EditHistoryTab: React.ReactNode;
    handlers: FileDetailHeaderProps["handlers"];
}

const FileDetailScreen = (props: FileDetailScreenProps) => {
    const {
        isUsingLocalFile,
        autoSaveTime,
        isLoading,
        isSaving,
        editable,
        filename,
        EditHistoryTab,
        AttributesTab,
        EditorTab,
        handlers
    } = props;

    const [tabIndex, setTabIndex] = useState(0);
    console.log("editable: ", editable, !editable);

    return (
        <Box
            sx={{
                padding: "42px 60px",
                flexDirection: "column",
                display: "flex",
                overflow: "auto",
                height: "100%",
                flexGrow: 1
            }}
        >
            <FileDetailHeader
                readOnly={!editable}
                hasLocalChanges={isUsingLocalFile}
                loading={isLoading}
                filename={filename}
                handlers={handlers}
                lastSaveTime={autoSaveTime}
            />
            <Box
                sx={{
                    marginTop: editable ? "0px" : "5rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "36px"
                }}
            >
                <Tabs
                    content={["Editor", "Attributes", "Editor History"]}
                    index={tabIndex}
                    handleChange={(_, newVal) => {
                        setTabIndex(newVal);
                    }}
                    sx={{
                        marginLeft: "unset"
                    }}
                />
            </Box>
            {isLoading || isSaving ? (
                <LoadingScreen />
            ) : (
                <DetailContentContainer>
                    {tabIndex === 0 && EditorTab}
                    {tabIndex === 1 && AttributesTab}
                    {tabIndex === 2 && EditHistoryTab}
                </DetailContentContainer>
            )}
        </Box>
    );
};

export default FileDetailScreen;
