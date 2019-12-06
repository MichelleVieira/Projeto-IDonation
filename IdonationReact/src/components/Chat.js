import React, { Component } from 'react';
import io from "socket.io-client";
import style from '../components/styleChat.css';
import NavbarONG from '../components/Navbar';
import NavbarDoador from '../components/NavDoadores/Navbar';
import { Link } from "react-router-dom";
//import { chatService } from '../services/chatService';
import { message } from "antd";

export default class Chat extends Component {
    constructor(props){
        super(props);

        let user = JSON.parse(localStorage.getItem('user'));
        let tipo = user.nome === undefined ? 'ong' : 'doador';
        this.state = {
            tipo:tipo,
            username: user.nome || user.razao_social,
            message: '',
            messages: []
        };

        this.socket = io('back-chat.herokuapp.com');

        this.socket.on('RECEIVE_MESSAGE', (data) => addMessage(data));

        this.socket.on('connect', function(){
            console.log('Deu bom')
        });
        this.socket.on('disconnect', function(){
            console.log(('Deu ruim'))
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };


        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''});
        }
    }

    render(){
        let Navbar = this.state.tipo === 'doador'
            ? NavbarDoador
            :  NavbarONG
        console.log(Navbar);
        return (
            <div>
                <div className = "geral">
                    <Navbar/>
                </div>
                <div className="chat container">

                    <div className="row">
                        <div className="col-4">
                            <div className="men card">
                                <div className=" messagess card-body">
                                    <div className="messages">
                                        {this.state.messages.map(message => {
                                            return (
                                                <div>{message.author}: {message.message}</div>
                                            )
                                        })}
                                    </div>

                                </div>
                                <div className="">
                                    <input type="text" placeholder="Digite aqui sua mensagem..." className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                    <button onClick={this.sendMessage} className=" button-chat btn btn-danger form-control">Enviar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}