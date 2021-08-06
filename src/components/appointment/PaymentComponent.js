import React, {useEffect, useState} from 'react';
import NavBarComponent from "../main/NavBarComponent";
import FooterComponent from "../main/FooterComponent";
import {useLocation} from "react-router-dom";

const PaymentComponent = (props) => {
    const location = useLocation();

    useEffect(() => {
        console.log(location.state.appointment)
    },[location])
    return (
        <div>
            <NavBarComponent />
            save payment details to account
            <FooterComponent />
        </div>
    );
};

export default PaymentComponent;