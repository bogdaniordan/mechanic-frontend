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
import {TextField} from "@material-ui/core";
import TestimonialsService from "../../service/TestimonialsService";
import Button from "@material-ui/core/Button";


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
    const [selectedMechanic, setSelectedMechanic] = useState();
    const [selectedRating, setSelectedRating] = useState();
    const [comment, setComment] = useState();

    const [selectedService, setSelectedService] = useState();
    const [mechanics, setMechanics] = useState([]);
    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const setMechanic = (event) => {
        setSelectedMechanic(event.target.value);
    }

    const handleComment = (event) => {
        setComment(event.target.value);
    }

    const selectRating = (rating) => {
        console.log(rating);
        if (rating === 1) {
            setSelectedRating("BAD");
        } else if (rating === 2) {
            setSelectedRating("OK");
        } else if (rating === 3) {
            setSelectedRating("GOOD");
        } else if (rating === 4) {
            setSelectedRating("VERY_SATISFIED");
        } else {
            setSelectedRating("EXCELLENT")
        }
    }

    const selectService = (event) => {
        setSelectedService(event.target.value);
    }

    const leaveTestimonial = () => {
        const testimonial = {
            rating: selectedRating,
            comment: comment,
            serviceType: selectedService
        }
        console.log(testimonial);
        TestimonialsService.addTestimonial(testimonial, selectedMechanic, customerId, carId).then(r => {
            console.log(r.data);
            if (r.data) {
                history.push("/profile");
            }
        })
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
                            <Avatar src={`http://localhost:8080/mechanics/image/${selectedMechanic}/download`} className={classes.large} style={{margin: "auto"}}/>
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
                                    mechanic => <MenuItem key={mechanic.id} picture={mechanic.picture} value={mechanic.id}>{mechanic.name}</MenuItem>

                                )
                            }
                        </Select>
                        <FormHelperText>Please select the mechanic.</FormHelperText>
                    </FormControl>
                    <Box component="fieldset" mb={3} borderColor="transparent">
                        <Typography component="legend">Please rate your service</Typography>
                        <Rating
                            name="simple-controlled"
                            value={selectedRating}
                            onChange={(event, newValue) => {
                                selectRating(newValue);
                            }}
                        />
                    </Box>
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
                    <br/>
                    <Typography>
                        Leave a comment
                    </Typography>
                    <br/>
                    <TextField
                        id="outlined-multiline-static"
                        // label="Multiline"
                        multiline
                        rows={4}
                        // defaultValue="Comment"
                        variant="outlined"
                        onChange={handleComment}
                    />
                    <br/>
                    <Button variant="contained" color="secondary" onClick={leaveTestimonial} style={{margin: "20px"}}>
                        Add
                    </Button>
                </div>
                <FooterComponent />
            </div>
        );
    } else {
        return (<h3>Loading...</h3>)
    }

};

export default TestimonialComponent;