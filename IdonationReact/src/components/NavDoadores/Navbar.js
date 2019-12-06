import React, { Component } from "react";
import logo from "../../template/assets/images/user.png";
import publicacao from "../../img/worldwide.svg";
import chat from "../../img/love.svg";
import logout from "../../img/opened-door-aperture.svg";
import likes from "../../img/like.svg";
import { Link } from "react-router-dom";
import nav from "../nav.css";
import logoPrincipal from "../../img/logos/logo-white.png";
import iconBusca from "../../img/loupe.svg";
import Chat from '../Chat';
import { LoginService } from "../../services/loginService";

export default class Navbar extends Component {
  render() {
    return (
      <nav>
        <div id="logo"></div>
        <div id="signin">
          <img className="logo-principal logo-doadores" src={logo} alt="logo" />
          <Link className="itensHovered" to="/HomeDoadores">
            Doador
          </Link>
        </div>
        
        <div id="signin">
          <img className="signin-img" src={publicacao} alt="publicações" />
          <Link class="itensHovered" to="/PublicarDoacoes">
            Públicar doação
          </Link>
        </div>
        <div id="signin">
          <img className="signin-img" src={publicacao} alt="publicações" />
          <Link className="itensHovered" to="/publicações">
            Publicações
          </Link>
        </div>
{/* 
        <div id="signin">
          <img className="signin-img" src={publicacao} alt="publicações" />
          <Link class="itensHovered" to="/DoacoesRealizadas">
            Doações realizadas
          </Link>
        </div> */}

        {/* <div id="signin">
          <img className="signin-img" src={likes} alt="Likes" />
          <Link className="itensHovered" to="/likes">
            Likes
          </Link>
        </div> */}

        <div id="signin">
          <img className="signin-img" src={chat} alt="chat" />
          <Link className="itensHovered" to="/Chat">
            Chat
          </Link>
        </div>

        <div id="signin">
          <img className="signin-img" src={logout} alt="logout" onClick={LoginService.logout} />
          <Link to="/logout" className="itensHovered" href="">
            Sair
          </Link>
        </div>

        <div id="signin">
          <Link to="/HomeDoadores">
            <img
              className="logoOficial"
              src={logoPrincipal}
              alt="logo principal"
            />
          </Link>
        </div>
      </nav>
    );
  }
}
