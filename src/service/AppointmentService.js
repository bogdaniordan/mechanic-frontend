import axios from "axios";
import AuthHeader from "./AuthHeader";


const APPOINTMENT_API_URL = "http://localhost:8080/appointments";

class AppointmentService{

    createNewAppointment(mechanicId, customerId, carId, appointment) {
        return axios.post(`${APPOINTMENT_API_URL}/mechanic/${mechanicId}/customer/${customerId}/car/${carId}`, appointment, { headers: AuthHeader() })
    }

    getByCustomerId(id) {
        return axios.get(APPOINTMENT_API_URL + "/" + id, { headers: AuthHeader() });
    }

    getAppointmentsByMechanicId(id) {
        return axios.get(`${APPOINTMENT_API_URL}/get-by-mechanic/${id}`, { headers: AuthHeader() })
    }

    getStatuses() {
        return axios.get(`${APPOINTMENT_API_URL}/get-all-statuses`, { headers: AuthHeader() });
    }
    
    setStatus(status, id) {
        return axios.get(`${APPOINTMENT_API_URL}/set-status/${status}/${id}`, { headers: AuthHeader() });
    }

    getNewAppointmentsNumber() {
        return axios.get(`${APPOINTMENT_API_URL}/new-appointments-number`, { headers: AuthHeader() })
    }
}

export default new AppointmentService();
