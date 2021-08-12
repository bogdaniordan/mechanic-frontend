import React, {useState, useEffect} from 'react';
import Select from "@material-ui/core/Select";
import Modal from "react-modal";
import ChatComponent from "../chatbot/ChatComponent";
import AppointmentService from "../../service/AppointmentService";

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
    const appointment = props.appointment;

    useEffect(() => {
         console.log(appointment)
    }, [])

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const setStatus = (event) => {
        const id = event.target[event.target.selectedIndex].getAttribute('data-id');
        const status = event.target.value;

        console.log(id);

        AppointmentService.setStatus(status, id)
    }


    return (
        <React.Fragment>
            <tr>
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
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <button onClick={closeModal}>close</button>
                    <ChatComponent messages={appointment.messages} appointment={appointment}/>

                </Modal>
            </tr>
        </React.Fragment>
    );
};

export default AppointmentBarComponent;