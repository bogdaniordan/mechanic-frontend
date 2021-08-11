import axios from "axios";
import AuthHeader from "./AuthHeader";


const APPOINTMENT_API_URL = "http://localhost:8080/appointments";

class AppointmentService{

    check() {
        AuthHeader();
    }

    createNewAppointment(mechanicId, customerId, carId, appointment) {
        return axios.post(`${APPOINTMENT_API_URL}/mechanic/${mechanicId}/customer/${customerId}/car/${carId}`, appointment, { headers: AuthHeader() })
    }

    getByCustomerId(id) {
        return axios.get(APPOINTMENT_API_URL + "/" + id, { headers: AuthHeader() });
    }

    getAppointmentsByMechanicId(id) {
        return axios.get(`${APPOINTMENT_API_URL}/get-by-mechanic/${id}`, { headers: AuthHeader() })
    }
}

export default new AppointmentService();
