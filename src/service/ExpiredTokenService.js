import jwtDecode from "jwt-decode";
import AuthService from "./AuthService";

export default function ExpiredTokenService(userType) {
    let token = localStorage.getItem(userType);
    if (token) {
        let decodedToken = jwtDecode(token);
        console.log("Decoded Token", decodedToken);
        let currentDate = new Date();

        // JWT exp is in seconds
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
            console.log("Token expired.");
            AuthService.logout();
        } else {
            console.log("Valid token");
        }
    }

}