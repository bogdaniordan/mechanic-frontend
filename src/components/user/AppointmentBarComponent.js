import React, {useState, useEffect} from 'react';
import Select from "@material-ui/core/Select";
import Modal from "react-modal";
import ChatComponent from "../chatbot/ChatComponent";
import AppointmentService from "../../service/AppointmentService";
import Button from "@material-ui/core/Button";

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

const AppointmentBarComponent = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const appointmentStatuses = props.appointmentStatuses;
    const [appointment, setAppointment] = useState(props.appointment);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const setStatus = (event) => {
        const id = event.target[event.target.selectedIndex].getAttribute('data-id');
        const status = event.target.value;

        AppointmentService.setStatus(status, id).then(() => {
            // had to make a deep copy of the old appointment state, otherwise it will refer to the same object in memory and react won't re-render
            let newAppointment = JSON.parse(JSON.stringify(appointment));
            newAppointment.appointmentStatus = status;
            setAppointment(newAppointment);
        })
    }


    return (
        <React.Fragment>
            <tr>
                <td>{appointment.car.brandName}</td>
                <td><img src={props.type ? `http://localhost:8080/customers/image/${appointment.customer.id}/download` : `http://localhost:8080/mechanics/image/${appointment.mechanic.id}/download`}
                         alt="" className="thumb-sm rounded-circle mr-2"/> {props.type ? appointment.customer.name : appointment.mechanic.name}
                </td>
                <td>{appointment.requiredservice}</td>
                <td>{appointment.localDate}</td>
                <td>${appointment.price}</td>
                <td><span className="badge badge-boxed badge-soft-primary">{appointment.appointmentStatus}</span></td>
                <td>{appointment.notes}</td>
                {
                    props.type ? (appointment.appointmentStatus === "DONE" ? (
                        <td>
                            <Button variant="contained" disabled><strong>DONE</strong></Button>
                        </td>
                            ) : (
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
                    )) : ("")
                }
                <td><Button variant="contained" color="primary" onClick={openModal}>Message</Button></td>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    style={{margin: "15px"}}
                >
                    <Button variant="contained" color="secondary" onClick={closeModal}>X</Button>
                    <ChatComponent messages={appointment.messages} appointment={appointment}/>
                </Modal>
            </tr>
        </React.Fragment>
    );
};

export default AppointmentBarComponent;