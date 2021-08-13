import axios from "axios";
import AuthHeader from "./AuthHeader";

const MESSAGE_REST_API_URL = 'http://localhost:8080/messages';


class MessageService {

    sendMessage(message, appointmentId) {
        return axios.post(`${MESSAGE_REST_API_URL}/${appointmentId}`, message, { headers: AuthHeader() });
    }

}

export default new MessageService();