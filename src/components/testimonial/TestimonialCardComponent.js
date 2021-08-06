import React, {useEffect, useState} from 'react';
import ReactStars from "react-rating-stars-component";
import {Rating} from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const TestimonialCardComponent = (props) => {
    const [stars, setStars] = useState();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const receivedRating = props.data.rating;
        let ratingInStars = 0;
        if (receivedRating === "BAD") {
            ratingInStars = 1;
        } else if (receivedRating === "OK") {
            ratingInStars = 2;
        } else if (receivedRating === "GOOD") {
            ratingInStars = 3;
        } else if (receivedRating === "VERY_SATISFIED") {
            ratingInStars = 4;
        } else {
            ratingInStars = 5;
        }
        setStars(ratingInStars);
        setIsLoading(false);
    }, [])

    if (!isLoading) {
        return (
            <div style={{outline: "1px solid black"}}>
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <div>{props.data.rating}</div>
                    {/*<Typography component="legend">Read only</Typography>*/}
                    <Rating name="read-only" value={stars} readOnly />
                    <div>{props.data.comment}</div>
                    <small>Customer: {props.data.customer.name}</small>
                </Box>

            </div>
        );
    } else {
        return (
            <h3>Loading...</h3>
        )
    }

};

export default TestimonialCardComponent;