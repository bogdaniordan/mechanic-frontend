import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

    useEffect(() => {
       console.log(props)
    },[])

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
            {/*<CardActions>*/}
            {/*    <Button size="small" color="primary">*/}
            {/*        Share*/}
            {/*    </Button>*/}
            {/*    <Button size="small" color="primary">*/}
            {/*        Learn More*/}
            {/*    </Button>*/}
            {/*</CardActions>*/}
        </Card>
    );
}

export default ServiceCard;