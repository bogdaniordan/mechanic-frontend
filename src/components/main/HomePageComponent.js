import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavBarComponent from "./NavBarComponent"
import FooterComponent from "./FooterComponent";

const HomePageComponent = () => {
    return (
        <div>
            <NavBarComponent />
            this month rolls royce gets 15% off

            BAGA UN CAROUSEL
            <FooterComponent />
        </div>
    );
};

export default HomePageComponent;