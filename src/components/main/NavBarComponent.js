import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {Link, useHistory} from "react-router-dom";
import AuthService from "../../service/AuthService";
import Config from "../chatbot/Config"
import ActionProvider from "../chatbot/ActionProvider"
import MessageParser from "../chatbot/MessageParser"
import Chatbot from "react-chatbot-kit";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import AlarmIcon from '@material-ui/icons/Alarm';
import AppointmentService from "../../service/AppointmentService";
import {getNewMessages} from "../functionality/NewMessages";

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
const NavBarComponent = () => {
    const classes = useStyles();
    const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);
    const [appointments, setAppointments] = useState();

    const [showBot, toggleBot] = useState(false);

    useEffect(() => {
        if (currentUser) {
            AppointmentService.getByCustomerId(AuthService.getCurrentUser().customerId).then(r => {
                setAppointments(r.data);
                setIsLoading(false);
            })
        } else {
            setIsLoading(false);
        }
    }, [])

    const saveMessages = (messages) => {
        localStorage.setItem("chat_messages", JSON.stringify(messages));
    };

    const getNotifications = () => {
        for(let i = 0; i < appointments.length; i++) {
            if (appointments[i].appointmentStatus !== "NEW") {
                appointments[i].appointmentStatus === "DECLINED" ? toast.error(`Appointment with ${appointments[i].mechanic.name} has been ${appointments[i].appointmentStatus}.`) : toast.success(`Appointment with ${appointments[i].mechanic.name} has been ${appointments[i].appointmentStatus}.`)
            }
            if (appointments[i].appointmentStatus === "DONE") {
                toast.success(`Your ${appointments[i].car.brandName} has been repaired!!!`);
            }
            getNewMessages("mechanic", appointments[i])
        }
    }

    const loadMessages = () => {
        return JSON.parse(localStorage.getItem("chat_messages"));
    };

    const logOut = () => {
        AuthService.logout();
        history.push("/");
    }

    const home = () => {
        history.push("/");
    }

    const careers = () => {
        history.push("/careers")
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
                                </Typography>
                                <Typography
                                    className={classes.dateText}
                                    color="textSecondary"
                                    variant="body1"
                                    style={{ color: "white" }}
                                >
                                    <Typography variant="h6" className={classes.title}>
                                        <Button color="inherit" onClick={careers}>
                                            Join us
                                        </Button>
                                    </Typography>
                                </Typography>
                                <Typography
                                    className={classes.dateText}
                                    color="textSecondary"
                                    variant="body1"
                                    style={{ color: "white"}}
                                >
                                    <Typography variant="h6" className={classes.title}>
                                        <Button color="inherit" onClick={logOut}>
                                            Logout
                                        </Button>
                                    </Typography>
                                </Typography>
                                {showBot && (
                                    <Chatbot
                                        config={Config}
                                        actionProvider={ActionProvider}
                                        messageHistory={loadMessages()}
                                        messageParser={MessageParser}
                                        saveMessages={saveMessages}
                                    />
                                )}
                                <Button color="inherit" onClick={() => toggleBot((prev) => !prev)}>Chat</Button>

                                <IconButton color="secondary" aria-label="add an alarm" onClick={getNotifications} style={{float: "right"}}>
                                    <AlarmIcon />
                                </IconButton>


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
                                            Login as customer
                                        </Link>
                                    </Button>
                                    <Button color="inherit">
                                        <Link
                                            to={`/register`}
                                            className="nav-link"
                                            style={{ color: "white" }}
                                        >
                                            Register as customer
                                        </Link>
                                    </Button>
                                    <Button color="inherit">
                                        <Link
                                            to={`/login-mechanic`}
                                            className="nav-link"
                                            style={{ color: "white" }}
                                        >
                                            Login as mechanic
                                        </Link>
                                    </Button>
                                    <Button color="inherit">
                                        <Link
                                            to={`/register-mechanic`}
                                            className="nav-link"
                                            style={{ color: "white" }}
                                        >
                                            Register as mechanic
                                        </Link>
                                    </Button>
                                </Typography>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    } else {
        return (
            <h3>Loading...</h3>
        )
    }


}

export default NavBarComponent;