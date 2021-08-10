import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import NavBarComponent from "./NavBarComponent"
import FooterComponent from "./FooterComponent";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {DiscountContext} from "../contexts/DiscountContext";


const HomePageComponent = () => {
    const discounterCarBrand = useContext(DiscountContext).randomCar;

    return (
        <div>
            <NavBarComponent />
            <Carousel infiniteLoop={true} >
                <div>
                    <img src="https://empiremotorworld.com.my/wp-content/uploads/2017/10/car-banner1.jpg" />
                    <p className="legend">This month, we offer 15% off for all oil change services.</p>
                </div>
                <div>
                    <img src="https://st4.depositphotos.com/16060632/22443/v/1600/depositphotos_224438194-stock-illustration-four-mechanics-maintenance-repair-car.jpg" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src="http://sscarlink.com/wp-content/themes/sscarlink/images/banner01.jpg" />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
            <div className="container emp-profile">
                this month {discounterCarBrand} gets 15% off
            </div>

            <FooterComponent />
        </div>
    );
};

export default HomePageComponent;