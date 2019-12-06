import React, { Component } from "react";
import Navbar from "../../components/NavDoadores/Navbar";
import { Link } from "react-router-dom";
import fazerDoacao from "./fazerDoacao.css";
import imagemPrincipal from "../../img/imagem-doacoes.PNG";
import api from "../../services/Api";
import CheckBox from "../publicarDoacoes/CheckBox";
import SelectBox from "./SelectBox";
import { requestOptions } from "../../Url";

export default class FazerDoacao extends Component {

  constructor(pros) {
    super(pros);

    this.state = {
      nomeInstituicao: '',
      criancas: false,
      jovens: false,
      adultos: false,
      idosos: false,
      categoria: [
        { id: 1, value: "alimentos", isChecked: false },
        { id: 2, value: "roupas", isChecked: false },
        { id: 3, value: "dinheiro", isChecked: false }
      ],
      descricao: '',
      success: '',
      error: '',
      selectList: []
    };

    //check serviço
    this.onCheckChange = this.onCheckChange.bind(this);
  }

  //check serviço /habilita o check
  onCheckChange(e) {
    console.log(e.target.checked);

    this.setState({
      [e.target.name]: e.target.checked
    });
  }

  //select todos
  handleAllChecked = event => {
    let categoria = this.state.categoria;
    categoria.forEach(
      categorias => (categorias.isChecked = event.target.checked)
    );
    this.setState({ categoria: categoria });
    console.log(event.target.checked);
  };

  //select todos
  handleCheckChieldElement = event => {
    let categoria = this.state.categoria;
    categoria.forEach(categorias => {
      if (categorias.value === event.target.value)
        categorias.isChecked = event.target.checked;
    });
    this.setState({ categoria: categoria });
    console.log(event.target.checked);
  };

  //inputs serviço
  handleChange = event => {
    const state = Object.assign({}, this.state);
    let field = event.target.id;
    console.log(event.target.id)
    state[field] = event.target.value;
    console.log(state);
    this.setState(state);
  };


  //botao finalizar
  fazerDoacao = () => {
    let date = new Date();
    let nomeInstituicao = this.state.nomeInstituicao;
    let descricao = this.state.descricao;
    let tipoDoacao = 'Destinado á ';
    let categorias = '';
    let tipoPessoa = JSON.parse(localStorage.getItem('user'));
    let pf = null;
    let pj = null;

    for (let index = 0; index < this.state.categoria.length; index++) {
      if (this.state.categoria[index].isChecked == true) {
        categorias += this.state.categoria[index].value + ', ';
      }
    }

    if (this.state.criancas == true)
      tipoDoacao += 'crianças, ';
    if (this.state.jovens == true)
      tipoDoacao += 'jovens, ';
    if (this.state.adultos == true)
      tipoDoacao += 'adultos, ';
    if (this.state.idosos == true)
      tipoDoacao += 'idosos, ';

    if (tipoPessoa.nome == undefined || tipoPessoa.nome == null) {
      pj = tipoPessoa;
    } else {
      pf = tipoPessoa;
    }

    console.log(categorias);
    try {
      api.post('donation/addDonation', {
        categoria: categorias,
        dataCriacao: '' + date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(),
        descricao: descricao,
        empresa: pj,
        idDoacao: null,
        ong: null,
        organizacao: null,
        pessoa: pf,
        tipoDoacao: tipoDoacao
      }, requestOptions).then(res => {
        console.log(res)
        return false;
      });

      //Mandar para a pagina home*** checar se ok essa rota
      this.props.history.push("/HomeDoadores");

      this.setState({ success: 'Doação publicada com sucesso!', error: '' });
    } catch (_err) {
      this.setState({ error: 'Houve um erro na doação' });
    }
  }

  //botao cancelar
  cancelarDoacao = () => {
    this.props.history.push("/HomeDoadores");
  };

  addItem(e) {
    e.preventDefault();
    const { Items } = this.state;
    const newItem = this.newItem.value;

    this.setState({
      Items: [...this.state.Items, newItem]
    });
  }

  //
  // ------------------------SELECT

  exibirSelect = async () => {
    return api.get('Organizacao', requestOptions)
      .then(res => {
        console.log(res.data);
        let obj = [];
        res.data.forEach(element => {
          obj.push(element.razao_social);
        });
        console.log(obj)
        this.setState({ selectList: obj })
      })
  }

  componentDidMount() {
    this.exibirSelect();
  }

  render() {
    const { selectList } = this.state;
    console.log(selectList)
    return (

      <div>
        <div className="geral">
          <Navbar />
        </div>
        <Link className="paragrafo-HD" to="/HomeDoadores">
          Página Inicial /
        </Link>
        <Link className="paragrafo-FD" to="/FazerDoacao">
          Fazer Doação
        </Link>
        <div className="form-FD  container">
          <div className="form-fazerDoacao">
            <h1 className="h1-fd">Preencha</h1>
            <form
              ref={form => (this.newItem = form)}
            >
              <label htmlFor="nomeInstituicao">
                <strong className="style-text-FD">Nome da Instituição</strong>
              </label>
              <br />

              {/* <select funcao={this.exibirSelect.bind(this)} dados={this.state.ongs} /> */}
              <select>
                {
                  this.state.selectList.map(value => (
                    <option>{value}</option>
                  ))
                }
              </select>


              <br />
              <br />

              <label htmlFor="destinado">
                <strong className="style-text-FD" >Destinado a:</strong>
              </label>
              <br />

              <label htmlFor="criancas" id="destinado">
                <input
                  type="checkbox"
                  name="criancas"
                  id="criancas"
                  checked={this.state.criancas}
                  onChange={this.onCheckChange}
                />
                Crianças
            </label>

              <label htmlFor="jovens" id="destinado">
                <input
                  type="checkbox"
                  name="jovens"
                  id="jovens"
                  checked={this.state.jovens}
                  onChange={this.onCheckChange}
                />
                Jovens
            </label>

              <label htmlFor="adultos" id="destinado">
                <input
                  type="checkbox"
                  name="adultos"
                  id="adultos"
                  checked={this.state.adultos}
                  onChange={this.onCheckChange}
                />
                Adultos
            </label>

              <label htmlFor="idosos" id="destinado">
                <input
                  type="checkbox"
                  name="idosos"
                  id="idosos"
                  checked={this.state.idosos}
                  onChange={this.onCheckChange}
                />
                Idosos
            </label>
              <br />
              <br />

              <label htmlFor="destinado">
                <strong className="style-text-FD" >Selecione o que será doado:</strong>
              </label>
              <br />

              <label htmlFor="todasOpcoes" className="checkAlldoacao" id="destinado">
                <input
                  type="checkbox"
                  name="todasOpcoes"
                  id="categoria"
                  value="checkedAll"
                  onChange={this.handleAllChecked}
                />
                Todas as opções
              <ul>
                  {this.state.categoria.map(categorias => {
                    return (
                      <CheckBox
                        handleCheckChieldElement={this.handleCheckChieldElement}
                        {...categorias}
                      />
                    );
                  })}
                </ul>
              </label>
              <br />
              <br />
              <label htmlFor="descricao">
                <strong className="style-text-FD" >Descrição do que será doado:</strong>
              </label>
              <br />
              <textarea
                name="descricao"
                id="descricao"
                rows="5"
                cols="63"
                onChange={this.handleChange}
              >
                Descreva...
            </textarea>
              <br />
              <button
                className="btn-fd-one"
                type="submit"
                onClick={this.fazerDoacao}
              >
                Finalizar
            </button>
              <button
                className="btn-fd-for"
                type="submit"
                onClick={this.cancelarDoacao}
              >
                Cancelar
            </button>
            </form>
          </div>
        </div>
      </div >
    );
  }
}
