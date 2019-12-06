import React, { Component } from 'react';
import logout from '../logout/logout.css';
import logoutImg from '../../img/logos/IDonation-logo.png';
import { Link } from "react-router-dom";

export default class Logout extends Component {

    render() {
        return (

            <div className="logout-div">
                    <img className="logoutImg" src={logoutImg} />
                <div class="texto-logout">
                    <h3> Você saiu da sua conta</h3>
                    <h6>Caso queira acessar a sua conta novamente, recomendamos
                    que clique no botão abaixo.</h6>

                    <Link className="btn-login" to="/">Fazer login</Link>
                </div>

               

            </div>
        )
    }
} 