import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppointmentService from "../../service/AppointmentService";
import AppointmentCardComponent from "../appointment/AppointmentCardComponent";
import "./appointmentsHistory.css";
import AuthServiceMechanic from "../../service/AuthServiceMechanic";
import {InputLabel} from "@material-ui/core";
import Select from "@material-ui/core/Select";

const AppointmentsComponent = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [appointments, setAppointments] = useState();
    const [appointmentStatuses, setAppointmentStatuses] = useState();

    useEffect(() => {
        if(props.type) {
            appointmentsByMechanic();
        } else {
            appointmentsByCustomerId();
        }
    }, [])

    const appointmentsByCustomerId = () => {
        AppointmentService.getByCustomerId(JSON.parse(localStorage.getItem("user")).customerId).then(res => {
            console.log(res.data);
            setAppointments(res.data);
            setIsLoading(false);
        })
    }

    const appointmentsByMechanic = () => {
        AppointmentService.getAppointmentsByMechanicId(AuthServiceMechanic.getCurrentUser().id).then(r => {
            console.log(r.data);
            setAppointments(r.data);
            AppointmentService.getStatuses().then(r => {
                console.log(r.data);
                setAppointmentStatuses(r.data)
                setIsLoading(false);
            })
        })
    }

    const setStatus = (event) => {
        const id = event.target[event.target.selectedIndex].getAttribute('data-id');
        const status = event.target.value;

        console.log(id);

        AppointmentService.setStatus(status, id)
    }

    // const isDateBeforeToday = (date) => {
    //     return new Date(date) < new Date(new Date().toDateString());
    // }

    if (!isLoading) {
        return (
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="header-title pb-3 mt-0">My appointments</h5>
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead>
                                            <tr className="align-self-center">
                                                <th>Car</th>
                                                {props.type ? <th>Customer</th> : <th>Mechanic</th> }
                                                <th>Service</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Notes</th>
                                                {props.type ? <th>Set status</th> : ""}
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                appointments.map(
                                                    appointment =>  <tr>
                                                        <td>{appointment.car.brandName}</td>
                                                        <td><img src={props.type ? appointment.customer.picture : appointment.mechanic.picture}
                                                                 alt="" className="thumb-sm rounded-circle mr-2"/> {props.type ? appointment.customer.name : appointment.mechanic.name}
                                                        </td>
                                                        <td>{appointment.requiredservice}</td>
                                                        <td>{appointment.localDate}</td>
                                                        <td>${appointment.price}</td>
                                                        <td><span className="badge badge-boxed badge-soft-primary">{appointment.appointmentStatus}</span></td>
                                                        <td>{appointment.notes}</td>
                                                        {
                                                            props.type ? (
                                                                <td>
                                                                    <Select
                                                                        native
                                                                        value={appointment.appointmentStatus}
                                                                        onChange={setStatus}
                                                                        required
                                                                    >
                                                                        <option aria-label="None" value="" />
                                                                        {
                                                                            appointmentStatuses.map(
                                                                                appointmentStatus => <option data-id={appointment.id} value={appointmentStatus}>{appointmentStatus}</option>
                                                                            )
                                                                        }
                                                                    </Select>
                                                                </td>
                                                            ) : ("")
                                                        }
                                                        {/*{!props.type ? (*/}
                                                        {/*    <td>*/}
                                                        {/*        {appointment.localDate ? (*/}
                                                        {/*            isDateBeforeToday(appointment.localDate) ? (<span className="badge badge-boxed badge-soft-warning">done</span>) : (<span className="badge badge-boxed badge-soft-primary">future</span>)*/}
                                                        {/*        ) : ("")}*/}
                                                        {/*    </td>*/}
                                                        {/*) : ("")}*/}
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                    {/*<div className="pt-3 border-top text-right"><a href="#"*/}
                                    {/*                                               className="text-primary">View*/}
                                    {/*    all <i className="mdi mdi-arrow-right"></i></a></div>*/}
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

export default AppointmentsComponent;