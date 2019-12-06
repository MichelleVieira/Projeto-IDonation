import React, { Component } from "react";
import logo from "../template/assets/images/user.png";
import { Link } from "react-router-dom";
import nav from "../components/nav.css";
import logoPrincipal from "../img/logos/logo-white.png";
import doacoesInteresse from "../img/like (1).svg";
import publicacao from "../img/worldwide.svg";
import doacoesRecebidas from "../img/inbox.svg";
import chat from "../img/love.svg";
import logout from "../img/opened-door-aperture.svg";
import likes from "../img/like.svg";
import iconBusca from "../img/loupe.svg";
import Chat from '../components/Chat';
import { LoginService } from "../services/loginService";

export default class Navbar extends Component {
  render() {
    return (
      <nav>
        <div id="logo"></div>
        <div id="signin">
          <img className="logo-principal logo-doadores" src={logo} alt="logo" />
          <Link className="itensHovered" to="/HomeOngs">
            ONG
          </Link>
        </div>

        <div id="signin">
          <img className="signin-img" src={publicacao} alt="publicações" />
          <Link className="itensHovered" to="/DoacoesPublicadas">
            Publicações
          </Link>
        </div>

        <div id="signin">
          <img className="signin-img" src={doacoesInteresse} alt="Likes" />
          <Link class="itensHovered" to="/DoacoesDeInteresse">
            Doaçoes de Interesse
          </Link>
        </div>

        <div id="signin">
          <img
            className="signin-img"
            src={doacoesRecebidas}
            alt="DoacoesRecebidas"
          />
          <Link class="itensHovered" to="/DoacoesRecebidas">
            Doações Recebidas
          </Link>
        </div>

        <div id="signin">
          <img className="signin-img" src={likes} alt="Likes" />
          <Link className="itensHovered" to="/matchs">
            Matchs
          </Link>
        </div>

        <div id="signin">
          <img className="signin-img" src={chat} alt="chat" />
          <Link className="itensHovered" to="/Chat">
            Chat
          </Link>
        </div>

        <div id="signin">
          <img className="signin-img" src={logout} alt="logout" />
          <Link to="/logout" className="itensHovered" onClick={LoginService.logout}>
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
