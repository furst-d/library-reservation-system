import {styled} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = styled(CloseIcon)(() => ({
    cursor: "pointer",
    fontSize: 30,
}));

export default CloseButton;