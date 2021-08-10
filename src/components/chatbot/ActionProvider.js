import CarService from "../../service/CarService";
import CarServiceService from "../../service/CarServiceService";
import MechanicService from "../../service/MechanicService";

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
                `Our services are: \n ${services} `,
                { withAvatar: true }
            );
            this.addMessageToBotState(messages);
        })
    };

    handleCars = () => {
        const message = this.createChatBotMessage(
            "We repair cars from Rolls Royce, Dacia or Lamborghini. You can add cars to your account and schedule them for repairs, after each appointment we'll appreciate if you would leave us a honest review!",
            { withAvatar: true }
        )
        this.addMessageToBotState(message)
    }

    handleMechanics = () => {
        MechanicService.getAllMechanics.then(r => {
            let mechanics = "";
            for(let i = 0 ; i < r.data.length; i++) {
                if (i !== r.data.length - 1) {
                    mechanics += r.data[i].name + ", ";
                }
            }
            const messages = this.createChatBotMessage(
                `Our mechanics are: \n ${mechanics}. Each of them has a specific specialization and a different skill set.`,
                { withAvatar: true }
            );
            this.addMessageToBotState(messages);
        })
    }

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