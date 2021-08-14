import React, {useEffect, useState} from 'react';
import NavBarComponent from "../main/NavBarComponent";
import FooterComponent from "../main/FooterComponent";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {useHistory} from "react-router-dom";
import {TextField} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import CarServiceService from "../../service/CarServiceService";
import ServiceTypeService from "../../service/ServiceTypeService";
import Button from "@material-ui/core/Button";
import MechanicService from "../../service/MechanicService";

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
    const [experience, setExperience] = useState(30);
    const [automotiveRepair, setAutomotiveRepair] = useState(30);
    const [engineRepair, setEngineRepair] = useState(30);
    const [importantParts, setImportantParts] = useState(30);
    const [brakeRepair, setBrakeRepair] = useState(30);
    const [isLoading, setIsLoading] = useState(true);
    const [services, setServices] = useState([]);
    const [mostNeededService, setMostNeededService] = useState();
    const [name, setName] = useState();
    const [picture, setPicture] = useState();
    const [description, setDescription] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    const [selectedService, setSelectedService] = useState();


    const submit = () => {
        const mechanic = {
            name: name,
            specialization: selectedService,
            picture: picture,
            description: description,
            experience: experience,
            automotiveRepair: automotiveRepair,
            engineRepair: engineRepair,
            importantParts: importantParts,
            brakeRepair: brakeRepair,
            phoneNumber: phoneNumber,
            email: email
        }
        MechanicService.hireMechanic(mechanic).then(r => {
            console.log(r.data);
            if (r.data) {
                history.push("/mechanics");
            } else {
                alert("Sorry you don't meet the requirements.")
            }
        })
    }


    const selectEmail = (event) => {
        setEmail(event.target.value)
    }

    const selectName = (event) => {
        setName(event.target.value)
    }

    const selectPicture = (event) => {
        setPicture(event.target.value)
    }

    const selectDescription = (event) => {
        setDescription(event.target.value)
    }

    const selectPhoneNumber = (event) => {
        setPhoneNumber(event.target.value)
    }

    const selectExperience = (event, val) => {
        setExperience(val)
    }

    const selectAutomotiveRepair = (event, val) => {
        setAutomotiveRepair(val)
    }

    const selectEngineRepair = (event, val) => {
        setEngineRepair(val)
    }

    const selectImportantParts = (event, val) => {
        setImportantParts(val)
    }

    const selectBrakeRepair = (event, val) => {
        setBrakeRepair(val)
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
                    <img src="https://i.ytimg.com/vi/acCEibz7xms/maxresdefault.jpg" width="700"/>
                    <h4 style={{padding: "20px"}}>Thank you for your interest in working Nea bebe car services. Please fill in your details.</h4>
                    <form className={classes.boot} noValidate autoComplete="off">
                        {/*<div className={classes.root} style={{alignItems: "center"}}>*/}
                            <TextField onChange={selectName} id="standard-basic" label="Name" />
                            <TextField onChange={selectPicture} id="standard-basic" label="Picture" />
                            <TextField onChange={selectDescription} id="standard-basic" label="About me" />
                            <TextField onChange={selectPhoneNumber} id="standard-basic" label="Phone number" />
                            <TextField onChange={selectEmail} id="standard-basic" label="Email" />
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
                        <Button variant="contained" color="primary" style={{margin: "10px"}} onClick={submit}>
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