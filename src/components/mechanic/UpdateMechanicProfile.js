import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useLocation} from "react-router-dom";
import NavBarComponent from "../main/NavBarComponent";
import Container from "@material-ui/core/Container";
import {Form} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import CarService from "../../service/CarService";
import CarServiceService from "../../service/CarServiceService";
import AuthServiceMechanic from "../../service/AuthServiceMechanic";
import MechanicService from "../../service/MechanicService";
import MechanicNavBarComponent from "../../mechanic-admin/components/main/MechanicNavBarComponent";

const UpdateMechanicProfile = () => {
    const [mechanic, setMechanic] = useState();
    const [services, setServices] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [updatedMechanic, setUpdatedMechanic] = useState();

    useEffect(() => {
        CarServiceService.getAllServiceTypes().then(r=> {
            setServices(r.data);
            getMechanic();
        })
    }, [])

    const getMechanic = () => {
        MechanicService.getMechanic(AuthServiceMechanic.getCurrentUser().id).then(r => {
            setMechanic(r.data);
            setIsLoading(false)
        })
    }

    const getProfilePicture = () => {

    }

    const submitForm = (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const newMechanic = {
            name: data.get("name"),
            phoneNumber: data.get("phoneNumber"),
            email: data.get("email"),
            specialization: data.get("service")
        }
        MechanicService.updateMechanic(newMechanic, mechanic.id).then(r => {
            console.log(r.data);
        })
    }

    const onChangeHandler = (e) => {
        setUpdatedMechanic({
            ...updatedMechanic,
            [e.target.name]: e.target.value,
        })
    }

    if(!isLoading) {
        return (
            <div>
                <MechanicNavBarComponent />
                <div className="container emp-profile">
                    <p>Please fill in your details</p>
                    <Container
                        style={{
                            border: "white",
                            height: "100%",
                            width: "50%",
                            margin: "auto",
                            marginTop: "5%",
                        }}
                    >
                        <div className="box">
                            <br/>
                            <form
                                className="form-signin"
                                method="put"
                                onSubmit={submitForm}
                            >
                                <div className="mb-3">
                                    <label htmlFor="firstName" className="form-label">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={mechanic.name}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phoneNumber" className="form-label">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={mechanic.phoneNumber}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        name="email"
                                        value={mechanic.email}
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="jobPosition" className="form-label">
                                        Specialization
                                    </label>
                                    <select className="form-control"
                                            id="service"
                                            name="service">
                                        {
                                            services.map(
                                                service => <option value={service.upperCaseName}>{service.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                <Form.Group controlId="formFile" className="mb-3">
                                    <Form.Label>Upload a profile picture</Form.Label>
                                    <Form.Control type="file" onChange={getProfilePicture}/>
                                </Form.Group>
                                <Button type="submit" className="btn btn-primary" variant="contained" color="primary">
                                    Update
                                </Button>
                            </form>
                        </div>
                    </Container>
                </div>
            </div>
        );
    } else {
        return (
            <h3>Loading...</h3>
        )
    }

};

export default UpdateMechanicProfile;