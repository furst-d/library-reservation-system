import styled from "styled-components";
import PersonIcon from "@mui/icons-material/Person";

export const ProfileContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
    @media (min-width: 768px) {
        flex-direction: row;
        gap: 5em;
    }
`;

export const ProfileIcon = styled(PersonIcon)`
    font-size: 300px;
    color: ${p => p.theme.bg};
`;

export const ProfileInfoSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
`;

export const ProfileName = styled.h2`
    margin: 0 0 10px 0;
`;

export const ProfileInfo = styled.p`
    margin: 5px 0;
`;