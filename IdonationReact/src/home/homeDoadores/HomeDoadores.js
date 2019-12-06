import React, { Component } from "react";
import Navbar from "../../components/NavDoadores/Navbar";
import { Link } from "react-router-dom";
import homeDoadores from "./homeDoadores.css";
import imagemPrincipal from "../../img/foto-principal.PNG";
import publicarDoacao from "../../img/publicarDoacao.PNG";
import doacoesRealizadas from "../../img/doacoesRealizadas.PNG";
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
    const passaFoto = (
      <div className="slider">
        <div className="fotoInstituicao">.</div>
        <div class="linha"></div>
        {/* <span class="txt1">blas</span> */}
        {/* <span class="txt2"> blabla</span> */}
      </div>
    );
    return (
      <div>
        <div className="geral">
          <Navbar />
        </div>

        <div className="facaDoacao">
          {/* <div> */}
          <img className="umAbsoluto" src={imagemPrincipal} alt="Doação" />
          {/* </div> */}
          <div className="facaDoacao-one">
            <h2>Faça uma doação</h2>
            <Link to="/FazerDoacao">
              <button className="btn-HD-one">doar</button>
            </Link>
          </div>
        </div>
        {/* <div className="funcionalidade-one"> */}
        {/* <div className="outrasAtividades">
                        <h3>Funcionalidades</h3>

                        <div className="cards">
                     
                           <div className="card  cards-geral" >
                                <div className="card-body">
                                <img className="img-funcinalidades" src={publicarDoacao} alt="Publicar Doação"/>
                                  <Link class="btn-cards btn-cards-one" to="/PublicarDoacoes">Públicar doação</Link>
                                </div>
                            </div>
                            <div className="card cards-geral" >
                                <div className="card-body">
                                <img className="img-funcinalidades-two" src={doacoesRealizadas} alt="Doações Realizadas"/>
                                   <Link class="btn-cards"  to="/DoacoesRealizadas">Doações realizadas</Link>

                                 </div>
                            </div>
                        </div>
                    </div> */}
        {/* <hr className="hr-DH" />
                    <div className="interessadosDoacao" id="likes">
                        <h3>Likes</h3>
                        <div>
                            <div className="Slider" id="instituicoesInteressadas">
                                <div className="card interessadosDoacao-card">
                                   <h5 className="interessadosDoacao-titulo"> Instituições interessadas na doação </h5>
                                    <div>{passaFoto}</div>
                                    <div class="btns-likes">
                                        <a href="#" class=" btnBack"></a>
                                        <a href="#" class="btnAccept"></a>
                                        <a href="#" class=" btnCancel"></a>
                                        <a href="#" class=" btnNext"></a>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div> */}
      </div>
      //   </div>
    );
  }
}
