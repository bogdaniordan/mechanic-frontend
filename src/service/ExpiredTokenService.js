import jwtDecode from "jwt-decode";
import AuthService from "./AuthService";
import AuthServiceMechanic from "./AuthServiceMechanic";

export default function ExpiredTokenService(userType) {
    const user = localStorage.getItem(userType);
    if (user) {
        let token = JSON.parse(user).token;
        if (token) {
            let decodedToken = jwtDecode(token);
            console.log("Decoded Token", decodedToken);
            let currentDate = new Date();

            // JWT exp is in seconds
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                console.log("Token expired.");
                AuthService.logout();
                AuthServiceMechanic.logout();
            } else {
                console.log("Valid token");
            }
        }
    }

}