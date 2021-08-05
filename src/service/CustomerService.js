import axios from "axios";
import AuthHeader from "./AuthHeader";

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
}

export default new CustomerService();