import React, {useState, useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import {Link, useHistory} from "react-router-dom";
import AuthService from "../../../service/AuthService";


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


const MechanicNavBarComponent = () => {
    const classes = useStyles();
    // const [currentUser, setcurrentUser] = useState(AuthService.getCurrentUser());
    const history = useHistory();

    return (
        <div>

        </div>
    );
};

export default MechanicNavBarComponent;