import React, { Component } from 'react';
import { LoginService } from '../../services/loginService';

import logo from '../../img/logos/IDonation-logo.png';


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cnpj: '',
            senha: '',
            loading: false
        }

        LoginService.logout();
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`nome ${name}, valor ${value}`);
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { cnpj, senha } = this.state;
        console.log(`${cnpj}, ${senha}, a`);
        if (!(cnpj && senha))
            return;

        this.setState({ loading: true });

        this.loadDados(cnpj, senha);
    }

    componentDidMount() {
        //this.loadDados();
    }
    loadDados = (cnpj, senha) => {
        console.log(cnpj, senha);
        LoginService.login(cnpj, senha)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                },
                error => this.setState({ error, loading: false })
            );
    }
    render() {
        return (
            <div className="page-content">
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
                        <div className="form-checkbox" >
                            <label className="container" > <p> Sou pessoa fisica </p>
                                <input type="checkbox" name="checkbox" />
                                <span className="checkmark"> </span> </label >
                        </div>
                        <div className="form-row-last" >
                            <input type="submit" name="register" className="register" value="Entrar" />
                        </div>
                        <a href="#" className="register-two">Cadastre-se</a>
                    </form>
                </div>
            </div>
        );

    }
}
