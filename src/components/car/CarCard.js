import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CarService from "../../service/CarService";

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
        flex: "1 0 33%",
        margin: "5px",
    },
});

const CarCard = (props) => {
    const classes = useStyles();

    // useEffect(() => {console.log(props.data)})
    const deleteCar = () => {
        CarService.removeCar(props.data.id, JSON.parse(localStorage.getItem("user")).customerId).then(r => {
            console.log(r.data);
        })
    }

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image={props.data.picture}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.data.brandName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                    <Typography variant="body2" component="p">
                        Required service: {props.data.requiredservice}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={deleteCar}>
                    X
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

export default CarCard;
