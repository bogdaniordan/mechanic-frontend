import axios from "axios";
import AuthHeader from "./AuthHeader";


const APPOINTMENT_API_URL = "http://localhost:8080/appointments";

class AppointmentService{
    createNewAppointment(mechanicId, customerId, appointment) {
        return axios.post(APPOINTMENT_API_URL + "/" + mechanicId + "/" + customerId, appointment, { headers: AuthHeader() });
    }

    getByCustomerId(id) {
        return axios.get(APPOINTMENT_API_URL + "/" + id, { headers: AuthHeader() });
    }
}

export default new AppointmentService();
