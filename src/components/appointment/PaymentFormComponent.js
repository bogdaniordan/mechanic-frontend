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
    const [isLoading, setIsLoading] = useState();

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
        console.log(event.target.value);
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

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Payment method
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name" onChange={getName}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cardNumber"
                        label="Card number"
                        fullWidth
                        autoComplete="cc-number"
                        onChange={getCardNumber}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField required id="expDate" label="Expiry date" fullWidth autoComplete="cc-exp" onChange={getDate}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        required
                        id="cvv"
                        label="CVV"
                        helperText="Last three digits on signature strip"
                        fullWidth
                        autoComplete="cc-csc"
                        onChange={getCvv}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="secondary" onClick={saveCardDetails}>
                        Save card details
                    </Button>
                    {/*<FormControlLabel*/}
                    {/*    control={<Checkbox color="secondary" name="saveCard" value="yes" onClick={handleCheck}/>}*/}
                    {/*    label="Remember credit card details for next time"*/}
                    {/*/>*/}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default PaymentFormComponent;