import axios from 'axios';
import AuthHeader from "./AuthHeader";
import AuthServiceMechanic from "./AuthServiceMechanic";

const MECHANIC_REST_API = 'http://localhost:8080/mechanics';

class MechanicService {

    getMechanic(id) {
        return axios.get(MECHANIC_REST_API + "/" + id, { headers: AuthHeader() });
    }

    getAllMechanics() {
        return axios.get(MECHANIC_REST_API, { headers: AuthHeader() });
    }
    updateMechanic(mechanic, id) {
        return axios.put(MECHANIC_REST_API + "/" + id, mechanic, { headers: AuthHeader() })
    }

    getMechanicsBySpecialization(specialization) {
        return axios.get(MECHANIC_REST_API + "/get-by-specialization/" + specialization, { headers: AuthHeader() })
    }

    hireMechanic(mechanic) {
        return axios.post(`${MECHANIC_REST_API}/hire-mechanic`, mechanic, { headers: AuthHeader() });
    }

    setImage(mechanicId, file) {
        return axios.post(`${MECHANIC_REST_API}/image/upload/${mechanicId}`, file, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + AuthServiceMechanic.getCurrentUser().token
            }
        })
    }
}


export default new MechanicService();