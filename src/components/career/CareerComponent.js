import React, {useEffect, useState} from 'react';
import NavBarComponent from "../main/NavBarComponent";
import FooterComponent from "../main/FooterComponent";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import {useHistory} from "react-router-dom";
import {TextField} from "@material-ui/core";

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

// const mark = [
//     {
//         // value: 0,
//         label: "custom"
//     },
//     {
//         value: 25,
//         // label: "custom"
//     },
//     {
//         value: 50,
//         // label: "custom"
//     },
//     {
//         value: 100,
//         // label: "custom"
//     },
// ]

const CareerComponent = () => {
    const classes = useStyles();
    const history = useHistory();
    const [experience, setExperience] = useState();
    const [automotiveRepair, setAutomotiveRepair] = useState();
    const [engineRepair, setEngineRepair] = useState();
    const [importantParts, setImportantParts] = useState();
    const [brakeRepair, setBrakeRepair] = useState();


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

    return (
        <div>
            <NavBarComponent />

                <div className="container emp-profile">
                    <form className={classes.boot} noValidate autoComplete="off">
                        Thank you for your interest in working Nea bebe car services. Please fill in your details.
                        <div className={classes.root} style={{alignItems: "center"}}>
                            <TextField id="standard-basic" label="Name" />
                            <TextField id="standard-basic" label="Picture" />
                            <TextField id="standard-basic" label="About me" />
                            <TextField id="standard-basic" label="Phone number" />
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

                        </div>

                    </form>
                </div>
            <FooterComponent />
        </div>
    );
};

export default CareerComponent;