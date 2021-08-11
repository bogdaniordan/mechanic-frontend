import React, {useEffect, useState} from 'react';
import MechanicNavBarComponent from "../main/MechanicNavBarComponent";
import AppointmentService from "../../../service/AppointmentService";
import AuthServiceMechanic from "../../../service/AuthServiceMechanic";

const MechanicAppointments = () => {

    useEffect(() => {
        AppointmentService.getAppointmentsByMechanicId(AuthServiceMechanic.getCurrentUser().id).then(r => {
            console.log(r.data);
        })
    }, [])

    return (
        <div>
            <MechanicNavBarComponent />
            <div className="container emp-profile">

            </div>
        </div>
    );
};

export default MechanicAppointments;