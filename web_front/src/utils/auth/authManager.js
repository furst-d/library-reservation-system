import {decrypt, encrypt} from "../crypto/cryptoManager";
import {isExpired} from "react-jwt";

export const checkAuth = () => {
    const tokens = getTokens();
    if(tokens) {
        const accessToken = tokens.access_token;
        if(isExpired(accessToken)) {
            removeTokens();
            return false;
        }
        return true;
    }
    return false;
}

export const hasRole = (user, role) => {
    if (!user) {
        return false;
    }
    return user.authorities.some(authority => authority.authority === role);
}

export const isEditor = (user) => {
    return hasRole(user, "EDITOR")
}

export const isAdmin = (user) => {
    return hasRole(user, "ADMIN")
}

export function getTokens() {
    const tokens =  localStorage.getItem("auth_token");
    if(tokens) {
        return JSON.parse(decrypt(tokens));
    }
    return null;
}

export function removeTokens() {
    localStorage.removeItem("auth_token");
}

export function setTokens (accessToken) {
    const tokens = {
        access_token: accessToken,
    }
    localStorage.setItem("auth_token", encrypt(JSON.stringify(tokens)));
}