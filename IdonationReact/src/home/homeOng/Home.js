import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import homeDoadores from "../homeDoadores/homeDoadores.css";
import homeOngs from "./homeOngs.css";
import imagemPrincipal from "../../img/UmaImagem.PNG";
import doacoesRecebidas from "../../img/doacoesRecebidas.PNG";
import doacoesInteresse from "../../img/interesseDoacoes.PNG";
import ongsCadastradas from "../../img/ongsCadastradas.PNG";
import { LoginService } from "../../services/loginService";

export default class Home extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(localStorage.getItem('user') == null || localStorage.getItem('user') == undefined){
      LoginService.logout();
      this.props.history.push('/');
    }
  }
  render() {
    return (
      <div>
        <div className="geral">
          <Navbar />
        </div>

        <div className="matches">
          {/* <div> */}
          <img className="umAbsoluto" src={imagemPrincipal} alt="matchs" />
          {/* </div> */}
          <div className="matches-one">
            <h2>Acompanhar os matchs</h2>
            <Link to="/matchs">
              <button className="btn-HO">Matchs</button>
            </Link>
          </div>
        </div>

        {/* <hr className="hr-DH" />
        <div className="sobreDoacoes">
          <h3>Sobre as Doações</h3>

          <div className="cards">
            <div className="card  cards-geral-two">
              <div className="card-body">
                <img
                  className="img-sobreDoacoes"
                  src={doacoesInteresse}
                  alt="Publicar Doação"
                />
                <Link class="btn-cards-two-one" to="/DoacoesDeInteresse">
                  Doaçoes de Interesse
                </Link>
              </div>
            </div>
            <div className="card cards-geral-two">
              <div className="card-body">
                <img
                  className="img-sobreDoacoes"
                  src={doacoesRecebidas}
                  alt="Doações Realizadas"
                />
                <Link
                  class="btn-cards-two-one card-style-one"
                  to="/DoacoesRealizadas"
                >
                  Doações Recebidas
                </Link>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}
