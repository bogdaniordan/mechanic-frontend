import ExpiredTokenService from "./ExpiredTokenService";

export default function AuthHeader() {
    let user;
    if (JSON.parse(localStorage.getItem('user')) && !JSON.parse(localStorage.getItem("mechanic"))) {
        user = JSON.parse(localStorage.getItem('user'));
    } else if (!JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem("mechanic"))) {
        user = JSON.parse(localStorage.getItem("mechanic"))
    }

    ExpiredTokenService("user");
    ExpiredTokenService("mechanic")

    if (user && user.token) {
        return { Authorization : 'Bearer ' + user.token };
    } else {
        return {};
    }
}