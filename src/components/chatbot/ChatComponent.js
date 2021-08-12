import React, {useEffect, useState} from 'react';
import "./ChatModal.css"
import AuthService from "../../service/AuthService";
import AuthServiceMechanic from "../../service/AuthServiceMechanic";

const ChatComponent = (props) => {
    const [messages, setMessages] = useState(props.messages);

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

    return (
        <React.Fragment>
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


                                {/*<div className="chat">*/}
                                {/*    <div className="chat-avatar">*/}
                                {/*        <a className="avatar avatar-online"*/}
                                {/*           data-toggle="tooltip"*/}
                                {/*           href="#"*/}
                                {/*           data-placement="right"*/}
                                {/*           title=""*/}
                                {/*           data-original-title="June Lane">*/}
                                {/*            <img*/}
                                {/*                src="https://bootdey.com/img/Content/avatar/avatar1.png"*/}
                                {/*                alt="..."/>*/}
                                {/*            <i></i>*/}
                                {/*        </a>*/}
                                {/*    </div>*/}
                                {/*    <div className="chat-body">*/}
                                {/*        <div className="chat-content">*/}
                                {/*            <p>*/}
                                {/*                If necessary, please ask*/}
                                {/*                me.*/}
                                {/*            </p>*/}
                                {/*            <time className="chat-time"*/}
                                {/*                  dateTime="2015-07-01T11:40">11:40:10*/}
                                {/*                am*/}
                                {/*            </time>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
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
        </React.Fragment>
    );
};

export default ChatComponent;