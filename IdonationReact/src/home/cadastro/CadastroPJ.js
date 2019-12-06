import React, { Component } from "react";
import api from "../../services/Api";
import logo from "../../template/assets/images/logo.png";
import MaskedInput from "react-maskedinput";

export default class CadastroPJ extends Component {
  constructor(pros) {
    super(pros);
    this.state = {
      razaoSocial: "",
      email: "",
      password: "",
      cnpj: "",
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

  cadastrarPJ = () => {
    let razaoSocial = this.state.razaoSocial;
    console.log(razaoSocial);
    let cnpj = this.state.cnpj;
    let email = this.state.email;
    let password = this.state.password;

    let dados = {
      email: email,
      razao_social: razaoSocial,
      pass: {
        cnpj: cnpj,
        password: password
      }
    };
    console.table(dados);

    try {
      api.post("/empresa/cadastrar", dados);

      //Mandar para a pagina /loginpj checar se ok essa rota
      this.props.history.push("/");

      this.setState({ sucess: "Conta criada com sucesso!", error: "" });
    } catch (_err) {
      console.log(_err);
      this.setState({
        error: "Houve um erro com o cadastro, verifique os dados"
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="content">
          <div className="container">
            <img className="logo-one" src={logo} alt="Idonation" />
          </div>
          <div className="form-row">
            <div className="form-group col-md-5">
              <label htmlFor="inputEmail4"> Razão Social </label>
              <input
                type="text"
                className="form-control"
                id="razaoSocial"
                placeholder="Nome da empresa LTDA"
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
                placeholder="empresa@xxx.com.br"
                onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-3">
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

            <div className="form-group col-md-3">
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
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="inputAddress2"> CNPJ </label>
              <MaskedInput
                mask="11.111.1111/1111-11"
                required
                type="text"
                className="form-control"
                id="cnpj"
                placeholder="__.___.____/____-__"
                onChange={this.handleChange}
                maxLength="14"
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
            onClick={this.cadastrarPJ}
          >
            {" "}
            Enviar
          </button>
        </div>
      </div>
    );
  }
}
