import axios from 'axios';
import AuthHeader from "./AuthHeader";

const CARS_REST_API_URL = 'http://localhost:8080/cars';

class CarService {

    getCar(id) {
        return axios.get(CARS_REST_API_URL + "/" + id, { headers: AuthHeader() });
    }

    getAllCars() {
        return axios.get(CARS_REST_API_URL, { headers: AuthHeader() });
    }

    createCarAndAssignIt(id, car) {
        return axios.post(CARS_REST_API_URL + "/" + id, car, { headers: AuthHeader() });
    }

    updateCarStatus(id) {
        return axios.put(CARS_REST_API_URL + "/update-status/" + id, null, { headers: AuthHeader() });
    }

    replaceCustomerCar(id, car) {
        return axios.put(CARS_REST_API_URL + "/replace-customer-car/" + id, car, { headers: AuthHeader() });
    }
}

export default new CarService();