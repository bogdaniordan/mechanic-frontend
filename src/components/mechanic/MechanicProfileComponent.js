import React, {useEffect, useState} from 'react';
import NavBarComponent from "../main/NavBarComponent";
import FooterComponent from "../main/FooterComponent";
import Button from "@material-ui/core/Button";
import MechanicService from "../../service/MechanicService";
import TestimonialsService from "../../service/TestimonialsService";
import AppointmentService from "../../service/AppointmentService";
import TestimonialCardComponent from "../testimonial/TestimonialCardComponent";
import {useHistory} from "react-router-dom";
import AppointmentCardComponent from "../appointment/AppointmentCardComponent";
import AuthServiceMechanic from "../../service/AuthServiceMechanic";
import MechanicNavBarComponent from "../../mechanic-admin/components/main/MechanicNavBarComponent";
import MechanicReviewCard from "./MechanicReviewCard";


const MechanicProfileComponent = (props) => {
    const id = !props.type ? props.match.params.id : AuthServiceMechanic.getCurrentUser().id;
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [mechanic, setMechanic] = useState();
    const [testimonials, setTestimonials] = useState([]);
    const [appointments, setAppointments] = useState([]);


    useEffect(() => {
        MechanicService.getMechanic(id).then(res => {
            setMechanic(res.data);
            // console.log(res.data);
            TestimonialsService.getTestimonialsByMechanic(id).then(res => {
                setTestimonials(res.data);
                // console.log(res.data);
                AppointmentService.getAppointmentsByMechanicId(id).then(res => {
                    setAppointments(res.data);
                    // console.log(res.data);
                    setIsLoading(false);
                })
            })
        })
    }, [])

    const makeAppointment = () => {
        history.push(`/make-appointment/${id}`)
    }

    if (!isLoading) {
        return (
            <div>
                {!props.type ? <NavBarComponent /> : <MechanicNavBarComponent />}
                <div className="container emp-profile">
                    <div className="container">
                        <div className="main-body">
                            <div className="row gutters-sm">
                                <div className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <img src={`http://localhost:8080/mechanics/image/${mechanic.id}/download`} alt="Admin"
                                                     className="rounded-circle" width="150"/>
                                                <div className="mt-3">
                                                    <h4>{mechanic.name}</h4>
                                                    <p className="text-secondary mb-1">{mechanic.position}</p>
                                                    <p className="text-muted font-size-sm">Bucharest, Romania</p>
                                                    {!props.type ? (
                                                        <Button variant="contained" color="secondary" onClick={makeAppointment}>
                                                            APPOINTMENT
                                                        </Button>
                                                    ): ("")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card mt-3">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                         className="feather feather-twitter mr-2 icon-inline text-info">
                                                        <path
                                                            d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                                    </svg>
                                                    Twitter
                                                </h6>
                                                <span className="text-secondary">{(mechanic.name).toLowerCase().replace(" ", "_") + "@twitter.com"}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                         className="feather feather-instagram mr-2 icon-inline text-danger">
                                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                    </svg>
                                                    Instagram
                                                </h6>
                                                <span className="text-secondary">{(mechanic.name).toLowerCase().replace(" ", "_") + "@insta"}</span>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                         stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                         className="feather feather-facebook mr-2 icon-inline text-primary">
                                                        <path
                                                            d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                                    </svg>
                                                    Facebook
                                                </h6>
                                                <span className="text-secondary">{(mechanic.name).toLowerCase().replace(" ", "_") + "@fb.net"}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {mechanic.email}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Phone</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {mechanic.phoneNumber}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Specialization</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {(mechanic.specialization).toLowerCase().replace("_", " ")}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row gutters-sm">
                                        <div className="col-sm-6 mb-3">
                                            <div className="card h-100">
                                                <div className="card-body">
                                                    <h6 className="d-flex align-items-center mb-3"><i
                                                        className="material-icons text-info mr-2"></i>Skills</h6>

                                                    <small>Automotive repair</small>
                                                    <div className="progress mb-3" style={{height: "5px"}}>
                                                        <div className="progress-bar bg-primary" role="progressbar"
                                                             style={{width: "80%"}} aria-valuenow={mechanic.automotiveRepair} aria-valuemin="0"
                                                             aria-valuemax="100"></div>
                                                    </div>
                                                    <small>Brake repair</small>
                                                    <div className="progress mb-3" style={{height: "5px"}}>
                                                        <div className="progress-bar bg-primary" role="progressbar"
                                                             style={{width: "72%"}} aria-valuenow={mechanic.brakeRepair} aria-valuemin="0"
                                                             aria-valuemax="100"></div>
                                                    </div>
                                                    <small>Engine repair</small>
                                                    <div className="progress mb-3" style={{height: "5px"}}>
                                                        <div className="progress-bar bg-primary" role="progressbar"
                                                             style={{width: "89%"}} aria-valuenow={mechanic.engineRepair} aria-valuemin="0"
                                                             aria-valuemax="100"></div>
                                                    </div>
                                                    <small>Experience</small>
                                                    <div className="progress mb-3" style={{height: "5px"}}>
                                                        <div className="progress-bar bg-primary" role="progressbar"
                                                             style={{width: "55%"}} aria-valuenow={mechanic.experience} aria-valuemin="0"
                                                             aria-valuemax="100"></div>
                                                    </div>
                                                    <small>Important parts</small>
                                                    <div className="progress mb-3" style={{height: "5px"}}>
                                                        <div className="progress-bar bg-primary" role="progressbar"
                                                             style={{width: "66%"}} aria-valuenow={mechanic.importantParts} aria-valuemin="0"
                                                             aria-valuemax="100"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*{*/}
                                    {/*    // !props.type ? (*/}
                                    {/*        <div className="row gutters-sm">*/}
                                    {/*            <div className="col-sm-6 mb-3">*/}
                                    {/*                <div className="card h-100">*/}
                                    {/*                    <div className="card-body">*/}
                                    {/*                        <h6 className="d-flex align-items-center mb-3"><i*/}
                                    {/*                            className="material-icons text-info mr-2"></i>Past reviews</h6>*/}
                                    {/*                        {*/}
                                    {/*                            testimonials ? (*/}
                                    {/*                                testimonials.map(*/}
                                    {/*                                    testimonial => <TestimonialCardComponent key={testimonial.id} data={testimonial}/>*/}
                                    {/*                                )*/}
                                    {/*                            ) : (*/}
                                    {/*                                <p>No reviews yet!</p>*/}
                                    {/*                            )*/}
                                    {/*                        }*/}
                                    {/*                    </div>*/}
                                    {/*                </div>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                        {/*) : ("")*/}
                                    {/*}*/}



                                    {
                                        !props.type ? (
                                            <div className="row gutters-sm">
                                                <div className="col-sm-6 mb-3">
                                                    <div className="card h-100">
                                                        <div className="card-body">
                                                            <h6 className="d-flex align-items-center mb-3"><i
                                                                className="material-icons text-info mr-2"></i>Past appointments</h6>
                                                            {
                                                                appointments ? (
                                                                    appointments.map(
                                                                        appointment => <AppointmentCardComponent key={appointment.id} data={appointment}/>
                                                                    )
                                                                ) : (
                                                                    <p>No appointments yet.</p>
                                                                )
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : ("")
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container emp-profile">
                    <MechanicReviewCard mechanicId={id} reviews={testimonials} name={mechanic.name}/>
                </div>
                {!props.type ? <FooterComponent /> : ""}
            </div>
        );
    } else {
        return (
            <h3>Loading...</h3>
        )
    }
};

export default MechanicProfileComponent;