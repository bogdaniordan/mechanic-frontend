import React from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import HomePageComponent from "../main/HomePageComponent"
import LoginComponent from "../authentication/LoginComponent";
import RegisterComponent from "../authentication/RegisterComponent"
import ServicesComponent from "../services/ServicesComponent";
import UserProfileComponent from "../user/UserProfileComponent"
import AddNewCarComponent from "../car/AddNewCarComponent";
import MechanicComponent from "../mechanic/MechanicComponent";
import MakeAppointmentComponent from "../appointment/MakeAppointmentComponent"
import TestimonialComponent from "../testimonial/TestimonialComponent";
import CreateCustomerComponent from "../user/CreateCustomerComponent";
import MechanicProfileComponent from "../mechanic/MechanicProfileComponent";

const Main = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path={"/"} exact component={HomePageComponent} />
                    <Route path={"/login"} component={LoginComponent} />
                    <Route path={"/register"} component={RegisterComponent}/>
                    <Route path={"/services"} component={ServicesComponent} />
                    <Route path={"/profile"} component={UserProfileComponent} />
                    <Route path={"/add-new-car/:customerId"} component={AddNewCarComponent}/>
                    <Route path={"/mechanics"} component={MechanicComponent} />
                    <Route path={"/make-appointment/:mechanicId"} component={MakeAppointmentComponent} />
                    <Route path={"/add-testimonial/:carId"} component={TestimonialComponent} />
                    <Route path={"/register-details/:username"} component={CreateCustomerComponent} />
                    <Route path={"/mechanic/:id"} component={MechanicProfileComponent} />
                </Switch>
            </Router>
        </div>

    );
};

export default Main;