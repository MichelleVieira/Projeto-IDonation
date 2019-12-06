import React, { Component } from 'react';
import api from '../../services/Api';
import camera from '../../template/assets/images/camera.svg';
import logo from '../../template/assets/images/logo.png';
import MaskedInput from 'react-maskedinput'

export default class CadastroOng extends Component {


    constructor(pros) {
        super(pros);
        this.state = {
            razaoSocial: '',
            descricao: '',
            categoria: '',
            email: '',
            cnpj: '',
            password: '',
            cep: '',
            uf: '',
            endereco: '',
            numero: '',
            cidade: '',
            success: '',
            error: '',
        };
    }

    handleChange = (event) => {
        const state = Object.assign({}, this.state);
        let field = event.target.id;
        state[field] = event.target.value;
        // console.log(state);
        this.setState(state);
    }

    cadastrarOng = () => {
        let razaoSocial = this.state.razaoSocial;
        let email = this.state.email;
        let password = this.state.password;
        let cnpj = this.state.cnpj;
        let categoria = this.state.categoria;
        let descricao = this.state.descricao;


        let dados = {
            id: null,
            razao_social: razaoSocial,
            descricao: descricao,
            categoria: categoria,
            email: email,
            pass: {
                cnpj: cnpj,
                password: password
            }
        }
        console.table(dados);

        try {
            api.post('/Organizacao/cadastrar', dados);

            //Mandar para a pagina /loginpj checar se ok essa rota
            this.props.history.push("/");

            this.setState({ sucess: 'Conta criada com sucesso!', error: '' });
        } catch (_err) {
            this.setState({ error: 'Houve um erro com o cadastro, verifique os dados' });
        }
    }

    render() {

        return (
            <div className="container">

                <div className="content">


                    <div className="container">
                        <img className="logo-one" src={logo}
                            alt="Idonation" />
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="inputEmail4"> Razão Social </label>
                            <input required type="text" className="form-control" id="razaoSocial"
                                placeholder="Nome da empresa LTDA"
                                onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="inputEmail4"> Email </label>
                            <input type="email" className="form-control" id="email"
                                placeholder="empresa@xxx.com.br"
                                onChange={this.handleChange} />
                        </div>

                        <div className="form-group col-lg-2">
                            <label htmlFor="inputPassword4"> Senha </label>
                            <input required type="password" className="form-control" id="password"
                                placeholder="******"
                                onChange={this.handleChange} />
                        </div>

                        <div className="form-group col-lg-2">
                            <label htmlFor="inputPassword4"> Confirmação de Senha </label>
                            <input required type="password" className="form-control" id="confSenha"
                                placeholder="*****"
                                onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="form-row">

                        <div className="form-group col-md-3">
                            <label htmlFor="inputAddress2"> CNPJ </label>
                            <MaskedInput mask="111.111.111.11111" required type="text" className="form-control"
                                id="cnpj"
                                placeholder="___.___.___.____"
                                onChange={this.handleChange} />
                        </div>

                        <div className="form-group col-md-2">
                            <label htmlFor="inputAddress"> CEP </label>
                            <MaskedInput mask="11111.111" type="text" className="form-control" id="cep"
                                placeholder="_____.__"
                                onChange={this.handleChange}
                            />
                        </div>

                        <div className="form-group col-md-1">
                            <label
                                htmlFor="inputEstado"> UF </label>
                            <select id="estado" className="form-control col-md-9"
                                onChange={this.handleChange}>
                                <option defaultValue> SP</option>
                                <option>SP
                                    </option>
                                <option>RJ
                                    </option>
                            </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="inputAddress"> Endereço </label>
                            <input type="text" className="form-control" id="endereco"
                                placeholder="Rua dos Anjos"
                                onChange={this.handleChange} />
                        </div>

                        <div className="form-group col-md-1">
                            <label htmlFor="inputAddress2"> Número </label>
                            <input type="text" className="form-control col-md-10"
                                id="numero"
                                placeholder="456b"
                                onChange={this.handleChange} />
                        </div>

                        <div className="form-group col-md-2">
                            <label
                                htmlFor="inputCity"> Cidade </label> <
                                input type="text"
                                className="form-control"
                                id="cidade"
                                placeholder="São Paulo"
                                onChange={this.handleChange} />
                        </div>
                    </div>

                    <div className="textboxCadastro">

                        <div className="form-group col-md-8">
                            <label
                                htmlFor="inputEstado"> Categoria </label>
                            <select id="categoria"
                                className="form-control col-md-9"
                                onChange={this.handleChange}>
                                <option defaultValue> Escolher ...</option>
                                <option>Crianças
                                    </option>

                                <option>Adultos
                                    </option>
                                <option>Idosos
                                    </option>
                            </select>
                        </div>
                        <div className="form-group col-md-2">
                            < label htmlFor="descricao"> Descrição </label>
                            <textarea id="descricao"
                                rows="10"
                                cols="50"
                                type="text"
                                placeholder="Digite aqui a descrição da sua Instituição"
                                onChange={this.handleChange}>
                            </textarea>
                        </div>

                    </div>


                    <div className="form-group">

                        <div className="form-check">
                            <input className="form-check-input"
                                type="checkbox"
                                id="gridCheck" />
                            <label className=
                                "form-check-label"
                                htmlFor="gridCheck">
                                Li e concordo com os termos e condições e politica de privacidade.
                                </label>

                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={this.cadastrarOng}> Enviar</button>
                </div>
            </div>
        );
    }
}
