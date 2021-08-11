import ExpiredTokenService from "./ExpiredTokenService";
import AuthServiceMechanic from "./AuthServiceMechanic";
import AuthService from "./AuthService";

export default function AuthHeader() {
    let user;
    if (AuthService.getCurrentUser() && !AuthServiceMechanic.getCurrentUser()) {
        user = AuthService.getCurrentUser();
    } else if (!AuthService.getCurrentUser() && AuthServiceMechanic.getCurrentUser()) {
        user = AuthServiceMechanic.getCurrentUser();
    }

    ExpiredTokenService("user");
    ExpiredTokenService("mechanic")

    console.log(user)
    if (user && user.token) {
        return { Authorization : 'Bearer ' + user.token };
    } else {
        return {};
    }
}