import React, {useEffect, useState} from 'react';
import MechanicNavBarComponent from "../main/MechanicNavBarComponent";
import AppointmentService from "../../../service/AppointmentService";
import AuthServiceMechanic from "../../../service/AuthServiceMechanic";
import AppointmentsComponent from "../../../components/user/AppointmentsComponent";

const MechanicAppointments = () => {
    // const [isLoading, setIsLoading] = useState(true);
    // const [appointments, setAppointments] = useState(true);

    // useEffect(() => {
    //     AppointmentService.getAppointmentsByMechanicId(AuthServiceMechanic.getCurrentUser().id).then(r => {
    //         console.log(r.data);
    //         setIsLoading(false);
    //         setAppointments(r.data);
    //     })
    // }, [])

    // if (!isLoading) {
        return (
            <div>
                <MechanicNavBarComponent />
                <div className="container emp-profile">
                    <AppointmentsComponent type={"mechanic"}/>
                </div>
            </div>
        );
    // } else {
    //     return (
    //         <h3>Loading...</h3>
    //     )
    // }

};

export default MechanicAppointments;