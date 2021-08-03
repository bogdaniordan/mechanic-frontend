import React, {useEffect, useState} from 'react';
import CarService from "../../service/CarService";
import CarServiceService from "../../service/CarServiceService";
import ServiceCard from "./ServiceCard";
import NavBarComponent from "../main/NavBarComponent";

const ServicesComponent = () => {
    const [services, setServices] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        CarServiceService.getAllServiceTypes().then(r => {
            setServices(r.data);
            setIsLoading(false);
            console.log(services)
        })
    },[])

    if (!isLoading) {
        return (
            <div>
                <NavBarComponent />
                <div style={{display: "flex", flexWrap: "wrap", margin: "-10px 0 0 -10px"}}>
                    {
                        services.map(
                            service => <ServiceCard data={service}/>
                        )
                    }
                </div>
            </div>
        );
    } else {
        return (<h3>Loading...</h3>)
    }

};

export default ServicesComponent;