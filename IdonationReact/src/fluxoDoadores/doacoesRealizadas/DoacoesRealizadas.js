import React, { Component } from 'react';
import style from './style.css';
import Navbar from '../../components/NavDoadores/Navbar';
import logoUm from '../../template/assets/images/sitesDoadores-seven.PNG';
import logoDois from '../../template/assets/images/siteDoadores-two.PNG';
import logoTres from '../../template/assets/images/siteDoadores-tree.PNG';
import logoQuatro from '../../template/assets/images/siteDoadores-five.PNG';
import logoCinco from '../../template/assets/images/siteDoadores-for.PNG';
import logoSeis from '../../template/assets/images/siteDoadores-six.PNG';
import logoSete from '../../template/assets/images/siteDoadores-one.PNG';
import api from '../../services/Api';




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
        <th scope="row" ><img className="logos-list" src={logoUm} alt="logo" />
          {row.nmOng}</th>
        <td>{row.dataCriacao}</td>
        <td>{row.descricao}</td>
      </tr>
    )
  }

  componentDidMount() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };
    let user = JSON.parse(localStorage.getItem('user'));
    api.get('api/donation/doador/'+ user, requestOptions).then(response => {

      this.setState({ data: response.data, qtde: response.data.length });
      console.log(response.data.length)
    })
  }

  render() {
    const { qtde } = this.state;
    return (
      <div className="geral mainBackground">
        <Navbar />

        <div>
          <p className="indice-page">Página inicial / <span>Doacoes realizadas</span></p>

          <div className="title-geral">
            <h1>Lista de doações realizadas</h1>

            <p>Total de doações: <span> { qtde } </span></p>

          </div>

        </div>
        <div>
          <table className="table color-line">
            <thead className="main-color">
              <tr>
                <th scope="col">Instituições:</th>
                <th scope="col">Data da doação:</th>
                <th scope="col">Descrição da doação:</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.data.map(this.renderRows)
              }
            </tbody>
          </table>
        </div>

        <nav aria-label="Page navigation example" className="nav-page">
          <ul className="pagination justify-content-end">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Voltar</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Próximo</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
