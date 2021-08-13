import React, {useEffect, useState} from 'react';
import CarService from "../../service/CarService";
import CarServiceService from "../../service/CarServiceService";
import ServiceCard from "./ServiceCard";
import NavBarComponent from "../main/NavBarComponent";
import Typography from "@material-ui/core/Typography";
import FooterComponent from "../main/FooterComponent";

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
            <div style={{backgroundColor: "darkBlue"}}>
                <NavBarComponent />
                <div className="container emp-profile">
                    <Typography variant="h6" component="h2" style={{fontWeight: "bold"}}>
                        Nea bebe car services - Soseaua de centura nr.14
                    </Typography>
                    <Typography component="p">
                        Here at Nea bebe our technicians service all makes and models of cars and trucks. We specialize in Cummins, Duramax and Power Stroke diesels, however we enjoy working on all vehicles. We do everything from routine maintenance to engine and transmission swaps, fuel system repair and much more.We use the best parts in the industry to fix your car or truck right the first time so you can stay on the road and not in the shop.
                    </Typography>
                </div>

                {/*<div style={{display: "flex", flexWrap: "wrap", margin: "-10px 0 0 -10px"}}>*/}
                <div className="container emp-profile" style={{display: "flex", flexWrap: "wrap"}}>
                {
                        services.map(
                            service => <ServiceCard data={service}/>
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

export default ServicesComponent;