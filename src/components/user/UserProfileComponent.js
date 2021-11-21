import React, {useEffect, useState} from 'react';
import NavBarComponent from "../main/NavBarComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import CarService from "../../service/CarService";
import {useHistory} from "react-router-dom";
import CarCard from "../car/CarCard";
import CustomerService from "../../service/CustomerService";
import Button from "@material-ui/core/Button";
import FooterComponent from "../main/FooterComponent";
import AppointmentsComponent from "./AppointmentsComponent";


const UserProfileComponent = () => {
    const customerId = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).customerId : ""
    const history = useHistory();
    const [cars,  setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [customerDetails, setCustomerDetails] = useState();


    const getCustomerDetails = () => {
        CustomerService.getCustomerById(customerId).then(res => {
            setCustomerDetails(res.data);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        CarService.getCarsByCustomerId(customerId).then(res => {
            setCars(res.data);
            getCustomerDetails();
        })
    },[])

    const addCar = () => {
        history.push(`/add-new-car/${customerId}`);
    }

    const updateProfile = () => {
        history.push(`/update-profile`);
    }

    if (!isLoading) {
        return (
            <div>
                <NavBarComponent />
                <div className="container emp-profile">
                    <form method="post">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="profile-img">
                                    <img
                                        src={`http://localhost:8080/customers/image/${customerId}/download`}
                                        alt="" height="100px" width="100px"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="profile-head">
                                    <h5 style={{fontWeight: "bold"}}>
                                        {customerDetails.name}
                                    </h5>
                                    <h6>
                                        {customerDetails.jobPosition}
                                    </h6>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <Button variant="contained" color="primary" onClick={addCar} style={{margin: "10px"}}>
                                    Add car
                                </Button>
                                <Button variant="contained" color="secondary" onClick={updateProfile}>
                                    Update
                                </Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="profile-work">
                                    <br/>
                                    <a href="">City: {customerDetails.city}</a><br/>
                                    <br/>
                                    <a href="">Street: {customerDetails.street}</a><br/>
                                    <br/>
                                    <a href="">Gender: {customerDetails.gender}</a>
                                    <br/>
                                    <br/>
                                    <a href="">Age: {customerDetails.age}</a>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel"
                                         aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{JSON.parse(localStorage.getItem("user")).username}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{customerDetails.name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{customerDetails.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{customerDetails.phoneNumber}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="container emp-profile" style={{display: "flex", flexWrap: "wrap", paddingLeft: 0}}>
                    {
                        cars.map(
                            car => <CarCard data={car}/>
                        )
                    }
                </div>
                <div className="container emp-profile">
                    <AppointmentsComponent />
                </div>
            <FooterComponent />
            </div>
        );
    } else {
        return (<h3>Loading...</h3>)
    }


};

export default UserProfileComponent;