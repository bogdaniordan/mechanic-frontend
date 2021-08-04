import React, {useEffect, useState} from 'react';
import NavBarComponent from "../main/NavBarComponent";
import MechanicService from "../../service/MechanicService";
import MechanicCard from "./MechanicCard";


const MechanicComponent = () => {
    const [mechanics, setMechanics] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        MechanicService.getAllMechanics().then(r => {
            setMechanics(r.data);
            setIsLoading(false);
        })
    })

    if (!isLoading) {
        return (
            <div>
                <NavBarComponent />
                <div className="container emp-profile" style={{display: "flex", flexWrap: "wrap"}}>
                    {
                        mechanics.map(
                            mechanic => <MechanicCard data={mechanic}/>
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