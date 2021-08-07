import axios from "axios";
import AuthHeader from "./AuthHeader";

const CAR_SERVICE_API_URL = "http://localhost:8080/services";


class CarServiceService {

    getServiceByMechanicId(id) {
        return axios.get(CAR_SERVICE_API_URL + "/" + id, { headers: AuthHeader() });
    }

    createNewService(mechanicId, carId, customerId, service) {
        return axios.post(CAR_SERVICE_API_URL + "/mechanic/" + mechanicId + "/car/" + carId + "/customer/" +
            customerId, service, { headers: AuthHeader() })
    }

    getAllServices() {
        return axios.get(CAR_SERVICE_API_URL, { headers: AuthHeader() });
    }

    getServicesByMechanicId(id) {
        return axios.get(CAR_SERVICE_API_URL + "/services-by-mechanic-id/" + id, { headers: AuthHeader() });
    }

    getServicesByCustomerId(id) {
        return axios.get(CAR_SERVICE_API_URL + "/services-by-customer/" + id, { headers: AuthHeader() });
    }

    getAllServiceTypes() {
        return axios.get(`${CAR_SERVICE_API_URL}/get-service-types`, { headers: AuthHeader() });
    }
}


export default new CarServiceService();