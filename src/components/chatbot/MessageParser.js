class MessageParser {
    constructor(actionProvider, state) {
        this.actionProvider = actionProvider;
        // State represents the chatbot state and is passed
        // in at initalization. You can use it to read chatbot state
        // inside the messageParser
        this.state = state
    }

    parse = (message) => {
        const lowerCase = message.toLowerCase();

        if (lowerCase.includes("services") || lowerCase.includes("service")) {
            return this.actionProvider.handleServicesParser();
        } else if (lowerCase.includes("mechanic") || lowerCase.includes("mechanics")) {
            return this.actionProvider.handleMechanics();
        } else if (lowerCase.includes("car") || lowerCase.includes("cars") || lowerCase.includes("vehicle")) {
            return this.actionProvider.handleCars();
        } else if (lowerCase.includes("job") || lowerCase.includes("join") || lowerCase.includes("career") || lowerCase.includes("work")) {
            return this.actionProvider.handleCareer();
        }
        return this.actionProvider.handleDefault();
    };
}

export default MessageParser;