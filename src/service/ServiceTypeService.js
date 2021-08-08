import axios from 'axios';
import AuthHeader from "./AuthHeader";

const SERVICE_TYPE_REST_API_URL = 'http://localhost:8080/services';

class ServiceTypeService {

    getMostNeededSpecialization() {
        return axios.get(`${SERVICE_TYPE_REST_API_URL}/most-needed-service`, { headers: AuthHeader() })
    }

}

export default new ServiceTypeService();