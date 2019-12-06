
import React, { Component } from 'react';
import Navbar from '../../components/Navbar';

import teste from '../../template/assets/images/teste.png';
import Api from '../../services/Api';
import { Link } from "react-router-dom";

import PhotoTwo from "../../img/doador-two.jpeg";
import more from "../../img/plus.svg";



export default class DoacoesRealizadas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      qtde: null
    }
  }

  renderRows(row) {
    return (
      <tr>
        <th scope="row">
          <img
            className="img-matchs-two-one-two"
            src={PhotoTwo}
            alt="foto"
          />
          Doador
      </th>
        <td className="umTD">
          {row.dataCriacao}
        </td>
        <td className="umTD">
          {row.descricao}
        </td>

        <td className="umTD">
          <button>Adicionar um comentário</button>
        </td>

      </tr>
    )
  }


  componentDidMount() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    let user = JSON.parse(localStorage.getItem('user'));
    //TIREI O ID PARA TESTE. COLOCAR NOVAMENTE EM: +user.id
    Api.get('donation/doador' + user.id, requestOptions).then(response => {

      this.setState({ data: response.data, qtde: response.data.length });
      console.log(response.data.length)
    })
  }

  render() {
    const { qtde } = this.state;
    let { data } = this.state;

    if (data == '')
      data = [];

    return (
      <div>
        <div className="geral">
          <Navbar />
        </div>
        <Link className="paragrafo-HO" to="/HomeOngs">
          Página Inicial /
        </Link>
        <Link className="paragrafo-m" to="/DoacoesDeInteresse">
          Doações Recebidas
        </Link>

        <div className="DDI">
          <table class="table table-one color-line">
            <thead class="main-color-one">
              <tr>
                <th scope="col">Doador:</th>
                <th scope="col">Data da doação:</th>
                <th scope="col">Descrição do que foi doado:</th>
                <th scope="col">-</th>
              </tr>
            </thead>

            <tbody className="tbody-one">
              {
                data.map(this.renderRows)
              }
            </tbody>

          </table>

        </div>
        <Link className="more-style" to="#">
          <img className="more" src={more} />
        </Link>


      </div>
    );
  }
}