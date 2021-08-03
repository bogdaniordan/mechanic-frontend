import axios from "axios";

const AUTH_SERVICE_API_URL = "http://localhost:8080/users";

class AuthService {
    login(credentials) {
        return axios
            .post(`${AUTH_SERVICE_API_URL}/login`, credentials)
            .then(response => {
                if (response.data.token) {
                    console.log(response.data.token)
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("customer");
    }

    register(firstName, secondName, username, password) {
        const credentials = {
            firstName: firstName,
            secondName: secondName,
            username: username,
            password: password
        }
        return axios.post(`${AUTH_SERVICE_API_URL}/register`, credentials);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    getCurrentCustomer() {
        return JSON.parse(localStorage.getItem("customer"))
    }
}

export default new AuthService();