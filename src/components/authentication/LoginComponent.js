import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AuthService from "../../service/AuthService";
import {useHistory} from "react-router-dom";
import AuthServiceMechanic from "../../service/AuthServiceMechanic";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1606577924006-27d39b132ae2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const LoginComponent = (props) => {
    const classes = useStyles();

    const history = useHistory();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const getUsername = (event) => {
        setUsername(event.target.value);
    }

    const getPassword = (event) => {
        setPassword(event.target.value);
    }

    const getEmail = (event) => {
        setEmail(event.target.value);
    }

    useEffect(() => {
        // console.log(props.loginType).
        if (props.loginType) {
            if (AuthService.getCurrentUser()) {
                history.push("/");
            }
        } else {
            if (AuthServiceMechanic.getCurrentUser()) {
                history.push("/")
            }
        }

    },[])

    const authenticate = () => {
        if (props.loginType) {
            if (!username || !password) {
                alert("Some fields are empty");
            } else {
                authenticateCustomer();
            }
        } else {
                if (!email || !password) {
                    alert("Some fields are empty");
                } else {
                    authenticateMechanic()
                }
            }
    }

    const authenticateCustomer = () => {
        const credentials = {
            username: username,
            password: password
        }
        AuthService.login(credentials).then(r => {
            if (AuthService.getCurrentUser()) {
                history.push("/");
            }
        })
    }

    const authenticateMechanic = () => {
        const credentials = {
            email: email,
            password: password
        }
        AuthServiceMechanic.login(credentials).then(r => {
            console.log(r.data)
            if (AuthServiceMechanic.getCurrentUser()) {
                history.push("/");
            }
        })
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {props.loginType ? "Sign in as customer" : "Sign in as mechanic"}
                    </Typography>
                    <form className={classes.form} noValidate>
                        {props.loginType ? (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Username"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={getUsername}
                            />
                        ) : (
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={getEmail}
                            />
                        )}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={getPassword}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={authenticate}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                {props.loginType ? (<Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>) : (
                                    <Link href="/register-mechanic" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                )}
                                {/*<Link href="/register" variant="body2">*/}
                                {/*    {"Don't have an account? Sign Up"}*/}
                                {/*</Link>*/}
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}

export default LoginComponent;