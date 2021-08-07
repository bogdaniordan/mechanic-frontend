import axios from "axios";
import AuthHeader from "./AuthHeader";

const CARD_DETAILS_SERVICE_API_URL = "http://localhost:8080/card-details";

class CardDetailsService {

    saveCardDetails(id, cardDetails) {
        return axios.post(`${CARD_DETAILS_SERVICE_API_URL}/add-payment-details/${id}`, cardDetails,{ headers: AuthHeader() });
    }

    getCardDetails(id) {
        return axios.get(`${CARD_DETAILS_SERVICE_API_URL}/get-card/${id}`,{ headers: AuthHeader() })
    }
}

export default new CardDetailsService;