import React, {useEffect, useState} from 'react';
import NavBarComponent from "../main/NavBarComponent";
import FooterComponent from "../main/FooterComponent";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {useHistory} from "react-router-dom";
import {TextField} from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import CarService from "../../service/CarService";
import CarServiceService from "../../service/CarServiceService";
import ServiceTypeService from "../../service/ServiceTypeService";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    boot: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    root: {
        width: 300,
    },
}));

function valuetext(value) {
    return `${value}°C`;
}

const CareerComponent = () => {
    const classes = useStyles();
    const history = useHistory();
    const [experience, setExperience] = useState();
    const [automotiveRepair, setAutomotiveRepair] = useState();
    const [engineRepair, setEngineRepair] = useState();
    const [importantParts, setImportantParts] = useState();
    const [brakeRepair, setBrakeRepair] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [mostNeededService, setMostNeededService] = useState();

    const [selectedService, setSelectedService] = useState();


    const selectExperience = (event, val) => {
        console.log(val);
        setExperience(event.target.value)
    }

    const selectAutomotiveRepair = (event, val) => {
        console.log(val);
        setAutomotiveRepair(event.target.value)
    }

    const selectEngineRepair = (event, val) => {
        console.log(val);
        setEngineRepair(event.target.value)
    }

    const selectImportantParts = (event, val) => {
        console.log(val);
        setImportantParts(event.target.value)
    }

    const selectBrakeRepair = (event, val) => {
        console.log(val);
        setBrakeRepair(event.target.value)
    }

    const selectSpecialization = (event) => {
        setSelectedService(event.target.value);
    }

    useEffect(() => {
            CarServiceService.getAllServiceTypes().then(r => {
                console.log(r.data);
                setServices(r.data);
                ServiceTypeService.getMostNeededSpecialization().then(res => {
                    console.log(res.data);
                    setMostNeededService(res.data)
                    setIsLoading(false);
                })
            })
    }, [])

    if (!isLoading) {
        return (
            <div>
                <NavBarComponent />

                <div className="container emp-profile">
                    <form className={classes.boot} noValidate autoComplete="off">
                        {/*Thank you for your interest in working Nea bebe car services. Please fill in your details.*/}
                        {/*<div className={classes.root} style={{alignItems: "center"}}>*/}
                            <TextField id="standard-basic" label="Name" />
                            <TextField id="standard-basic" label="Picture" />
                            <TextField id="standard-basic" label="About me" />
                            <TextField id="standard-basic" label="Phone number" />
                            <br/>
                            <Select
                                // labelId="demo-simple-select-helper-label"
                                // id="demo-simple-select-helper"
                                onChange={selectSpecialization}
                                label="Specialization"
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
                            <br/>
                            <br/>
                            Please rate your overall skills in the following domains
                            <br/>
                            <Typography id="discrete-slider" gutterBottom>
                                Experience
                            </Typography>
                            <Slider
                                defaultValue={30}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={10}
                                // marks={mark}
                                marks
                                min={10}
                                max={100}
                                onChange={selectExperience}
                            />
                            <Typography id="discrete-slider" gutterBottom>
                                Automotive repair
                            </Typography>
                            <Slider
                                defaultValue={30}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                onChange={selectAutomotiveRepair}
                                min={10}
                                max={100}
                            />
                            <Typography id="discrete-slider" gutterBottom>
                                Engine repair
                            </Typography>
                            <Slider
                                defaultValue={30}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                onChange={selectEngineRepair}
                                min={10}
                                max={100}
                            />
                            <Typography id="discrete-slider" gutterBottom>
                                Important parts
                            </Typography>
                            <Slider
                                defaultValue={30}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={10}
                                marks
                                onChange={selectImportantParts}
                                min={10}
                                max={100}
                            />
                            <Typography id="discrete-slider" gutterBottom>
                                Brake repair
                            </Typography>
                            <Slider
                                defaultValue={30}
                                getAriaValueText={valuetext}
                                aria-labelledby="discrete-slider"
                                valueLabelDisplay="auto"
                                step={10}
                                onChange={selectBrakeRepair}
                                marks
                                min={10}
                                max={100}
                            />
                        {/*</div>*/}
                        <p>Please note that our most needed specialization is: <strong>{mostNeededService.name}</strong>, although we can accept other applicants as well.</p>
                        <Button variant="contained" color="primary" style={{margin: "10px"}}>
                            Submit
                        </Button>
                    </form>
                </div>
                <FooterComponent />
            </div>
        );
    } else {
        return (
            <h3>Loading...</h3>
        )
    }

};

export default CareerComponent;