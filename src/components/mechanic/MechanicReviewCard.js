import React, {useEffect} from 'react';
import "./MechanicReviews.css"

const MechanicReviewCard = (props) => {

    useEffect(() => {
        console.log(props.reviews)
    })

    return (
        <React.Fragment>
            <div className="container-fluid px-1 py-5 mx-auto">
                <div className="row justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-10 col-12 text-center mb-5">
                        <div className="card">
                            <div className="row justify-content-left d-flex">
                                <div className="col-md-4 d-flex flex-column">
                                    <div className="rating-box">
                                        <h1 className="pt-4">4.0</h1>
                                        <p className="">out of 5</p>
                                    </div>
                                    <div><span className="fa fa-star star-active mx-1"></span> <span
                                        className="fa fa-star star-active mx-1"></span> <span
                                        className="fa fa-star star-active mx-1"></span> <span
                                        className="fa fa-star star-active mx-1"></span> <span
                                        className="fa fa-star star-inactive mx-1"></span></div>
                                </div>
                                <div className="col-md-8">
                                    <div className="rating-bar0 justify-content-center">
                                        <table className="text-left mx-auto">
                                            <tr>
                                                <td className="rating-label">Excellent</td>
                                                <td className="rating-bar">
                                                    <div className="bar-container">
                                                        <div className="bar-5"></div>
                                                    </div>
                                                </td>
                                                <td className="text-right">123</td>
                                            </tr>
                                            <tr>
                                                <td className="rating-label">Good</td>
                                                <td className="rating-bar">
                                                    <div className="bar-container">
                                                        <div className="bar-4"></div>
                                                    </div>
                                                </td>
                                                <td className="text-right">23</td>
                                            </tr>
                                            <tr>
                                                <td className="rating-label">Average</td>
                                                <td className="rating-bar">
                                                    <div className="bar-container">
                                                        <div className="bar-3"></div>
                                                    </div>
                                                </td>
                                                <td className="text-right">10</td>
                                            </tr>
                                            <tr>
                                                <td className="rating-label">Poor</td>
                                                <td className="rating-bar">
                                                    <div className="bar-container">
                                                        <div className="bar-2"></div>
                                                    </div>
                                                </td>
                                                <td className="text-right">3</td>
                                            </tr>
                                            <tr>
                                                <td className="rating-label">Terrible</td>
                                                <td className="rating-bar">
                                                    <div className="bar-container">
                                                        <div className="bar-1"></div>
                                                    </div>
                                                </td>
                                                <td className="text-right">0</td>
                                            </tr>
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
                                            <div>
                                                <p className="text-left"><span className="text-muted">{review.rating}</span> <span
                                                    className="fa fa-star star-active ml-3"></span> <span
                                                    className="fa fa-star star-active"></span> <span
                                                    className="fa fa-star star-active"></span> <span
                                                    className="fa fa-star star-active"></span> <span
                                                    className="fa fa-star star-inactive"></span></p>
                                            </div>
                                        </div>
                                        <div className="ml-auto">
                                            <p className="text-muted pt-5 pt-sm-3">{(review.serviceType).toLowerCase().replace("_", " ")}</p>
                                        </div>
                                    </div>
                                    <div className="row text-left">
                                        <h4 className="blue-text mt-3">{review.comment}</h4>
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
};

export default MechanicReviewCard;