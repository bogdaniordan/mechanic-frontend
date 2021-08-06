import axios from "axios";
import AuthHeader from "./AuthHeader";

const TESTIMONIALS_API_URL = "http://localhost:8080/testimonials"

class TestimonialsService {
    getTestimonialsByMechanic(id) {
        return axios.get(TESTIMONIALS_API_URL + "/" + id, {headers: AuthHeader() })
    }

    addTestimonial(testimonial, mechanicId, customerId, carId)  {
        return axios.post(`${TESTIMONIALS_API_URL}/create-testimonial/${mechanicId}/${customerId}/${carId}`, testimonial, {headers: AuthHeader() });
    }

    carHasTestimonial(carId) {
        return axios.get(`${TESTIMONIALS_API_URL}/reviewed-car/${carId}`, {headers: AuthHeader() })
    }
}

export default new TestimonialsService();