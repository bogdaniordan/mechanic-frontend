import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NavBarComponent from "../main/NavBarComponent";
import CarService from "../../service/CarService";
import Typography from "@material-ui/core/Typography";
import {useHistory} from "react-router-dom";
import FooterComponent from "../main/FooterComponent";
import CarServiceService from "../../service/CarServiceService";
import 'date-fns';
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AppointmentService from "../../service/AppointmentService";



const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    // container: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    // },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));


const MakeAppointmentComponent = (props) => {
    const mechanicId = props.match.params.mechanicId;
    const customerId = JSON.parse(localStorage.getItem("user")).customerId;

    const history = useHistory();
    const classes = useStyles();
    const [cars, setCars] = useState([]);
    const [services, setServices] = useState([]);


    const [selectedCarId, setSelectedCarId] = useState();
    const [selectedService, setSelectedService] = useState();
    const [time, setTime] = useState();
    const [date, setDate] = useState();
    const [notes, setNotes] = useState();

    const [isLoading, setIsLoading] = useState(true);

    const makeAppointment = () => {
        const appointment = {
            requiredservice: selectedService,
            localDate: date,
            time: time,
            notes: notes
        }
        AppointmentService.createNewAppointment(mechanicId, customerId, selectedCarId, appointment).then(res => {
            console.log(res.data);
            if (res.data) {
                history.push("/");
            }
        })
    }

    const setCar = (event) => {
        setSelectedCarId(event.target.value);
    };

    const selectService = (event) => {
        setSelectedService(event.target.value);
    }

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };
    
    const handleDateChange = (event) => {
        setDate(event.target.value);
    }

    const handleNotesChange = (event) => {
        setNotes(event.target.value)
    }

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("user"))) {
            history.push("/");
            alert("You have to be logged in.")
        }
        CarService.getCarsByCustomerId(customerId).then(result => {
            console.log(result.data);
            setCars(result.data);
            CarServiceService.getAllServiceTypes().then(r => {
                console.log(r.data);
                setServices(r.data);
                setIsLoading(false);
            })
        })
    }, [])

    if (!isLoading) {
        if (cars) {
            return (
                <div>
                    <NavBarComponent />
                    <div className="container emp-profile">
                        <Typography variant="h6">
                            Please fill in your details
                        </Typography>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">Car</InputLabel>
                            <Select
                                // labelId="demo-simple-select-helper-label"
                                // id="demo-simple-select-helper"
                                onChange={setCar}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    cars.map(
                                        car => <MenuItem key={car.id} value={car.id}>{car.brandName}</MenuItem>

                                    )
                                }
                            </Select>
                            <FormHelperText>Please select a car.</FormHelperText>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="demo-simple-select-helper-label">Service</InputLabel>
                            <Select
                                // labelId="demo-simple-select-helper-label"
                                // id="demo-simple-select-helper"
                                onChange={selectService}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {
                                    services.map(
                                        service => <MenuItem key={service.id} value={service.upperCaseName}>{service.name}</MenuItem>

                                    )
                                }
                            </Select>
                            <FormHelperText>Please select a service.</FormHelperText>
                        </FormControl>
                        <form className={classes.container} noValidate>
                            <TextField
                                id="time"
                                label="Pick a time"
                                type="time"
                                defaultValue="07:30"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                onChange={handleTimeChange}
                            />
                        </form>
                        <br/>
                        <form className={classes.container} noValidate>
                            <TextField
                                // id="date"
                                label="Appointment date"
                                type="date"
                                defaultValue="2017-05-24"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={handleDateChange}
                            />
                        </form>
                        <br/>
                        <TextField
                            id="outlined-multiline-static"
                            // label="Multiline"
                            multiline
                            rows={4}
                            defaultValue="Additional notes"
                            variant="outlined"
                            onChange={handleNotesChange}
                        />
                        <br/>
                        <br/>
                        <Button variant="contained" color="primary" onClick={makeAppointment}>
                            Make appointment
                        </Button>
                    </div>
                    <FooterComponent />
                </div>
            );
        } else {
            // if the user didn't register any cars
            return (<div>
                <NavBarComponent />
                <div className="container emp-profile">
                    <h4>You have to vehicles registered!</h4>
                </div>
                <FooterComponent />
            </div>)
        }
    } else {
        return (<h3>Loading...</h3>)
    }

};

export default MakeAppointmentComponent;