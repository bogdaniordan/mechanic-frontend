import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppointmentService from "../../service/AppointmentService";
import AppointmentCardComponent from "../appointment/AppointmentCardComponent";
import {map} from "react-bootstrap/ElementChildren";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
});

const CardExampleGroups = () => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [appointments, setAppointments] = useState();

    useEffect(() => {
        AppointmentService.getByCustomerId(JSON.parse(localStorage.getItem("user")).customerId).then(res => {
            console.log(res.data);
            setAppointments(res.data);
            setIsLoading(false);
        })
    }, [])

    if (!isLoading) {
        return (
            <div style={{display: "flex"}}>
                {
                    appointments.map(
                        appointment => <AppointmentCardComponent data={appointment} />
                    )
                }
            </div>
        )
    } else {
        return <h3>Loading...</h3>
    }

}

export default CardExampleGroups