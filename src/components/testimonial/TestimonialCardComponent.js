import React from 'react';
import ReactStars from "react-rating-stars-component";

const TestimonialCardComponent = () => {
    return (
        <div>
            <div className="col col-sm-2">
                <ReactStars
                    count={5}
                    // onChange={getRating}
                    value={3}
                    size={24}
                    activeColor="#ffd700"
                />
            </div>
            <div>EXELLECT JOb</div>
        </div>
    );
};

export default TestimonialCardComponent;