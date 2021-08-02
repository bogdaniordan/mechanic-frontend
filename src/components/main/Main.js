import React from 'react';
import {Route, Router, Switch} from "react-router-dom";
import HomePageComponent from "../main/HomePageComponent"

const Main = () => {
    return (
        <Router>
            <Switch>
                <Route path={"/"} exact component={HomePageComponent}/>
            </Switch>
        </Router>
    );
};

export default Main;