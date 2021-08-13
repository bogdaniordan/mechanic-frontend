import React, {useEffect, useState} from 'react';
import AppointmentService from "../../service/AppointmentService";
import "./appointmentsHistory.css";
import AuthServiceMechanic from "../../service/AuthServiceMechanic";
import AuthService from "../../service/AuthService";
import AppointmentBarComponent from "./AppointmentBarComponent";

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
    },[])

    const appointmentsByCustomerId = () => {
        AppointmentService.getByCustomerId(AuthService.getCurrentUser().customerId).then(res => {
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
                                                <th>Chat</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                appointments.map(
                                                    appointment => props.type ? <AppointmentBarComponent appointment={appointment} appointmentStatuses={appointmentStatuses} type="mechanic" /> : <AppointmentBarComponent appointment={appointment} appointmentStatuses={appointmentStatuses} />
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
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