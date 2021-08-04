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


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const MakeAppointmentComponent = (props) => {
    const mechanicId = props.match.params.mechanicId;
    const customerId = JSON.parse(localStorage.getItem("user")).customerId;

    const history = useHistory();
    const classes = useStyles();
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState();
    const [age, setAge] = React.useState('');
    const [isLoading, setIsLoading] = useState(true);


    const setCar = (event) => {
        setSelectedCar(event.target.value);
    };

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem("user"))) {
            history.push("/");
            alert("You have to be logged in.")
        }
        CarService.getCarsByCustomerId(customerId).then(result => {
            console.log(result.data);
            setCars(result.data);
            setIsLoading(false);
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
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                // value={age}
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
                                {/*<MenuItem value={10}>Ten</MenuItem>*/}
                                {/*<MenuItem value={20}>Twenty</MenuItem>*/}
                                {/*<MenuItem value={30}>Thirty</MenuItem>*/}
                            </Select>
                            <FormHelperText>Please select a car.</FormHelperText>
                        </FormControl>
                    </div>
                </div>
            );
        } else {
            // if the user didn't register any cars
            return (<div>
                <NavBarComponent />
                <div className="container emp-profile">
                    <h4>You have to vehicles registered!</h4>
                </div>
                    </div>)
        }
    } else {
        return (<h3>Loading...</h3>)
    }

};

export default MakeAppointmentComponent;