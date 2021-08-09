import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppointmentService from "../../service/AppointmentService";
import AppointmentCardComponent from "../appointment/AppointmentCardComponent";
import "./appointmentsHistory.css";

const CardExampleGroups = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [appointments, setAppointments] = useState();

    useEffect(() => {
        AppointmentService.getByCustomerId(JSON.parse(localStorage.getItem("user")).customerId).then(res => {
            console.log(res.data);
            setAppointments(res.data);
            setIsLoading(false);
        })
    }, [])

    const isDateBeforeToday = (date) => {
        return new Date(date) < new Date(new Date().toDateString());
    }

    if (!isLoading) {
        return (
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="header-title pb-3 mt-0">Appointments</h5>
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead>
                                            <tr className="align-self-center">
                                                <th>Car</th>
                                                <th>Mechanic</th>
                                                <th>Service</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Past or future</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                appointments.map(
                                                    appointment =>  <tr>
                                                        <td>{appointment.car.brandName}</td>
                                                        <td><img src={appointment.mechanic.picture}
                                                                 alt="" className="thumb-sm rounded-circle mr-2"/> {appointment.mechanic.name}
                                                        </td>
                                                        <td>{appointment.requiredservice}</td>
                                                        <td>{appointment.localDate}</td>
                                                        <td>${appointment.price}</td>
                                                        <td>
                                                            {appointment.localDate ? (
                                                                isDateBeforeToday(appointment.localDate) ? (<span className="badge badge-boxed badge-soft-warning">done</span>) : (<span className="badge badge-boxed badge-soft-primary">future</span>)
                                                            ) : ("")}
                                                        </td>
                                                    </tr>
                                                )
                                            }

                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="pt-3 border-top text-right"><a href="#"
                                                                                   className="text-primary">View
                                        all <i className="mdi mdi-arrow-right"></i></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    } else {
        return <h3>Loading...</h3>
    }

}

export default CardExampleGroups