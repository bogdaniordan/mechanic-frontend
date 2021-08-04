import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";

import { Link } from "react-router-dom";
import AuthService from "../../service/AuthService";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Appbar() {
    const classes = useStyles();
    const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());
    const history = useHistory();

    function logOut() {
        AuthService.logout();
        history.push("/");
    }

    return (
        <div>
            <AppBar position="static" style={{ marginBottom: "3%" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        CarService
                    </IconButton>
                    {currentUser ? (
                        <React.Fragment>
                            <Typography variant="h6">
                                <Button color="inherit">
                                    <Link
                                        to={`/profile`}
                                        className="nav-link"
                                        style={{ color: "white" }}
                                    >
                                        <strong>My profile</strong>
                                    </Link>
                                </Button>
                                <Button color="inherit">
                                    <Link
                                        to={`/services`}
                                        className="nav-link"
                                        style={{ color: "white" }}
                                    >
                                        Services
                                    </Link>
                                </Button>
                                <Button color="inherit">
                                    <Link
                                        to={`/mechanics`}
                                        className="nav-link"
                                        style={{ color: "white" }}
                                    >
                                        Mechanics
                                    </Link>
                                </Button>
                                <Button color="inherit">
                                    <Link
                                        to={`/myProfile/${currentUser.id}/appointments`}
                                        className="nav-link"
                                        style={{ color: "white" }}
                                    >
                                        My appointments
                                    </Link>
                                </Button>
                            </Typography>
                            {/*<Typography variant="h6" className={classes.title}></Typography>*/}
                            <Typography
                                className={classes.dateText}
                                color="textSecondary"
                                variant="body1"
                                style={{ color: "white" }}
                            >
                                <Typography variant="h6" className={classes.title}>
                                    <Button color="inherit" onClick={logOut}>
                                        Logout
                                    </Button>
                                </Typography>
                            </Typography>
                        </React.Fragment>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <Typography variant="h6" className={classes.title}>
                                <Button color="inherit">
                                    <Link
                                        to={`/login`}
                                        className="nav-link"
                                        style={{ color: "white" }}
                                    >
                                        Login
                                    </Link>
                                </Button>
                            </Typography>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}