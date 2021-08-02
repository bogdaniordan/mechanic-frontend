import axios from 'axios';
import AuthHeader from "./AuthHeader";

const MECHANIC_REST_API = 'http://localhost:8080/mechanics';

class MechanicService {

    getMechanic(id) {
        return axios.get(MECHANIC_REST_API + "/" + id, { headers: AuthHeader() });
    }

    getAllMechanics() {
        // console.log(AuthHeader());
        // // const user = JSON.parse(localStorage.getItem('user'));
        // // console.log(user.jwtToken)
        return axios.get(MECHANIC_REST_API, { headers: AuthHeader() });
    }

    deleteMechanic(id) {
        return axios.delete(MECHANIC_REST_API + "/" + id, { headers: AuthHeader() })
    }

    createMechanic(mechanic) {
        return axios.post(MECHANIC_REST_API, mechanic, { headers: AuthHeader() })
    }

    updateMechanic(mechanic, id) {
        return axios.put(MECHANIC_REST_API + "/" + id, mechanic, { headers: AuthHeader() })
    }

    getMechanicsBySpecialization(specialization) {
        return axios.get(MECHANIC_REST_API + "/get-by-specialization/" + specialization, { headers: AuthHeader() })
    }
}


export default new MechanicService();