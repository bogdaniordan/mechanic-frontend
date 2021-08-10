import CarService from "../../service/CarService";
import CarServiceService from "../../service/CarServiceService";

class ActionProvider {
    // The action provider receives createChatBotMessage which you can use to define the bots response, and
    // the setState function that allows for manipulating the bots internal state.
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage
    }

    handleServicesParser = () => {
        CarServiceService.getAllServiceTypes().then(r => {
            let services = "";
            for(let i = 0 ; i < r.data.length; i++) {
                if (i !== r.data.length - 1) {
                    services += r.data[i].name + ", ";
                }
            }
            const messages = this.createChatBotMessage(
                `Our services are: \n ${services}`,
                { withAvatar: true }
            );
            this.addMessageToBotState(messages);
        })
    };

    handleDefault = () => {
        const message = this.createChatBotMessage("How can I help?", {
            withAvatar: true,
        });
        this.addMessageToBotState(message)
    };

    addMessageToBotState = (messages) => {
        if (Array.isArray(messages)) {
            this.setState((state) => ({
                ...state,
                messages: [...state.messages, ...messages],
            }));
        } else {
            this.setState((state) => ({
                ...state,
                messages: [...state.messages, messages],
            }));
        }
    };
}

export default ActionProvider;