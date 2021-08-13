import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import CustomerService from "../../service/CustomerService";
import NavBarComponent from "../main/NavBarComponent";
import FooterComponent from "../main/FooterComponent";
import Button from "@material-ui/core/Button";

export default function UpdateUserComponent(props) {
    const customerId = JSON.parse(localStorage.getItem("user")).customerId;
    const [customer, setCustomer] = useState({ value: "" });
    const history = useHistory();

    const onChangeHandler = (e) => {
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        CustomerService.getCustomerById(JSON.parse(localStorage.getItem("user")).customerId).then(res => {
            setCustomer(res.data)
        })
    }, []);

    function submitForm(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const customerDetails = {
            name: data.get("name"),
            phoneNumber: data.get("phoneNumber"),
            gender: data.get("gender"),
            age: data.get("age"),
            email: data.get("email"),
            jobPosition: data.get("jobPosition"),
            street: data.get("street"),
            city: data.get("city")
        }


        CustomerService.updateCustomerDetails(customerDetails, customerId).then(res => {
            console.log(res.data);
            if (res.data) {
                history.push("/profile")
            }
        });
    }

    return (
        <div>
            <NavBarComponent />
            <div className="container emp-profile">
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
                        <h3> Please fill the details for updating your customer profile</h3>
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
                                    value={customer.name}
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
                                    value={customer.phoneNumber}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label">
                                    Gender
                                </label>
                                <select
                                    className="form-select form-select-sm mb-3"
                                    aria-label=".form-select-sm example"
                                    id="gender"
                                    name="gender"
                                    value={customer.gender}
                                    onChange={onChangeHandler}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
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
                                    value={customer.email}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="age" className="form-label">
                                    Age
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="age"
                                    name="age"
                                    value={customer.age}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="jobPosition" className="form-label">
                                    Job position or occupation
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="jobPosition"
                                    name="jobPosition"
                                    value={customer.jobPosition}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="street" className="form-label">
                                    Street
                                </label>
                                <input
                                    value={customer.street}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                    id="street"
                                    name="street"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">
                                    City
                                </label>
                                <input
                                    value={customer.city}
                                    onChange={onChangeHandler}
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    name="city"
                                />
                            </div>
                            <Button type="submit" className="btn btn-primary" variant="contained" color="primary">
                                Update
                            </Button>
                        </form>
                    </div>
                </Container>
            </div>
            <FooterComponent />
        </div>
    );
}