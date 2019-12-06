import React, { Component } from 'react';
import { LoginService } from '../../services/loginService';
import logo from '../../img/logos/IDonation-logo.png';
import Loginpf from './Loginpf.css';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cpf: '',
            senha: '',
            loading: false,
            ePessoaFisica: true,
            ePessoaJuridica: false,
            eOrganizacao: false
        }

        LoginService.logout();
    }

    handleChange = (e) => {
        console.log('a');
        const { name, value } = e.target;
        console.log(`nome ${name}, valor ${value}`);
        if (value == 'on') {
            let valor = true;
            if (name == 'ePessoaJuridica') {
                valor = this.state.ePessoaJuridica ? false : true;
                console.log(valor);
                if (valor) {
                    this.setState({ eOrganizacao: false });
                    this.setState({ ePessoaFisica: false });
                }
            }
            else if (name == 'eOrganizacao') {
                valor = this.state.eOrganizacao ? false : true;
                console.log(valor);
                if (valor) {
                    this.setState({ ePessoaJuridica: false });
                    this.setState({ ePessoaFisica: false });
                }
            }
            else if (name == 'ePessoaFisica') {
                valor = this.state.ePessoaFisica ? false : true;
                console.log(valor);
                if (valor) {
                    this.setState({ ePessoaJuridica: false });
                    this.setState({ eOrganizacao: false });
                }
            }
            this.setState({ [name]: valor });
        } else {
            this.setState({ [name]: value });
        }
    }

    handleSubmit = (e) => {
        let identificacao;
        if (this.state.eOrganizacao) {
            identificacao = 'ong';
        }
        if (this.state.ePessoaJuridica) {
            identificacao = 'pj';
        }
        if (this.state.ePessoaFisica) {
            identificacao = 'pf';
        }
        e.preventDefault();

        const { cpf, senha } = this.state;
        console.log(`${cpf}, ${senha}, a`);
        if (!(cpf && senha))
            return;

        this.setState({ loading: true });

        this.loadDados(cpf, senha, identificacao);
    }

    componentDidMount() {
        //this.loadDados();
    }
    loadDados = (cpf, senha, identificacao) => {
        LoginService.login(cpf, senha, identificacao)
            .then(
                user => {
                    if (user != null) {
                        let caminho;
                        if (user.identificacao == 'ong') {
                            caminho = '/HomeOngs'
                        } else {
                            caminho = '/HomeDoadores'
                        }
                        const { from } = this.props.location.state || { from: { pathname: caminho } };
                        this.props.history.push(from);
                    }
                },
                error => this.setState({ error, loading: false })
            );
    }
    render() {
        const { ePessoaFisica } = this.state;
        const { ePessoaJuridica } = this.state;
        const { eOrganizacao } = this.state;

        let formLogin;

        if (ePessoaFisica) {
            formLogin = (
                <div className="form-v4-content" >
                    <div className="form-left">
                        <h2 className="welcome">Seja <br /> Bem Vindo! </h2>
                        {/* <p><a href="#">Saiba mais</a></p> */}
                        {/* <p className="text-1" >cadastre-se clicando no botão abaixo. </p> */}
                        <div className="form-detail register " >
                        </div>
                    </div>
                    <form className="form-detail" action="#" id="myform" onSubmit={(e) => this.handleSubmit(e)}>
                        <img src={logo} alt="logo" />
                        <h2> Entre com suas Credenciais </h2>
                        <div className="form-group" >
                            <div className="form-row form-row-1" >
                                <label for="first_name" > CPF: </label>
                                <input type="text" name="cpf" className="input-text" onChange={(e) => this.handleChange(e)} />
                            </div>
                        </div>
                        <div className="form-group" >
                            <div className="form-row form-row-1 " >
                                <label for="password" > Senha: </label>
                                <input type="password" name="senha" className="input-text" required onChange={(e) => this.handleChange(e)} />

                            </div>

                        </div>
                        <a href="#" className="register-for" >Esqueci a senha</a>

                        <label class="container-checkbox">Sou pessoa Jurica
                                <input type="checkbox" name="ePessoaJuridica" onChange={(e) => this.handleChange(e)} checked={this.state.ePessoaJuridica} />
                            <span class="checkmark"></span>
                        </label>

                        <label class="container-checkbox">Sou Organização
                                <input type="checkbox" name="eOrganizacao" onChange={(e) => this.handleChange(e)} checked={this.state.eOrganizacao} />
                            <span class="checkmark"></span>
                        </label>

                        <div className="form-row-last" >
                            <input type="submit" name="register" className="register" value="Entrar" />
                        </div>
                        <Link to="/CadastroPf">
                            <span className="register-two">Cadastre-se</span>
                        </Link>
                    </form>
                </div>
            );
        }

        if (ePessoaJuridica) {
            {
                formLogin = (
                    <div className="form-v4-content" >
                        <div className="form-left">
                            <h2 className="welcome">Seja <br /> Bem Vindo! </h2>
                            {/* <p><a href="#">Saiba mais</a></p> */}
                            {/* <p className="text-1" >cadastre-se clicando no botão abaixo. </p> */}
                            <div className="form-detail register " >
                            </div>
                        </div>
                        <form className="form-detail" action="#" id="myform" onSubmit={(e) => this.handleSubmit(e)}>
                            <img src={logo} alt="logo" />
                            <h2> Entre com suas Credenciais </h2>
                            <div className="form-group" >
                                <div className="form-row form-row-1" >
                                    <label for="first_name" > CNPJ: </label>
                                    <input type="text" name="cpf" className="input-text" onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="form-row form-row-1 " >
                                    <label for="password" > Senha: </label>
                                    <input type="password" name="senha" className="input-text" required onChange={(e) => this.handleChange(e)} />

                                </div>

                            </div>
                            <a href="#" className="register-for" >Esqueci a senha</a>

                            <label class="container-checkbox">Sou pessoa Fisica
                                <input type="checkbox" name="ePessoaFisica" onChange={(e) => this.handleChange(e)} checked={this.state.ePessoaFisica} />
                                <span class="checkmark"></span>
                            </label>

                            <label class="container-checkbox">Sou Organização
                                <input type="checkbox" name="eOrganizacao" onChange={(e) => this.handleChange(e)} checked={this.state.eOrganizacao} />
                                <span class="checkmark"></span>
                            </label>

                            <div className="form-row-last" >
                                <input type="submit" name="register" className="register" value="Entrar" />
                            </div>
                            <Link to="/CadastroPJ">
                                <span className="register-two">Cadastre-se</span>
                            </Link>
                        </form>
                    </div>
                );
            }
        }

        if (eOrganizacao) {
            {
                formLogin = (
                    <div className="form-v4-content" >
                        <div className="form-left">
                            <h2 className="welcome">Seja <br /> Bem Vindo! </h2>
                            {/* <p><a href="#">Saiba mais</a></p> */}
                            {/* <p className="text-1" >cadastre-se clicando no botão abaixo. </p> */}
                            <div className="form-detail register " >
                            </div>
                        </div>
                        <form className="form-detail" action="#" id="myform" onSubmit={(e) => this.handleSubmit(e)}>
                            <img src={logo} alt="logo" />
                            <h2> Entre com suas Credenciais </h2>
                            <div className="form-group" >
                                <div className="form-row form-row-1" >
                                    <label for="first_name" > CNPJ: </label>
                                    <input type="text" name="cpf" className="input-text" onChange={(e) => this.handleChange(e)} />
                                </div>
                            </div>
                            <div className="form-group" >
                                <div className="form-row form-row-1 " >
                                    <label for="password" > Senha: </label>
                                    <input type="password" name="senha" className="input-text" required onChange={(e) => this.handleChange(e)} />

                                </div>

                            </div>
                            <a href="#" className="register-for" >Esqueci a senha</a>

                            <label class="container-checkbox">Sou pessoa Fisica
                                <input type="checkbox" name="ePessoaFisica" onChange={(e) => this.handleChange(e)} checked={this.state.ePessoaFisica} />
                                <span class="checkmark"></span>
                            </label>

                            <label class="container-checkbox">Sou Pessoa Jurica
                                <input type="checkbox" name="ePessoaJuridica" onChange={(e) => this.handleChange(e)} checked={this.state.ePessoaJuridica} />
                                <span class="checkmark"></span>
                            </label>

                            <div className="form-row-last" >
                                <input type="submit" name="register" className="register" value="Entrar" />
                            </div>
                            <Link to="/CadastroOng">
                                <span className="register-two">Cadastre-se</span>
                            </Link>
                        </form>
                    </div>
                );
            }
        }

        return (
            <div className="page-content">
                {
                    ePessoaFisica ? formLogin : null
                }

                {
                    ePessoaJuridica ? formLogin : null
                }

                {
                    eOrganizacao ? formLogin : null
                }

            </div>
        );

    }
}
