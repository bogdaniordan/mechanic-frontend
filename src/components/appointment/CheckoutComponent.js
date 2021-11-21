import React, {useEffect, useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressFormComponent from './AddressFormComponent';
import PaymentFormComponent from './PaymentFormComponent';
import ReviewComponent from './ReviewComponent';
import {useHistory, useLocation} from "react-router-dom";
import CustomerService from "../../service/CustomerService";
import AppointmentService from "../../service/AppointmentService";
import NavBarComponent from "../main/NavBarComponent";
import CarService from "../../service/CarService";
import {DiscountContext} from "../contexts/DiscountContext";
import MechanicService from "../../service/MechanicService";
import CarServiceService from "../../service/CarServiceService";


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center" style={{color: "white"}}>
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Nea Bebe car services
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

const steps = ['Billing details', 'Payment details', 'Review your order'];

export default function Checkout() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [customer, setCustomer] = useState();
    const [appointment, setAppointment] = useState();
    const location = useLocation();
    const history = useHistory();
    const [carIsDiscounted, setCarIsDiscounted] = useState(false);
    const [mechanic, setMechanic] = useState();
    const discountedCarBrand = useContext(DiscountContext);
    const [service, setService] = useState();


    useEffect(() => {
        setAppointment(location.state.appointment)
        CustomerService.getCustomerById(JSON.parse(localStorage.getItem("user")).customerId).then(r => {
            setCustomer(r.data);
            MechanicService.getMechanic(location.state.mechanicId).then(r => {
                setMechanic(r.data)
                discountedCarChecker()
            })
        })
    },[])

    const discountedCarChecker = () => {
        CarService.carIsDiscounted(location.state.carId, discountedCarBrand.randomCar).then(r => {
            setCarIsDiscounted(r.data);
            getRequestedService();
        })
    }

    const getRequestedService = () => {
        CarServiceService.getAllServiceTypes().then(r => {
            for(let i = 0; i < r.data.length; i++) {
                if (r.data[i].upperCaseName === location.state.appointment.requiredservice) {
                    setService(r.data[i])
                    setIsLoading(false);
                }
            }
        })
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <AddressFormComponent data={customer}/>;
            case 1:
                return <PaymentFormComponent data={customer.id}/>;
            case 2:
                return <ReviewComponent data={location.state.appointment} service={service} customer={customer} mechanic={mechanic} carIsDiscounted={carIsDiscounted} discountedCarBrand={discountedCarBrand}/>;
            default:
                throw new Error('Unknown step');
        }
    }

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        if (activeStep === steps.length - 1) {
            updatePrice();
            setDuration();
            AppointmentService.createNewAppointment(location.state.mechanicId, location.state.customerId, location.state.carId, location.state.appointment).then(res => {
                if (res.data) {
                    updateCarStatus(location.state.carId);
                } else {
                    alert("Something went wrong.")
                }
            })
        }
    };

    const setDuration = () => {
        let duration = service.durationInDays;
        if (location.state.appointment.requiredservice === mechanic.specialization) {
            duration += 2;
        }
        let currentAppointment = appointment;
        currentAppointment.durationInDays = duration;
        setAppointment(currentAppointment);
    }

    const updatePrice = () => {
        if (carIsDiscounted) {
            let currentAppointment = appointment;
            currentAppointment.price = appointment.price * 0.85;
            setAppointment(currentAppointment)
        }
    }

    const updateCarStatus = (id) => {
        CarService.updateCarStatus(id).then(r => {});
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    if (!isLoading) {
        return (
            <React.Fragment>
                <CssBaseline />
                <NavBarComponent />
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Checkout
                        </Typography>
                        <Stepper activeStep={activeStep} className={classes.stepper}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <React.Fragment>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography variant="h5" gutterBottom>
                                        Thank you for your using our services.
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        We have emailed your appointment confirmation, and will
                                        send you an update with 24 before your appointment.
                                    </Typography>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep)}
                                    <div className={classes.buttons}>
                                        {activeStep !== 0 && (
                                            <Button onClick={handleBack} className={classes.button}>
                                                Back
                                            </Button>
                                        )}
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={handleNext}
                                            className={classes.button}
                                        >
                                            {activeStep === steps.length - 1 ? 'Make appointment' : 'Next'}
                                        </Button>
                                    </div>
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    </Paper>
                    <Copyright />
                </main>
            </React.Fragment>
        );
    } else {
        return(
            <h3>Loading...</h3>
        )
    }

}