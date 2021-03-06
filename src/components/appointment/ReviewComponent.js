import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import CardDetailsService from "../../service/CardDetailsService";
import CarServiceService from "../../service/CarServiceService";


const useStyles = makeStyles((theme) => ({
    listItem: {
        padding: theme.spacing(1, 0),
    },
    total: {
        fontWeight: 700,
    },
    title: {
        marginTop: theme.spacing(2),
    },
}));

const ReviewComponent = (props) => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const [address, setAddress] = useState();
    const [payments, setPayments] = useState();

    useEffect(() => {
        CardDetailsService.getCardDetails(props.customer.id).then(r => {
            setAddress([props.customer.email, props.customer.phoneNumber, props.customer.street, props.customer.city, "Romania"]);
            setPayments([
                { name: 'Card holder', detail: r.data.cardOwner },
                { name: 'Card number', detail: r.data.cardNumber },
                { name: 'Expiry date', detail: r.data.expirationDate },
            ])
            setIsLoading(false
            )
        })
    }, [])

    const products = [
        { name: props.data.requiredservice, desc: props.data.localDate, price: "$" + props.data.price },
    ];

    if (!isLoading) {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Appointment summary
                </Typography>
                <span>{props.carIsDiscounted ? "15% Monthly discount for " + props.discountedCarBrand.randomCar : ""}</span>
                <List disablePadding>
                    {products.map((product) => (
                        <ListItem className={classes.listItem} key={product.name}>
                            <ListItemText primary={product.name} secondary={product.desc} />
                            <Typography variant="body2">{product.price}</Typography>
                        </ListItem>
                    ))}

                    <ListItem className={classes.listItem}>
                        <ListItemText primary="Appointment duration"/>
                        <Typography>
                            {props.mechanic.specialization === props.data.requiredservice ? props.service.durationInDays + " days(s) - mechanic is specialized" : props.service.durationInDays + 2 + " days(s) mechanic is not specialized"}
                        </Typography>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        {props.carIsDiscounted ? <ListItemText primary="Discounted Total"/> : <ListItemText primary="Total" />}
                        <Typography variant="subtitle1" className={classes.total}>
                            {props.carIsDiscounted ? "15% OFF - $" + props.data.price * 0.85 : "$" + props.data.price}
                        </Typography>
                    </ListItem>

                </List>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom className={classes.title}>
                            Billing details
                        </Typography>
                        <Typography gutterBottom>{props.customer.name}</Typography>
                        <Typography gutterBottom>{address.join(', ')}</Typography>
                    </Grid>
                    <Grid item container direction="column" xs={12} sm={6}>
                        <Typography variant="h6" gutterBottom className={classes.title}>
                            Payment details
                        </Typography>
                        <Grid container>
                            {payments.map((payment) => (
                                <React.Fragment key={payment.name}>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{payment.name}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography gutterBottom>{payment.detail}</Typography>
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    } else {
        return (
            <h3>Loading...</h3>
        )
    }

}

export default ReviewComponent;