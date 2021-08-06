import React, {useEffect, useState} from 'react';
import "/home/bogdan/Desktop/ADVANCED/mechanic-frontend/src/css/profile.css"
import NavBarComponent from "../main/NavBarComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import CarService from "../../service/CarService";
import {useHistory} from "react-router-dom";
import AuthService from "../../service/AuthService";
import CarCard from "../car/CarCard";
import CustomerService from "../../service/CustomerService";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FooterComponent from "../main/FooterComponent";


const UserProfileComponent = () => {
    const customerId = JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).customerId : ""
    const history = useHistory();
    const [cars,  setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [customerDetails, setCustomerDetails] = useState();


    const loginCheck = () => {
        if (!AuthService.getCurrentUser()) {
            history.push("/login")
        }
    }

    const getCustomerDetails = () => {
        CustomerService.getCustomerById(customerId).then(res => {
            console.log(res.data);
            setCustomerDetails(res.data);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        loginCheck();
        CarService.getCarsByCustomerId(customerId).then(res => {
            // console.log(res.data)
            setCars(res.data);
            getCustomerDetails();
        })
    },[])

    const addCar = () => {
        history.push(`/add-new-car/${customerId}`);
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
                                        src={customerDetails.picture}
                                        alt=""/>
                                    {/*<div className="file btn btn-lg btn-primary">*/}
                                    {/*    Change Photo*/}
                                    {/*    <input type="file" name="file"/>*/}
                                    {/*</div>*/}
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
                                    {/*<p className="proile-rating">RANKINGS : <span>8/10</span></p>*/}
                                    {/*<ul className="nav nav-tabs" id="myTab" role="tablist">*/}
                                    {/*    <li className="nav-item">*/}
                                    {/*        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home"*/}
                                    {/*           role="tab" aria-controls="home" aria-selected="true">About</a>*/}
                                    {/*    </li>*/}
                                    {/*    <li className="nav-item">*/}
                                    {/*        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile"*/}
                                    {/*           role="tab" aria-controls="profile" aria-selected="false">Timeline</a>*/}
                                    {/*    </li>*/}
                                    {/*</ul>*/}
                                </div>
                            </div>
                            <div className="col-md-2">
                                <Button variant="contained" color="primary" onClick={addCar} style={{margin: "10px"}}>
                                    Add car
                                </Button>
                                <Button variant="contained" color="secondary">
                                    Update
                                </Button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="profile-work">
                                    {/*<p>WORK LINK</p>*/}
                                    <br/>
                                    <a href="">City: {customerDetails.city}</a><br/>
                                    <br/>
                                    <a href="">Street: {customerDetails.street}</a><br/>
                                    <br/>
                                    <a href="">Gender: {customerDetails.gender}</a>
                                    <br/>
                                    <br/>
                                    <a href="">Age: {customerDetails.age}</a>
                                    {/*<p>SKILLS</p>*/}
                                    {/*<a href="">Web Designer</a><br/>*/}
                                    {/*<a href="">Web Developer</a><br/>*/}
                                    {/*<a href="">WordPress</a><br/>*/}
                                    {/*<a href="">WooCommerce</a><br/>*/}
                                    {/*<a href="">PHP, .Net</a><br/>*/}
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
                                        {/*<div className="row">*/}
                                        {/*    <div className="col-md-6">*/}
                                        {/*        <label>Profession</label>*/}
                                        {/*    </div>*/}
                                        {/*    <div className="col-md-6">*/}
                                        {/*        <p>Web Developer and Designer</p>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="container emp-profile" style={{display: "flex"}}>
                    {/*<Typography component="h1" variant="h4">*/}
                    {/*    My cars*/}
                    {/*</Typography>*/}
                    {/*<br/>*/}
                    {
                        cars.map(
                            car => <CarCard data={car}/>
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

export default UserProfileComponent;