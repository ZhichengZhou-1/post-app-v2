import {
    Tab as MUITab,
    Tabs as MUITabs,
    TabsProps as MUITabsProps
} from "@mui/material";

interface TabsProps {
    content: string[];
    index: number;
    handleChange: (event: React.SyntheticEvent, newValue: number) => void;
    sx?: MUITabsProps["sx"];
}

const Tabs = ({ content, index, handleChange, sx }: TabsProps) => {
    return (
        <MUITabs
            value={index}
            onChange={handleChange}
            centered
            variant="standard"
            TabIndicatorProps={{
                style: {
                    background: "#0E2AD1",
                    height: "3px",
                    display: "flex",
                    justifyContent: "center"
                }
            }}
            sx={[
                {
                    marginX: "20px",
                    height: "40px",

                    "& .MuiTabs-scroller": {
                        height: "40px"
                    },

                    " & .MuiTab-root": {
                        textTransform: "none",
                        fontFamily: "fantasy",
                        fontWeight: "400",
                        color: "#000000",
                        opacity: "87%",
                        fontSize: "14px",
                        lineHeight: "18px",
                        height: "40px",
                        letterSpacing: "-0.1px",
                        padding: "unset",

                        "&.Mui-selected": {
                            color: "#0E2AD1",
                            fontFamily: "fantasy",
                            fontWeight: "700",
                            fontStyle: "normal",
                            letterSpacing: "-0.1px",
                            lineHeight: "18px"
                        }
                    },

                    "& .MuiTabs-flexContainer": {
                        height: "40px",
                        borderBottom: "1px solid #e8e8e8",
                        width: "fit-content",

                        "& .MuiButtonBase-root": {
                            minHeight: "unset",
                            minWidth: "0",
                            paddingX: "9px",
                            "&:not(:last-child)": {
                                marginRight: "56px"
                            },

                            "& span::after": {
                                content: "attr(data-text)",
                                height: "0px",
                                overflow: "hidden",
                                visibility: "hidden",
                                fontFamily: "fantasy",
                                fontWeight: "700",
                                fontStyle: "normal",
                                letterSpacing: "-0.1px",
                                lineHeight: "18px"
                            }
                        }
                    }
                },
                ...(Array.isArray(sx) ? sx : [sx])
            ]}
        >
            {content.map((tab, index) => (
                <MUITab
                    disableRipple
                    key={index}
                    label={
                        <span
                            data-text={tab}
                            style={{
                                display: "inline-flex",
                                width: "100%",
                                alignItems: "center",
                                flexDirection: "column",
                                justifyContent: "center"
                            }}
                        >
                            {tab}
                        </span>
                    }
                ></MUITab>
            ))}
        </MUITabs>
    );
};

export default Tabs;
