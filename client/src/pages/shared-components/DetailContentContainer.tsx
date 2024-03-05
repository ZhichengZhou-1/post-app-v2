import { Box, BoxProps } from "@mui/material";
import LoadingScreen from "./LoadingScreen";

export interface DetailContentContainerProps {
    isLoading?: boolean;
    children: React.ReactNode;
    sx?: BoxProps["sx"];
}

const DetailContentContainer = (props: DetailContentContainerProps) => {
    const { isLoading, children, sx } = props;
    return (
        <Box
            sx={{
                flexGrow: 1,
                position: "relative",
                overflow: "auto",
                maxHeight: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >
            {/* <Box
                sx={[
                    {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: "100%",
                        overflow: "auto",
                        border: "1px solid #e5e5e5",
                        backgroundColor: "#fafafa",
                        maxWidth: "100%",
                        whiteSpace: "pre-wrap",
                        boxSizing: "border-box",
                        display: " flex",
                        flexDirection: "column"
                    },
                    ...(Array.isArray(sx) ? sx : [sx])
                ]}
            > */}
            <Box
                sx={{
                    backgroundColor: "#fafafa",
                    overflow: "auto",
                    maxHeight: "100%",
                    flex: 1
                }}
            >
                {children}
            </Box>
        </Box>
        // </Box>
    );
};

export default DetailContentContainer;
