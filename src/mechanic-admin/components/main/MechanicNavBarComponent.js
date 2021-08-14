import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {Link, useHistory} from "react-router-dom";
import { toast} from "react-toastify";
import AuthServiceMechanic from "../../../service/AuthServiceMechanic";
import AppointmentService from "../../../service/AppointmentService";
import AlarmIcon from "@material-ui/icons/Alarm";
import {getNewMessages} from "../../../components/functionality/NewMessages";


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

toast.configure()
const MechanicNavBarComponent = () => {
    const classes = useStyles();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [newAppointmentsNumber, setNewAppointmentsNumber] = useState();
    const [appointments, setAppointments] = useState();

    useEffect(() => {
        AppointmentService.getNewAppointmentsNumber().then(r => {
            setNewAppointmentsNumber(r.data)
            AppointmentService.getAppointmentsByMechanicId(AuthServiceMechanic.getCurrentUser().id).then(res => {
                setAppointments(res.data)
                setIsLoading(false);
            })
        })
    }, [])

    const logout = () => {
        AuthServiceMechanic.logout();
        history.push("/");
    }

    const home = () => {
        history.push("/home-mechanic")
    }

    const showNotifications = () => {
        for(let i = 0; i < appointments.length; i++) {
            if (appointments[i].appointmentStatus === "NEW") {
                toast.info(`You have a new appointment for ${appointments[i].requiredservice} with a ${appointments[i].car.brandName}.`)
            }
            getNewMessages("customer", appointments[i])
        }

    }

    if (!isLoading) {
        return (
            <div>
                <AppBar position="static" style={{ marginBottom: "3%" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={home}
                        >
                            Home
                        </IconButton>
                        <React.Fragment>
                            <Typography variant="h6">
                                <Button color="inherit">
                                    <Link
                                        to={`/profile-mechanic`}
                                        className="nav-link"
                                        style={{ color: "white" }}
                                    >
                                        <strong>My profile</strong>
                                    </Link>
                                </Button>
                                <Button color="inherit">
                                    <Link
                                        to={`/appointments-mechanic`}
                                        className="nav-link"
                                        style={{ color: "white" }}
                                    >
                                        Appointments {newAppointmentsNumber > 0 ? ` - (${newAppointmentsNumber})` : ""}
                                    </Link>
                                </Button>
                                <Button color="inherit" onClick={logout}>
                                    Logout
                                </Button>
                                <IconButton color="secondary" aria-label="add an alarm" onClick={showNotifications} style={{float: "right"}}>
                                    <AlarmIcon />
                                </IconButton>
                            </Typography>
                        </React.Fragment>
                    </Toolbar>
                </AppBar>
            </div>
        );
    } else {
        return (
            <h3>Loading...</h3>
        )
    }


};

export default MechanicNavBarComponent;