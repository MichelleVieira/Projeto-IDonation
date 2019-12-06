import React, { Component } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";
import matchs from "./matchs.css";
import X from "../../template/assets/images/x.png";

import doacoesInteresse from "../../img/interesseDoacoes.PNG";

import PhotoOne from "../../img/acolhimento-eight.PNG";
import PhotoTwo from "../../img/doador-two.jpeg";
import Api from "../../services/Api";
import { requestOptions } from "../../Url";

export default class Matchs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      matchs: []
    }
  }

  LookForMatches = () => {
    const id = JSON.parse(localStorage.getItem('user')).id
    console.log(id);
    Api.get('match/user/' + id, requestOptions)
      .then(res => {
        if (res.data == '' || res.data == null || res.data == undefined)
          res.data = []
        console.log(res.data)
        let matches = [];
        res.data.forEach(element => {
          console.log(element)
          Api.get('donation/doador/' + element.idOng, requestOptions)
            .then(res => {
              if (res.data == '' || res.data == null || res.data == undefined)
                res.data = []
              res.data.forEach(element => {
                console.log(element)
                if (element.pessoa.nome != null && element.pessoa.nome != undefined)
                  this.setState({ matchs: [...this.state.matchs, element.pessoa] })
                else if (element.empresa.razao_social != null && element.empresa.razao_social != undefined)
                  this.setState({ matchs: [...this.state.matchs, element.empresa] })

                console.log(this.state.matchs)
              });
            })
        });
      })
  }

  componentDidMount() {
    this.LookForMatches();
  }

  showMatches = () => {
    return (
      this.state.matchs.map(like => (
        <div className="card card-photo" key={like.id}>
          <a href="#" className="xis">
            <img src={X} alt="fechar card" />
          </a>
          <div id="nossoLar"> . </div>
          <div className="card-body">
            <h5 className="card-title card-text-title"> {like.razao_social == null ? like.nome : like.razao_social} </h5>
            {/* <Link className="btn btn-fd" to="/FazerDoacao">
                  Dar Match
              </Link> */}
          </div>
        </div>
      ))
    )
  }

  render() {
    const { matchs } = this.state;

    return (
      <div>
        <div className="geral">
          <Navbar />
        </div>
        <Link className="paragrafo-HO" to="/HomeOngs">
          Página Inicial /
        </Link>
        <Link className="paragrafo-m" to="/matchs">
          Matchs
        </Link>

        <div className="geral-cards">
          {this.showMatches()}
        </div>
      </div>
    );
  }
}
