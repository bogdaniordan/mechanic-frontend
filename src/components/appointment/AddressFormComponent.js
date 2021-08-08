import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const AddressFormComponent = (props) => {
    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Please fill in your billing details
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    Firstname
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        // label="First name"
                        defaultValue={props.data.user.firstName}
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    Last name
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        defaultValue={props.data.user.secondName}
                        // label="Last name"
                        fullWidth
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    Address
                    <TextField
                        required
                        id="address1"
                        name="address1"
                        // label="Address line 1"
                        defaultValue={props.data.street}
                        fullWidth
                        autoComplete="shipping address-line1"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    City
                    <TextField
                        required
                        id="city"
                        name="city"
                        // label="City"
                        defaultValue={props.data.city}
                        fullWidth
                        autoComplete="shipping address-level2"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    Country
                    <TextField id="state" name="state" defaultValue="Romania" fullWidth />
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default AddressFormComponent;