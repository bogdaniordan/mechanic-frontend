import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppointmentService from "../../service/AppointmentService";
import AppointmentCardComponent from "../appointment/AppointmentCardComponent";
import "./appointmentsHistory.css";
import AuthServiceMechanic from "../../service/AuthServiceMechanic";
import {InputLabel} from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Modal from 'react-modal';
import "./ChatModal.css"

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


const AppointmentsComponent = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [appointments, setAppointments] = useState();
    const [appointmentStatuses, setAppointmentStatuses] = useState();
    const [modalIsOpen, setIsOpen] = useState(false);

    // let subtitle;


    function openModal() {
        setIsOpen(true);
    }

    // function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    // }

    function closeModal() {
        setIsOpen(false);
    }

    // function afterOpenModal() {
    //     // references are now sync'd and can be accessed.
    //     subtitle.style.color = '#f00';
    // }

    useEffect(() => {
        if(props.type) {
            appointmentsByMechanic();
        } else {
            appointmentsByCustomerId();
        }
    }, [appointments])

    const appointmentsByCustomerId = () => {
        AppointmentService.getByCustomerId(JSON.parse(localStorage.getItem("user")).customerId).then(res => {
            console.log(res.data);
            setAppointments(res.data);
            setIsLoading(false);
        })
    }

    const appointmentsByMechanic = () => {
        AppointmentService.getAppointmentsByMechanicId(AuthServiceMechanic.getCurrentUser().id).then(r => {
            console.log(r.data);
            setAppointments(r.data);
            AppointmentService.getStatuses().then(r => {
                console.log(r.data);
                setAppointmentStatuses(r.data)
                setIsLoading(false);
            })
        })
    }

    const setStatus = (event) => {
        const id = event.target[event.target.selectedIndex].getAttribute('data-id');
        const status = event.target.value;

        console.log(id);

        AppointmentService.setStatus(status, id)
    }

    // const isDateBeforeToday = (date) => {
    //     return new Date(date) < new Date(new Date().toDateString());
    // }

    if (!isLoading) {
        return (
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="header-title pb-3 mt-0">My appointments</h5>
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0">
                                            <thead>
                                            <tr className="align-self-center">
                                                <th>Car</th>
                                                {props.type ? <th>Customer</th> : <th>Mechanic</th> }
                                                <th>Service</th>
                                                <th>Date</th>
                                                <th>Amount</th>
                                                <th>Status</th>
                                                <th>Notes</th>
                                                {props.type ? <th>Set status</th> : ""}
                                                <th>Chat</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                appointments.map(
                                                    appointment =>  <tr>
                                                        <td>{appointment.car.brandName}</td>
                                                        <td><img src={props.type ? appointment.customer.picture : appointment.mechanic.picture}
                                                                 alt="" className="thumb-sm rounded-circle mr-2"/> {props.type ? appointment.customer.name : appointment.mechanic.name}
                                                        </td>
                                                        <td>{appointment.requiredservice}</td>
                                                        <td>{appointment.localDate}</td>
                                                        <td>${appointment.price}</td>
                                                        <td><span className="badge badge-boxed badge-soft-primary">{appointment.appointmentStatus}</span></td>
                                                        <td>{appointment.notes}</td>
                                                        {
                                                            props.type ? (
                                                                <td>
                                                                    <Select
                                                                        native
                                                                        value={appointment.appointmentStatus}
                                                                        onChange={setStatus}
                                                                        required
                                                                    >
                                                                        <option aria-label="None" value="" />
                                                                        {
                                                                            appointmentStatuses.map(
                                                                                appointmentStatus => <option data-id={appointment.id} value={appointmentStatus}>{appointmentStatus}</option>
                                                                            )
                                                                        }
                                                                    </Select>
                                                                </td>
                                                            ) : ("")
                                                        }
                                                        <td><button onClick={openModal}>Open Modal</button></td>

                                                        <Modal
                                                            isOpen={modalIsOpen}
                                                            // onAfterOpen={afterOpenModal}
                                                            onRequestClose={closeModal}
                                                            style={customStyles}
                                                            contentLabel="Example Modal"
                                                        >
                                                            {/*<h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>*/}
                                                            <button onClick={closeModal}>close</button>
                                                            <div className="container bootstrap snippets bootdeys">
                                                                <div className="col-md-7 col-xs-12 col-md-offset-2">
                                                                    <div className="panel" id="chat">
                                                                        <div className="panel-heading">
                                                                            <h3 className="panel-title">
                                                                                <i className="icon wb-chat-text"
                                                                                   aria-hidden="true"></i> Chat
                                                                            </h3>
                                                                        </div>
                                                                        <div className="panel-body">
                                                                            <div className="chats">
                                                                                <div className="chat">
                                                                                    <div className="chat-avatar">
                                                                                        <a className="avatar avatar-online"
                                                                                           data-toggle="tooltip"
                                                                                           href="#"
                                                                                           data-placement="right"
                                                                                           title=""
                                                                                           data-original-title="June Lane">
                                                                                            <img
                                                                                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                                                                alt="..."/>
                                                                                                <i></i>
                                                                                        </a>
                                                                                    </div>
                                                                                    <div className="chat-body">
                                                                                        <div className="chat-content">
                                                                                            <p>
                                                                                                Good morning, sir.
                                                                                                <br/>What can I do for
                                                                                                    you?
                                                                                            </p>
                                                                                            <time className="chat-time"
                                                                                                  dateTime="2015-07-01T11:37">11:37:08
                                                                                                am
                                                                                            </time>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="chat chat-left">
                                                                                    <div className="chat-avatar">
                                                                                        <a className="avatar avatar-online"
                                                                                           data-toggle="tooltip"
                                                                                           href="#"
                                                                                           data-placement="left"
                                                                                           title=""
                                                                                           data-original-title="Edward Fletcher">
                                                                                            <img
                                                                                                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                                                                alt="..."/>
                                                                                                <i></i>
                                                                                        </a>
                                                                                    </div>
                                                                                    <div className="chat-body">
                                                                                        <div className="chat-content">
                                                                                            <p>Well, I am just looking
                                                                                                around.</p>
                                                                                            <time className="chat-time"
                                                                                                  dateTime="2015-07-01T11:39">11:39:57
                                                                                                am
                                                                                            </time>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="chat">
                                                                                    <div className="chat-avatar">
                                                                                        <a className="avatar avatar-online"
                                                                                           data-toggle="tooltip"
                                                                                           href="#"
                                                                                           data-placement="right"
                                                                                           title=""
                                                                                           data-original-title="June Lane">
                                                                                            <img
                                                                                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                                                                alt="..."/>
                                                                                                <i></i>
                                                                                        </a>
                                                                                    </div>
                                                                                    <div className="chat-body">
                                                                                        <div className="chat-content">
                                                                                            <p>
                                                                                                If necessary, please ask
                                                                                                me.
                                                                                            </p>
                                                                                            <time className="chat-time"
                                                                                                  dateTime="2015-07-01T11:40">11:40:10
                                                                                                am
                                                                                            </time>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="panel-footer">
                                                                            <form>
                                                                                <div className="input-group">
                                                                                    <input type="text"
                                                                                           className="form-control"
                                                                                           placeholder="Say something"/>
                                                                                      <span className="input-group-btn">
                                                                                        <button className="btn btn-primary" type="button">Send</button>
                                                                                      </span>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Modal>

                                                        {/*{!props.type ? (*/}
                                                        {/*    <td>*/}
                                                        {/*        {appointment.localDate ? (*/}
                                                        {/*            isDateBeforeToday(appointment.localDate) ? (<span className="badge badge-boxed badge-soft-warning">done</span>) : (<span className="badge badge-boxed badge-soft-primary">future</span>)*/}
                                                        {/*        ) : ("")}*/}
                                                        {/*    </td>*/}
                                                        {/*) : ("")}*/}
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                    {/*<div className="pt-3 border-top text-right"><a href="#"*/}
                                    {/*                                               className="text-primary">View*/}
                                    {/*    all <i className="mdi mdi-arrow-right"></i></a></div>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        )
    } else {
        return <h3>Loading...</h3>
    }

}

export default AppointmentsComponent;