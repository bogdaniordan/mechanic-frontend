import React, {useEffect, useState} from 'react';
import "./ChatModal.css"
import AuthService from "../../service/AuthService";
import AuthServiceMechanic from "../../service/AuthServiceMechanic";
import MessageService from "../../service/MessageService";

const ChatComponent = (props) => {
    const [messages, setMessages] = useState(props.messages);
    const [message, setMessage] = useState();

    useEffect(() => {
        let newMessages = messages;
        for(let i = 0; i < newMessages.length; i++) {
            if (newMessages[i].authorType === "customer") {
                newMessages[i].picture = props.appointment.customer.picture;
            } else {
                newMessages[i].picture = props.appointment.mechanic.picture;
            }
        }
        setMessages(newMessages)
        console.log(messages[0])
        console.log(messages[1])
    },[])

    const sendMessage = () => {
        const date = new Date();
        const time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let author;
        if (AuthServiceMechanic.getCurrentUser()) {
            author = "mechanic";
        } else if (AuthService.getCurrentUser()) {
            author = "customer"
        }
        const messageInChat = {
            authorType: author,
            message: message,
            time: time
        }
        MessageService.sendMessage(messageInChat, props.appointment.id).then(r => {
            setMessages([...messages, messageInChat])
        })
    }

    const getMessage = (event) => {
        setMessage(event.target.value);
    }

    return (
        <React.Fragment>
            <div className="container bootstrap snippets bootdeys">
                <div className="col-md-7 col-xs-12 col-md-offset-2">
                    <div className="panel" id="chat">
                        <div className="panel-heading">
                        </div>
                        <div className="panel-body">
                            <div className="chats">
                                {AuthService.getCurrentUser() ? (
                                    messages.map(
                                        message => message.authorType === "mechanic" ? (
                                            <div className="chat chat-left">
                                                <div className="chat-avatar">
                                                    <a className="avatar avatar-online"
                                                       data-toggle="tooltip"
                                                       href="#"
                                                       data-placement="left"
                                                       title=""
                                                       data-original-title="Edward Fletcher">
                                                        <img
                                                            src={message.picture}
                                                            alt="..."/>
                                                        <i></i>
                                                    </a>
                                                </div>
                                                <div className="chat-body">
                                                    <div className="chat-content">
                                                        <p>{message.message}</p>
                                                        <time className="chat-time"
                                                              dateTime="2015-07-01T11:39">{message.time}
                                                        </time>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="chat">
                                                <div className="chat-avatar">
                                                    <a className="avatar avatar-online"
                                                       data-toggle="tooltip"
                                                       href="#"
                                                       data-placement="right"
                                                       title=""
                                                       data-original-title="June Lane">
                                                        <img
                                                            src={message.picture}
                                                            alt="..."/>
                                                        <i></i>
                                                    </a>
                                                </div>
                                                <div className="chat-body">
                                                    <div className="chat-content">
                                                        <p>
                                                            {message.message}
                                                        </p>
                                                        <time className="chat-time"
                                                              dateTime="2015-07-01T11:37">{message.time}
                                                        </time>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    )
                                ) : ("")}

                                {
                                    AuthServiceMechanic.getCurrentUser() ? (
                                        messages.map(
                                            message => message.authorType === "customer" ? (
                                                <div className="chat chat-left">
                                                    <div className="chat-avatar">
                                                        <a className="avatar avatar-online"
                                                           data-toggle="tooltip"
                                                           href="#"
                                                           data-placement="left"
                                                           title=""
                                                           data-original-title="Edward Fletcher">
                                                            <img
                                                                src={message.picture}
                                                                alt="..."/>
                                                            <i></i>
                                                        </a>
                                                    </div>
                                                    <div className="chat-body">
                                                        <div className="chat-content">
                                                            <p>{message.message}</p>
                                                            <time className="chat-time"
                                                                  dateTime="2015-07-01T11:39">{message.time}
                                                            </time>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="chat">
                                                    <div className="chat-avatar">
                                                        <a className="avatar avatar-online"
                                                           data-toggle="tooltip"
                                                           href="#"
                                                           data-placement="right"
                                                           title=""
                                                           data-original-title="June Lane">
                                                            <img
                                                                src={message.picture}
                                                                alt="..."/>
                                                            <i></i>
                                                        </a>
                                                    </div>
                                                    <div className="chat-body">
                                                        <div className="chat-content">
                                                            <p>
                                                                {message.message}
                                                            </p>
                                                            <time className="chat-time"
                                                                  dateTime="2015-07-01T11:37">{message.time}
                                                            </time>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    ) : ("")
                                }
                            </div>
                        </div>
                        <div className="panel-footer">
                            <form>
                                <div className="input-group">
                                    <input onChange={getMessage} type="text"
                                           className="form-control"
                                           placeholder="Say something"/>
                                    <span className="input-group-btn">
                                        <button className="btn btn-primary" onClick={sendMessage} type="button">Send</button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ChatComponent;