import axios from "axios";
import AuthHeader from "./AuthHeader";
import AuthService from "./AuthService";

const CUSTOMER_SERVICE_API_URL = "http://localhost:8080/customers"


class CustomerService {
    getCustomerByUserId(id) {
        return axios.get(CUSTOMER_SERVICE_API_URL + "/by-user-id/" + id, { headers: AuthHeader() })
    }

    getCustomerByHisUsername(username) {
        return axios.get(CUSTOMER_SERVICE_API_URL + "/customer-by-username/" + username, { headers: AuthHeader() } )
    }

    getCustomerById(id) {
        return axios.get(CUSTOMER_SERVICE_API_URL + "/" + id, { headers: AuthHeader() } )
    }

    updateCustomerDetails(updatedCustomer, id) {
        return axios.put(`${CUSTOMER_SERVICE_API_URL}/update-customer-details/${id}`, updatedCustomer, { headers: AuthHeader() } )
    }

    addCustomer(customer, username) {
        return axios.post(`${CUSTOMER_SERVICE_API_URL}/add-customer/${username}`, customer, { headers: AuthHeader() });
    }

    // getByName(name) {
    //     return axios.get(`${CUSTOMER_SERVICE_API_URL}/customer-by-name/${name}`, { headers: AuthHeader() });
    // }

    setImage(customerId, file) {
        return axios.post(`${CUSTOMER_SERVICE_API_URL}/image/upload/${customerId}`, file, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + AuthService.getCurrentUser().token
            }
        })
    }
}

export default new CustomerService();