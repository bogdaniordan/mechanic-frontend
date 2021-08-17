import React, {useState, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import {useHistory, useLocation} from "react-router-dom";
import CustomerService from "../../service/CustomerService";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const CreateCustomerComponent = (props) => {
    const location = useLocation();
    const classes = useStyles();
    const history = useHistory();
    const username = props.match.params.username;
    const [isLoading, setIsLoading] = useState(true)
    const [fullname, setFullname] = useState();
    const [age, setAge] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    const [street, setStreet] = useState();
    const [city, setCity] = useState();
    const [job, setJob] = useState();
    const [gender, setGender] = useState();

    useEffect(() => {
        setFullname(location.state.fullName)
        setIsLoading(false);
    }, [location])

    const register = () => {
        const user = {
            name: fullname,
            email: email,
            phoneNumber: phoneNumber,
            street: street,
            city: city,
            jobPosition: job,
            gender: gender,
            age:age
        }
        CustomerService.addCustomer(user, username).then(r => {
            console.log(r.data);
            if (r.data) {
                history.push("/login");
            }
        })
    }

    const getAge = (event) => {
        setAge(event.target.value)
    }

    const getPhone = (event) => {
        setPhoneNumber(event.target.value)
    }

    const getStreet = (event) => {
        setStreet(event.target.value)
    }

    const getCity = (event) => {
        setCity(event.target.value)
    }

    const getEmail = (event) => {
        setEmail(event.target.value);
    }

    const getJob = (event) => {
        setJob(event.target.value)
    }

    const getGender = (event) => {
        setGender(event.target.value)
    }


    if (!isLoading) {
        return (
            <div>
                <Container component="main" maxWidth="xs" style={{backgroundColor: "white"}}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Enter your details
                        </Typography>
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Age"
                                        autoFocus
                                        onChange={getAge}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Phone number"
                                        autoComplete="lname"
                                        onChange={getPhone}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        autoComplete="email"
                                        onChange={getEmail}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Street"
                                        // autoComplete="email"
                                        onChange={getStreet}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="City"
                                        onChange={getCity}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Job or position"
                                        // autoComplete="current-password"
                                        onChange={getJob}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-helper-label">Gender</InputLabel>
                                        <Select
                                            onChange={getGender}
                                            required
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={register}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                            </Grid>
                        </form>
                    </div>
                </Container>
            </div>
        );
    } else {
        return (
            <h3>Loading...</h3>
        )
    }

};

export default CreateCustomerComponent;