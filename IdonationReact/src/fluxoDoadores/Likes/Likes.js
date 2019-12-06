import React, { Component } from "react";
import Navbar from "../../components/NavDoadores/Navbar";
import { Link } from "react-router-dom";
import X from "../../template/assets/images/x.png";
import likes from './likes.css';
import Api from '../../services/Api';
import { requestOptions } from '../../Url';
import Matchs from '../../fluxoInstituicoes/matches/matchs';
import PhotoOne from "../../img/acolhimento-eight.PNG";
import PhotoTwo from "../../img/doador-two.jpeg";
 


export default class Home extends Component {
    constructor(props){
      super(props);
      this.state = {
        ongsLike: [],
        show: false
      }
    }

    existsMatches = (idOng) =>{

      Api.post(`match/user/${idOng}`, requestOptions)
        .then(res => {
          console.log(res)
      })
    }

    registerMatch = (e) =>{

      const idDoador = JSON.parse(localStorage.getItem('user')).id;

      const idOng = e.target.id;

      this.existsMatches(idOng);

      const request = {
        idDoador: idDoador,
        idMatch: null,
        idOng: idOng
      }

      Api.post('match', request, requestOptions)
        .then(res => {
          console.log(res)
      })

      this.showModal();
    }

    handleShowLikes = async () =>{
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      };

      const id = this.props.match.params.id;

      return await Api.get(`donation/${id}`, requestOptions)
        .then(res =>{
          this.setState({ongsLike: res.data.ong})
        });
    }

    showModal = () => {
      this.setState({show: true});
    }

    hideModal = () => {
      this.setState({show: false})
    }

    showLikes = () =>{
      return (
        this.state.ongsLike.map(like =>(
            <div className="card card-photo" key={like.idDoador}>
              <a href="#" className="xis">
                <img src={X} alt="fechar card" />
              </a>
              <div id="nossoLar"> . </div>
              <div className="card-body">
                <h5 className="card-title card-text-title"> {like.razao_social} </h5>
                {/* <Link className="btn btn-fd" to="/FazerDoacao">
                    Dar Match
                </Link> */}
                <button id={like.id} className="btn btn-fd" 
                onClick={
                  (e) => this.registerMatch(e)                  
                }>
                    Dar Match
                </button>
              </div>
            </div>
        ))
      )
    }

    componentDidMount(){
      this.handleShowLikes()
        .then(res =>{
          return;
        });
    }

    render() {
        return (
            <div>
                <div className="geral">
                <Navbar/>
                </div>
                <Link className="paragrafo-HD" to="/HomeDoadores">Página Inicial /</Link>
                <Link className="paragrafo-FD" to="/likes">Likes</Link>
              
                <div className="geral-cards">
                  {this.showLikes()}
                </div>  

                

                <Modal show={this.state.show} handleClose={this.hideModal} />
             </div>  
        );
    }
}

const Modal = ({ handleClose, show, children }) => {
  
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  console.log(showHideClassName);
  return (
    <div className={showHideClassName}>
      <div className="itsIsMach">
          <div className="card card-photo card-photo-two card-two">
            <a href="#" className="xis">
              <span onClick={handleClose}>
              <img className="umX" src={X} alt="fechar card" />
              </span>
              <p className="novoMatch">Novo Match !</p>
            </a>
            <div className="img-matchs">
              <img className="img-matchs-one" src={PhotoOne} alt="foto" />
              <img className="img-matchs-two" src={PhotoTwo} alt="foto" />
            </div>

            <div className="card-body">
              <Link class="btn btn-fd btn-fd-two" to="/chat">
                Iniciar conversa
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};
