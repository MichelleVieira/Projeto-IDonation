import React, { Component } from "react";
import logo from "../../template/assets/images/logo.png";
import api from "../../services/Api";
import MaskedInput from "react-maskedinput";
import cadastroPF from "../cadastro/cadastroPF.css";

export default class CadastroPF extends Component {
  constructor(pros) {
    super(pros);
    this.state = {
      nome: "",
      sobrenome: "",
      cpf: "",
      email: "",
      password: "",
      success: "",
      error: ""
    };
  }

  handleChange = event => {
    const state = Object.assign({}, this.state);
    let field = event.target.id;
    state[field] = event.target.value;
    console.log(state);
    this.setState(state);
  };

  cadastrarPF = () => {
    let nome = this.state.nome;
    let sobrenome = this.state.sobrenome;
    let cpf = this.state.cpf;
    let email = this.state.email;
    let password = this.state.password;

    let dados = {
      nome: nome,
      sobrenome: sobrenome,
      email: email,
      pass: {
        cpf: cpf,
        senha: password
      }
    };
    console.table(dados);

    try {
      api.post("/pessoa/cadastrar", dados);

      //Mandar para a pagina /  checar se ok essa rota
      this.props.history.push("/");

      this.setState({ sucess: "Conta criada com sucesso!", error: "" });
    } catch (_err) {
      this.setState({
        error: "Houve um erro com o cadastro, verifique os dados"
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="content">
          <form>
            <div className="container">
              <img className="logo-one" src={logo} alt="Idonation" />
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="inputEmail4"> Nome </label>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  placeholder="Claudia"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="inputEmail4"> Sobrenome </label>
                <input
                  type="text"
                  className="form-control"
                  id="sobrenome"
                  placeholder="Souza Silva"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="inputEmail4"> CPF </label>
                <MaskedInput
                  mask="111.111.1111-11"
                  type="text"
                  className="form-control"
                  id="cpf"
                  placeholder="___.___.___-__"
                  maxLength="14"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-5">
                <label htmlFor="inputEmail4"> Email </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="seunome@xxx.com.br"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4"> Senha </label>
                <input
                  required
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="******"
                  onChange={this.handleChange}
                />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4"> Confirmação de Senha </label>
                <input
                  required
                  type="password"
                  className="form-control"
                  id="confSenha"
                  placeholder="*****"
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label className="form-check-label" htmlFor="gridCheck">
                  Li e concordo com os termos e condições e politica de
                  privacidade.
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.cadastrarPF}
            >
              {" "}
              Enviar
            </button>
          </form>
        </div>
      </div>
    );
  }
}
