import { Box, BoxProps } from "@mui/material";

interface SectionDetailHeaderProps {
    sx?: BoxProps["sx"];
    title?: React.ReactNode;
    subtitle?: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

const SectionDetailHeader = (props: SectionDetailHeaderProps) => {
    const { sx, title, subtitle, header, footer } = props;

    return (
        <Box
            sx={[
                {
                    marginBottom: "60px",
                    minWidth: 0
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingBottom: "16px",
                    borderBottom: "1px solid #C8C8CA",
                    minWidth: 0
                }}
            >
                <Box
                    fontFamily={"fantasy"}
                    fontSize={"40px"}
                    minWidth={0}
                    sx={{
                        flex: "1 1 auto",
                        display: "flex"
                    }}
                >
                    {title}
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        flex: "0 0 auto",
                        gap: "10px"
                    }}
                >
                    {header}
                </Box>
            </Box>
            {(footer ?? subtitle) && (
                <Box
                    sx={[
                        {
                            display: "flex",
                            flexDirection: "row",
                            flexGrow: 1,
                            justifyContent: "space-between",
                            paddingTop: "16px",
                            paddingBottom: "20px",
                            minWidth: 0
                        },
                        ...(Array.isArray(sx) ? sx : [sx])
                    ]}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "flex-start",
                            gap: "10px",
                            flexGrow: 1,
                            minWidth: "0px"
                        }}
                    >
                        <Box
                            sx={{
                                minWidth: "0px",
                                display: "flex"
                            }}
                        >
                            {subtitle}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                flexGrow: 1,
                                justifyContent: "flex-end",
                                gap: "10px"
                            }}
                        >
                            {footer}
                        </Box>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default SectionDetailHeader;
