import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import MechanicService from "../../service/MechanicService";
import NavBarComponent from "../main/NavBarComponent";
import FooterComponent from "../main/FooterComponent";
import CarServiceService from "../../service/CarServiceService";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import Rating from '@material-ui/lab/Rating';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },

}));

const TestimonialComponent = (props) => {
    const carId = props.match.params.carId
    const customerId = JSON.parse(localStorage.getItem("user")).customerId;
    const classes = useStyles();
    const history = useHistory()
    const [initialRating, setInitialRating] = useState(0);
    const [selectedMechanic, setSelectedMechanic] = useState();
    const [selectedRating, setSelectedRating] = useState();

    const [mechanics, setMechanics] = useState([]);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const setMechanic = (event) => {
        setSelectedMechanic(event.target.value);
    }

    const selectRating = (rating) => {
        console.log(rating)
        setSelectedRating(rating);
    }

    useEffect(() => {
        MechanicService.getAllMechanics().then(res => {
            console.log(res.data);
            setMechanics(res.data);
            CarServiceService.getAllServiceTypes().then(r => {
                console.log(r.data);
                setServices(r.data);
                setIsLoading(false);
            })
        })
    }, [])

    if (!isLoading) {
        return (
            <div style={{minHeight: "100%"}}>
                <NavBarComponent />
                <div className="container emp-profile" style={{textAlign: "center"}}>
                    <Typography variant="h6">
                        Please leave your review here
                    </Typography>
                    <br/>
                    {
                        selectedMechanic ? (
                            <Avatar src={selectedMechanic[1]} className={classes.large} style={{margin: "auto"}}/>
                        ) : ("")
                    }
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-helper-label">Mechanic</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            onChange={setMechanic}
                            required
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                mechanics.map(
                                    //mechanic state is saved as a list of [mechanicId, mechanicPicture]
                                    mechanic => <MenuItem key={mechanic.id} picture={mechanic.picture} value={[mechanic.id, mechanic.picture]}>{mechanic.name}</MenuItem>

                                )
                            }
                        </Select>
                        <FormHelperText>Please select the mechanic.</FormHelperText>
                    </FormControl>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Please rate your service</Typography>
                        <Rating
                            name="simple-controlled"
                            value={initialRating}
                            onChange={(event, newValue) => {
                                selectRating(newValue);
                            }}
                        />
                    </Box>
                </div>
                <FooterComponent />
            </div>
        );
    } else {
        return (<h3>Loading...</h3>)
    }

};

export default TestimonialComponent;