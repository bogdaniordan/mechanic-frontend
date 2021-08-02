import axios from "axios";

const AUTH_SERVICE_API_URL = "http://localhost:8080/users/authentication";

class AuthService {
    login(credentials) {
        return axios
            .post(AUTH_SERVICE_API_URL, credentials)
            .then(response => {
                if (response.data.accessToken) {
                    console.log(response.data.accessToken)
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("customer");
    }

    register(username, email, password) {
        return axios.post(AUTH_SERVICE_API_URL + "signup", {
            username,
            email,
            password
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getCurrentCustomer() {
        return JSON.parse(localStorage.getItem("customer"))
    }
}

export default new AuthService();