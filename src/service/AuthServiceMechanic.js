import axios from "axios";

const AUTH_SERVICE_API_URL = "http://localhost:8080/auth/mechanics";

class AuthServiceMechanic {
    login(credentials) {
        return axios
            .post(`${AUTH_SERVICE_API_URL}/login`, credentials)
            .then(response => {
                if (response.data.token) {
                    console.log(response.data.token)
                    localStorage.setItem("mechanic", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("mechanic");
    }

    register(email, password) {
        const credentials = {
            email: email,
            password: password
        }
        return axios.post(`${AUTH_SERVICE_API_URL}/register`, credentials);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('mechanic'));
    }
}

export default new AuthServiceMechanic();