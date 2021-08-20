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
import MechanicRegisterComponent from "../../mechanic-admin/components/login/MechanicRegisterComponent";
import AuthService from "../../service/AuthService";
import AuthServiceMechanic from "../../service/AuthServiceMechanic";
import MechanicAppointments from "../../mechanic-admin/components/appointments/MechanicAppointments";
import UpdateMechanicProfile from "../mechanic/UpdateMechanicProfile";

const Main = (props) => {
    return (
        <div>
            <Router>
                <Switch>
                    {/*// customer app part*/}
                    <Route path={"/"} exact render={() => !AuthServiceMechanic.getCurrentUser() ? <HomePageComponent /> : <Redirect to="/home-mechanic" />} />
                    <Route path={"/login"} component={() => <LoginComponent loginType={"customer"} />} />
                    <Route path={"/register"} component={RegisterComponent}/>
                    <Route path={"/services"} render={() => AuthService.getCurrentUser ? <ServicesComponent /> : <Redirect to="/" />} />
                    <Route path={"/profile"} render={() => AuthService.getCurrentUser() ? <UserProfileComponent /> : <Redirect to="/" />} />
                    <Route path={"/add-new-car/:customerId"} render={(props) => AuthService.getCurrentUser ? <AddNewCarComponent {...props} /> : <Redirect to="/" />}/>
                    <Route path={"/mechanics"} render={() => AuthService.getCurrentUser ? <MechanicComponent /> : <Redirect to="/" />} />
                    <Route path={"/make-appointment/:mechanicId"} render={(props) => AuthService.getCurrentUser ? <MakeAppointmentComponent {...props} /> : <Redirect to="/" />} />
                    <Route path={"/add-testimonial/:carId"} render={(props) => AuthService.getCurrentUser ? <TestimonialComponent {...props} /> : <Redirect to="/" />} />
                    <Route path={"/register-details/:username"} render={(props) => AuthService.getCurrentUser ? <CreateCustomerComponent {...props} /> : <Redirect to="/" />} />
                    <Route path={"/mechanic/:id"} render={(props) => AuthService.getCurrentUser ? <MechanicProfileComponent {...props} /> : <Redirect to="/" />} />
                    <Route path={"/payment"} render={() => AuthService.getCurrentUser ? <CheckoutComponent /> : <Redirect to="/" />} />
                    <Route path={"/update-profile"} render={() => AuthService.getCurrentUser ? <UpdateUserComponent /> : <Redirect to="/" />} />
                    <Route path={"/careers"} render={() => AuthService.getCurrentUser ? <CareerComponent /> : <Redirect to="/" />} />
                    {/*// mechanic app part*/}
                    <Route path={"/home-mechanic"} render={() => AuthServiceMechanic.getCurrentUser ? <MechanicHomeComponent /> : <Redirect to="/" />} />
                    <Route path={"/login-mechanic"} component={LoginComponent} />
                    <Route path={"/register-mechanic"} component={MechanicRegisterComponent} />
                    <Route path={"/appointments-mechanic"} render={() => AuthServiceMechanic.getCurrentUser ? <MechanicAppointments /> : <Redirect to="/" />} />
                    <Route path={"/profile-mechanic"} render={() => AuthServiceMechanic.getCurrentUser ? <MechanicProfileComponent type="mechanic" /> : <Redirect to="/" />} />
                    <Route path={"/update-mechanic"} render={() => AuthServiceMechanic.getCurrentUser ? <UpdateMechanicProfile /> : <Redirect to="/" />}/>
                </Switch>
            </Router>
        </div>

    );
};

export default Main;