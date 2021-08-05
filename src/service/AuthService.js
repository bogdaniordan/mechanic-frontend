import axios from "axios";
import AuthHeader from "./AuthHeader";

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

    // loginAsCustomer(username) {
    //     return axios.get(`http://localhost:8080/customers/customer-by-username/${username}`, {headers: AuthHeader()})
    //         .then(response => {
    //             if (response.data) {
    //                 console.log(response.data);
    //                 localStorage.setItem("customer", JSON.stringify(response.data))
    //             }
    //         })
    // }

    logout() {
        localStorage.removeItem("user");
        // localStorage.removeItem("customer");
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

    // getCurrentCustomer() {
    //     return JSON.parse(localStorage.getItem("customer"))
    // }
    getUserFullName(username) {
        return axios.get(`${AUTH_SERVICE_API_URL}/get-fullname/${username}`, {headers: AuthHeader()})
    }
}

export default new AuthService();