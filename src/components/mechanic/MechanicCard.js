import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        flex: "1 0 33%",
        margin: "10px",
    },
    media: {
        height: 140,
    },
});

const ServiceCard = (props) => {
    const history = useHistory();
    const classes = useStyles();

    const makeAppointment = () => {
        history.push(`/make-appointment/${props.data.id}`)
    }

    const goToProfile = () => {
        history.push(`/mechanic/${props.data.id}`)
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.data.picture}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.data.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.data.description}
                    </Typography>
                    <br/>
                    <Typography variant="body2" component="p">
                        {
                            props.data.assignedCars.length === 0 ? "This mechanic doesn't have any appointments." : "Has to repair " + props.data.assignedCars.length + " cars"
                        }
                    </Typography>
                    <br/>
                    <Typography variant="body2" component="p">
                        Specialization: {props.data.specialization}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {/*<Button size="small" color="primary">*/}
                {/*    Share*/}
                {/*</Button>*/}
                <Button variant="contained" color="primary" onClick={makeAppointment}>
                    Appointment
                </Button>
                <Button variant="contained" color="primary" onClick={goToProfile}>
                    Profile
                </Button>
            </CardActions>
        </Card>
    );
}

export default ServiceCard;
