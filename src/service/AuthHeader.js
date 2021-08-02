import jwtDecode from "jwt-decode";
import ExpiredTokenService from "./ExpiredTokenService";

export default function AuthHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    ExpiredTokenService();

    if (user && user.jwtToken) {
        return { Authorization : 'Bearer ' + user.jwtToken };
    } else {
        return {};
    }
}