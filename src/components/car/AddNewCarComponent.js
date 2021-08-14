import React, {useState} from 'react';
import {FormControl, FormHelperText, Input, InputLabel, TextField} from "@material-ui/core";
import NavBarComponent from "../main/NavBarComponent";
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Typography from "@material-ui/core/Typography";
import CarService from "../../service/CarService";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    // root: {
    //     '& > *': {
    //         margin: theme.spacing(1),
    //         width: '25ch',
    //     },
    // },
}));

const AddNewCarComponent = (props) => {
    const history = useHistory();
    const customerId = props.match.params.customerId;
    const classes = useStyles();
    const [carBrand, setCarBrand] = useState();
    const [service, setService] = useState();
    const [fuel, setFuel] = useState();
    const [picture, setPicture] = useState();

    const brandChange = (event) => {
        setCarBrand(event.target.value);
    };

    const serviceChange = (event) => {
        setService(event.target.value)
    }

    const fuelChange = (event) => {
        setFuel(event.target.value)
    }

    const getPicture = (event) => {
        setPicture(event.target.value);
    }

    const addCar = () => {
        const car = {
            brandName: carBrand,
            picture: picture,
            fuel: fuel,
            repairedstatus: "NEEDS_REPAIR",
            requiredservice: service
        }
        console.log(car)
        CarService.addCar(customerId, car).then(res => {
            history.push("/profile");
        })
    }

    return (
        <div>
            <NavBarComponent />

            <div className="container emp-profile" style={{marginLeft: "auto", marginRight: "auto", height: "auto"}}>
                <Typography>
                    Add a new car for servicing
                </Typography>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Enter picture url" required onChange={getPicture}/>
                </form>
                <FormControl>
                    <InputLabel htmlFor="age-native-simple">Car brand</InputLabel>
                    <Select
                        native
                        value={carBrand}
                        onChange={brandChange}
                        required
                    >
                        <option aria-label="None" value="" />
                        <option value="Dacia">Dacia</option>
                        <option value="Lamborghini">Lamborghini</option>
                        <option value="Rolls Royce">Rolls Royce</option>
                    </Select>
                    <FormHelperText>Enter a car brand</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="age-native-simple">Required service</InputLabel>
                    <Select
                        native
                        value={service}
                        onChange={serviceChange}
                        required
                    >
                        <option aria-label="None" value="" />
                        <option value="OIL_CHANGE">Oil change, filters and lube</option>
                        <option value="ENGINE_REPAIR">Engine repair</option>
                        <option value="AIR_CONDITIONING_SYSTEM">Air conditioning systems</option>
                        <option value="POWER_STEERING_SYSTEM">Power steering system</option>
                    </Select>
                    <FormHelperText>Enter the service you require.</FormHelperText>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="age-native-simple">Fuel type</InputLabel>
                    <Select
                        native
                        value={fuel}
                        onChange={fuelChange}
                        required
                    >
                        <option aria-label="None" value="" />
                        <option value="PETROL">Petrol</option>
                        <option value="DIESEL">Diesel</option>
                        <option value="ELECTRIC">Electric</option>
                    </Select>
                    <FormHelperText>Enter the the fuel type</FormHelperText>
                </FormControl>
                <br/>
                <Button variant="contained" color="primary" style={{margin: "20px"}} onClick={addCar}>
                    Add car
                </Button>
            </div>
        </div>
    );
};

export default AddNewCarComponent;