import React, {useEffect, useState} from 'react';
import NavBarComponent from "../main/NavBarComponent";
import MechanicService from "../../service/MechanicService";
import MechanicCard from "./MechanicCard";
import Typography from "@material-ui/core/Typography";
import FooterComponent from "../main/FooterComponent";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CarServiceService from "../../service/CarServiceService";
import CarService from "../../service/CarService";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const MechanicComponent = () => {
    const [mechanics, setMechanics] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();
    const [sortingSpecialization, setSortingSpecialization] = useState('');
    const [specializations, setSpecializations] = useState();

    const handleChange = (event) => {
        console.log(event.target.value)
        setSortingSpecialization(event.target.value);
        if (event.target.value === "All") {
            MechanicService.getAllMechanics().then(r => setMechanics(r.data))
        } else {
            MechanicService.getMechanicsBySpecialization(event.target.value).then(r => setMechanics(r.data))
        }
    };

    useEffect(() => {
        MechanicService.getAllMechanics().then(r => {
            setMechanics(r.data);
            CarServiceService.getAllServiceTypes().then(r => {
                console.log(r.data);
                setSpecializations(r.data);
                setIsLoading(false);
            })
        })
    },[])

    if (!isLoading) {
        return (
            <div style={{backgroundColor: "darkBlue"}}>
                <NavBarComponent />

                <div className="container emp-profile" >
                    <Typography variant="h4" style={{fontWeight: "bold"}}>
                        Meet our certified experts
                    </Typography>
                    <br/>
                    <Typography variant="h6">
                        Our staff is certified to work on Cummins, Duramax and Powerstroke Diesel Engines. We know diesel like nobody else and can fix problems other shops are not equipped to handle. Trucks or cars with diesel engines are our passion.
                    </Typography>
                </div>

                <div className="container emp-profile">
                    <FormControl className={classes.formControl}>
                        Filter by specialization
                        {/*<InputLabel id="demo-simple-select-helper-label">Specialization</InputLabel>*/}
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={sortingSpecialization}
                            onChange={handleChange}
                        >
                            <MenuItem value="All">
                                <em>All</em>
                            </MenuItem>
                            {
                                specializations.map(
                                    specialization => <MenuItem value={specialization.upperCaseName}>{specialization.name}</MenuItem>

                                )
                            }
                        </Select>
                        {/*<FormHelperText>Some important helper text</FormHelperText>*/}
                    </FormControl>
                </div>

                <div className="container emp-profile" style={{display: "flex", flexWrap: "wrap"}}>


                    {
                        mechanics.map(
                            mechanic => <MechanicCard key={mechanic.id} data={mechanic}/>
                        )
                    }
                </div>
                <FooterComponent />
            </div>
        );
    } else {
        return (<h3>Loading...</h3>)
    }

};

export default MechanicComponent;