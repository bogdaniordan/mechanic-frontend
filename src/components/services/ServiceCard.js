import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MechanicService from "../../service/MechanicService";
import Avatar from "@material-ui/core/Avatar";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        flex: "1 0 33%",
        margin: "35px",
    },
    media: {
        height: 140,
    },
});

const ServiceCard = (props) => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [specializedMechanics, setSpecializedMechanics] = useState();

    useEffect(() => {
        MechanicService.getMechanicsBySpecialization(props.data.upperCaseName).then(r => {
            console.log(r.data)
            setSpecializedMechanics(r.data);
            setIsLoading(false);
        })
    },[])



    if(!isLoading) {
        return (
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={props.data.pictureURL}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {props.data.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.data.description}
                        </Typography>
                        <br/>
                        <Typography variant="body1">
                            ${props.data.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {
                        specializedMechanics.map(
                            specializedMechanic => <Avatar style={{margin: "10px"}} alt={specializedMechanic.name} src={`http://localhost:8080/mechanics/image/${specializedMechanic.id}/download`}/>
                        )
                    }
                {/*    <Button size="small" color="primary">*/}
                {/*        Share*/}
                {/*    </Button>*/}
                {/*    <Button size="small" color="primary">*/}
                {/*        Learn More*/}
                {/*    </Button>*/}
                </CardActions>
            </Card>
        );
    } else {
        return (
            <h3>Loading...</h3>
        )
    }


}

export default ServiceCard;