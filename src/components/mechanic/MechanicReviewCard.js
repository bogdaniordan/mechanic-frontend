import React, {useEffect, useState} from 'react';
import "./MechanicReviews.css"
import TestimonialsService from "../../service/TestimonialsService";
import Typography from "@material-ui/core/Typography";

const MechanicReviewCard = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [mappedRatings, setMappedRatings] = useState();
    const [allRatings, setAllRatings] = useState();
    const [avgRating, setAvgRating] = useState();

    const getAvgRating = () => {
        let rating = 0;
        let ratingsNumber = 0;
        for(let [key, value] of Object.entries(mappedRatings)) {
            if (key === "BAD") {
                rating += value * 1;
            } else if (key === "OK") {
                rating += value * 2;
            } else if (key === "GOOD") {
                rating += value * 3;
            } else if (key === "VERY_SATISFIED") {
                rating += value * 4;
            } else {
                rating += value * 5;
            }
            ratingsNumber += value;
        }
        setAvgRating(rating/ratingsNumber);
    }

    useEffect(() => {
        console.log(props.reviews)
        TestimonialsService.getMechanicMappedRatings(props.mechanicId).then(r => {
            setMappedRatings(r.data)
            console.log(r.data)
            TestimonialsService.getAllRatings().then(res => {
                setAllRatings(res.data.reverse());
                if (mappedRatings) {
                    getAvgRating();
                }
                setIsLoading(false);
            })
        })
    }, [])

    if (!isLoading) {
        return (
            <React.Fragment>
                <div className="container-fluid px-1 py-5 mx-auto">
                    <div className="row justify-content-center">
                        <Typography variant="h6" component="h2">
                            Reviews for {props.name}.
                        </Typography>
                        <div className="col-xl-7 col-lg-8 col-md-10 col-12 text-center mb-5">
                            <div className="card">
                                <div className="row justify-content-left d-flex">
                                    <div className="col-md-4 d-flex flex-column">
                                        <div className="rating-box">
                                            <h1 className="pt-4">{avgRating}</h1>
                                            <p className="">out of 5</p>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="rating-bar0 justify-content-center">
                                            <table className="text-left mx-auto">
                                                {
                                                    allRatings.map(
                                                        rating => <tr>
                                                            <td className="rating-label">{rating ? rating : 0}</td>
                                                            <td className="rating-bar">
                                                                <div className="bar-container">
                                                                    {mappedRatings[rating] ? <div className="bar-4"></div> : <div className="bar-1"></div>}
                                                                </div>
                                                            </td>
                                                            <td className="text-right">{mappedRatings[rating] ? mappedRatings[rating] : 0}</td>
                                                        </tr>
                                                    )
                                                }

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                props.reviews.map(
                                    review => <div className="card">
                                        <div className="row d-flex">
                                            <div className=""><img className="profile-pic"
                                                                   src={review.customer.picture} /></div>
                                            <div className="d-flex flex-column">
                                                <h3 className="mt-2 mb-0">{review.customer.name}</h3>
                                            </div>
                                            <div className="ml-auto">
                                                <p className="text-muted pt-5 pt-sm-3">Service: {(review.serviceType).toLowerCase().replace("_", " ")}</p>
                                            </div>
                                        </div>
                                        <div className="row text-left">
                                            <h4 className="blue-text mt-3">"{review.comment}"</h4>
                                            {/*<p className="content">If you really enjoy spending your vacation 'on water' or*/}
                                            {/*    would like to try something new and exciting for the first time.</p>*/}
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    } else {
        return (
            <h3>Loading...</h3>
        )
    }


};

export default MechanicReviewCard;