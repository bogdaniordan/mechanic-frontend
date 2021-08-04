import React from 'react';
import {FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";
import NavBarComponent from "../main/NavBarComponent";
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const AddNewCarComponent = () => {
    const classes = useStyles();
    const [carBrand, setCarBrand] = React.useState();

    const handleChange = (event) => {
        setCarBrand(event.target.value);
        console.log(event.target.value)
    };

    return (
        <div>
            <NavBarComponent />
            <div className="container emp-profile">
                <FormControl>
                    {/*<InputLabel htmlFor="my-input">Email address</InputLabel>*/}
                    {/*<Input id="my-input" aria-describedby="my-helper-text" />*/}
                    {/*<FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>*/}
                    <InputLabel htmlFor="age-native-simple">Car brand</InputLabel>
                    <Select
                        native
                        value={carBrand}
                        onChange={handleChange}
                        // inputProps={{
                        //     name: 'age',
                        //     id: 'age-native-simple',
                        // }}
                    >
                        <option aria-label="None" value="" />
                        <option value="Dacia">Dacia</option>
                        <option value="Lamborghini">Lamborghini</option>
                        <option value="Rolls Royce">Rolls Royce</option>
                    </Select>
                    <FormHelperText>Ce cazan ai?</FormHelperText>
                </FormControl>
            </div>

        </div>
    );
};

export default AddNewCarComponent;