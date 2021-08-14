import {toast} from "react-toastify";

export const getNewMessages = (senderType, appointment) => {
    let newMessagesCount = 0;
    for (let j = 0; j < appointment.messages.length; j++) {
        const today = new Date();
        if (Date.parse("01/01/2011 " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()) > Date.parse("01/01/2011 " + appointment.messages[j].time) && appointment.messages[j].authorType === senderType) {
            newMessagesCount++;
        }
    }
    if (newMessagesCount > 0) {
        toast.info(`You have ${newMessagesCount} new messages from ${appointment.mechanic.name}.`)
    }
}