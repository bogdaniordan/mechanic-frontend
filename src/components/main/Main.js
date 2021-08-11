import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch, useHistory} from "react-router-dom";
import HomePageComponent from "../main/HomePageComponent"
import LoginComponent from "../authentication/LoginComponent";
import RegisterComponent from "../authentication/RegisterComponent"
import ServicesComponent from "../services/ServicesComponent";
import UserProfileComponent from "../user/UserProfileComponent"
import UpdateUserComponent from "../user/UpdateUserComponent";
import AddNewCarComponent from "../car/AddNewCarComponent";
import MechanicComponent from "../mechanic/MechanicComponent";
import MakeAppointmentComponent from "../appointment/MakeAppointmentComponent"
import TestimonialComponent from "../testimonial/TestimonialComponent";
import CreateCustomerComponent from "../user/CreateCustomerComponent";
import MechanicProfileComponent from "../mechanic/MechanicProfileComponent";
import CheckoutComponent from "../appointment/CheckoutComponent"
import CareerComponent from "../career/CareerComponent";
import MechanicHomeComponent from "../../mechanic-admin/components/main/MechanicHomeComponent";
import AuthService from "../../service/AuthService";

const Main = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route path={"/"} exact component={HomePageComponent} />
                    <Route path={"/login"} component={LoginComponent} />
                    <Route path={"/register"} component={RegisterComponent}/>
                    <Route path={"/services"} render={() => AuthService.getCurrentUser ? <ServicesComponent /> : <Redirect to="/" />} />
                    <Route path={"/profile"} render={() => AuthService.getCurrentUser() ? <UserProfileComponent /> : <Redirect to="/" />} />
                    <Route path={"/add-new-car/:customerId"} render={() => AuthService.getCurrentUser ? <AddNewCarComponent /> : <Redirect to="/" />}/>
                    <Route path={"/mechanics"} render={() => AuthService.getCurrentUser ? <MechanicHomeComponent /> : <Redirect to="/" />} />
                    <Route path={"/make-appointment/:mechanicId"} render={() => AuthService.getCurrentUser ? <MakeAppointmentComponent /> : <Redirect to="/" />} />
                    <Route path={"/add-testimonial/:carId"} render={() => AuthService.getCurrentUser ? <TestimonialComponent /> : <Redirect to="/" />} />
                    <Route path={"/register-details/:username"} render={() => AuthService.getCurrentUser ? <CreateCustomerComponent /> : <Redirect to="/" />} />
                    <Route path={"/mechanic/:id"} render={() => AuthService.getCurrentUser ? <MechanicProfileComponent /> : <Redirect to="/" />} />
                    <Route path={"/payment"} render={() => AuthService.getCurrentUser ? <CheckoutComponent /> : <Redirect to="/" />} />
                    <Route path={"/update-profile"} render={() => AuthService.getCurrentUser ? <UpdateUserComponent /> : <Redirect to="/" />} />
                    <Route path={"/careers"} render={() => AuthService.getCurrentUser ? <CareerComponent /> : <Redirect to="/" />} />
                    <Route path={"/mechanic/home"} render={() => AuthService.getCurrentUser ? <MechanicHomeComponent /> : <Redirect to="/" />} />
                </Switch>
            </Router>
        </div>

    );
};

export default Main;