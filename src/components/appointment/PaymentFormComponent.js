import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from "@material-ui/core/Button";
import CardDetailsService from "../../service/CardDetailsService";

const PaymentFormComponent = (props) => {
    const [name, setName] = useState();
    const [cardNumber, setCardNumber] = useState();
    const [date, setDate] = useState();
    const [cvv, setCvv] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [cardDetailsFromDB, setCardDetailsFromDB] = useState();

    useEffect(() => {
        CardDetailsService.getCardDetails(props.data).then(res => {
            console.log(res.data);
            setCardDetailsFromDB(res.data);
            setIsLoading(false);
        })
    }, [])

    const getName = (event) => {
        setName(event.target.value);
    }

    const getCardNumber = (event) => {
        setCardNumber(event.target.value);
    }

    const getDate = (event) => {
        setDate(event.target.value);
    }

    const getCvv = (event) => {
        setCvv(event.target.value);
    }

    const saveCardDetails = () => {
        const cardDetails = {
            cardOwner: name,
            cardNumber: cardNumber,
            expirationDate: date,
            cvv: cvv
        }
        console.log(cardDetails)
        CardDetailsService.saveCardDetails(props.data, cardDetails).then(res => {
            console.log(res.data)
        })
    }

    if (!isLoading) {
        return (
            <React.Fragment>
                <Typography variant="h6" gutterBottom>
                    Payment method
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            defaultValue={cardDetailsFromDB ? cardDetailsFromDB.cardOwner : ""}
                            id="cardName" helperText="Name on card" fullWidth autoComplete="cc-name" onChange={getName}/>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id="cardNumber"
                            helperText="Card number"
                            fullWidth
                            autoComplete="cc-number"
                            onChange={getCardNumber}
                            defaultValue={cardDetailsFromDB ? cardDetailsFromDB.cardNumber : ""}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField required id="expDate" defaultValue={cardDetailsFromDB ? cardDetailsFromDB.expirationDate : ""} helperText="Expiry date" fullWidth autoComplete="cc-exp" onChange={getDate}/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            defaultValue={cardDetailsFromDB ? cardDetailsFromDB.cvv : ""}
                            // label="CVV"
                            helperText="CVV"
                            fullWidth
                            autoComplete="cc-csc"
                            onChange={getCvv}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary" onClick={saveCardDetails}>
                            Save card details
                        </Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    } else {
        return (
            <h3>
                Loading...
            </h3>
        )
    }

}

export default PaymentFormComponent;