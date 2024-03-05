import { Box } from "@mui/material";

interface BadgeProps {
    title: string;
    color?: string;
}

const Badge = (props: BadgeProps) => {
    const { title, color } = props;

    return (
        <Box
            padding="3px 10px"
            borderRadius="2px"
            color="#fff"
            fontSize="12px"
            width="fit-content"
            margin="auto"
            sx={{
                backgroundColor: color ?? "#ff9800"
            }}
        >
            {title}
        </Box>
    );
};

export default Badge;
