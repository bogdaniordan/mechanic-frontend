import React, {useEffect, useState} from 'react';
import NavBarComponent from "../main/NavBarComponent";
import MechanicService from "../../service/MechanicService";
import MechanicCard from "./MechanicCard";
import Typography from "@material-ui/core/Typography";


const MechanicComponent = () => {
    const [mechanics, setMechanics] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        MechanicService.getAllMechanics().then(r => {
            setMechanics(r.data);
            setIsLoading(false);
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

                <div className="container emp-profile" style={{display: "flex", flexWrap: "wrap"}}>

                    {
                        mechanics.map(
                            mechanic => <MechanicCard key={mechanic.id} data={mechanic}/>
                        )
                    }
                </div>
            </div>
        );
    } else {
        return (<h3>Loading...</h3>)
    }

};

export default MechanicComponent;