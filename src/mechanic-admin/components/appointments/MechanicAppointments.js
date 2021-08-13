import React from 'react';
import MechanicNavBarComponent from "../main/MechanicNavBarComponent";
import AppointmentsComponent from "../../../components/user/AppointmentsComponent";

const MechanicAppointments = () => {

    return (
        <div>
            <MechanicNavBarComponent />
            <div className="container emp-profile">
                <AppointmentsComponent type={"mechanic"}/>
            </div>
        </div>
    );
};

export default MechanicAppointments;