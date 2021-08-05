import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePageComponent from "../main/HomePageComponent"
import LoginComponent from "../authentication/LoginComponent";
import RegisterComponent from "../authentication/RegisterComponent"
import ServicesComponent from "../services/ServicesComponent";
import UserProfileComponent from "../user/UserProfileComponent"
import AddNewCarComponent from "../car/AddNewCarComponent";
import MechanicComponent from "../mechanic/MechanicComponent";
import MakeAppointmentComponent from "../appointment/MakeAppointmentComponent"

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
                </Switch>
            </Router>
        </div>

    );
};

export default Main;