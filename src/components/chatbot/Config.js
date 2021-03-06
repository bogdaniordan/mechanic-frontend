import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

// import Overview from "../components/widgets/Overview/Overview";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const botName = "Car service bot";

const config = {
    botName: botName,
    lang: "no",
    customStyles: {
        botMessageBox: {
            backgroundColor: "#376B7E",
        },
        chatButton: {
            backgroundColor: "#5ccc9d",
        },
    },
    initialMessages: [
        createChatBotMessage(
            `Hi I'm ${botName}. I’m here to help you in choosing our services.`
        ),
        createChatBotMessage(
            "Please ask me about what you want to find out!",
            {
                withAvatar: false,
                delay: 500,
                widget: "overview",
            }
        ),
    ],
    state: {
        gist: "",
    },
    customComponents: {},
    widgets: [
        // {
        //     widgetName: "overview",
        //     widgetFunc: (props) => <Overview {...props} />,
        //     mapStateToProps: ["gist"],
        // },
        {
            widgetName: "messageParser",
            widgetFunc: (props) => <MessageParser {...props} />,
            mapStateToProps: ["gist"],
        },
        {
            widgetName: "actionProviderDocs",
            widgetFunc: (props) => <ActionProvider {...props} />,
            mapStateToProps: ["gist"],
        },
    ],
};

export default config;