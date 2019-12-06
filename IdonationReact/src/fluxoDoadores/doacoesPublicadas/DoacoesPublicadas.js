import React, { Component } from 'react';
import Navbar from '../../components/NavDoadores/Navbar';
import { Link } from 'react-router-dom';
import doacoesPublicadas from './doacoesPublicadas.css';
import minhaFoto from '../../template/assets/images/user.png';
import more from '../../img/plus.svg';
import Api from '../../services/Api';
import { LoginService } from '../../services/loginService';


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            doacoes: []
        }
    }

    handleDonationPubs = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        let user = JSON.parse(localStorage.getItem('user'));
        //TIREI O ID PARA TESTE. COLOCAR NOVAMENTE EM: /+user.id
        Api.get('donation/doador/' + user.id, requestOptions)
            .then(res => {
                this.setState({ doacoes: res.data })
                console.log(res.data)
            });
    }

    componentDidMount() {
        if (localStorage.getItem('user') == null || localStorage.getItem('user') == undefined) {
            LoginService.logout();
            this.props.history.push('/');
        } else {
            this.handleDonationPubs();
        }
    }

    render() {
        let { doacoes } = this.state;
        console.log(doacoes)
        if (doacoes == null || doacoes == undefined || doacoes == '') {
            doacoes = []
        }
        return (
            <div>
                <div className="geral">
                    <Navbar />
                </div>
                <Link className="paragrafo-HD" to="/HomeDoadores">Página Inicial /</Link>
                <Link className="paragrafo-FD" to="/publicações">Publicações</Link>

                {
                    doacoes.map(doacao => (
                        <div className="publicacoes container">
                            <div className="umPerfil">
                                <img className="logo-principal logo-doadores minhaFoto-style" src={minhaFoto} />
                                <p className="eu">{doacao.pessoa.nome}</p>
                            </div>
                            <h3>Publicação:</h3>
                            <div className="umaPublicacao">
                                <p>{doacao.descricao}</p>
                            </div>

                            <div className="btn-clique">
                                <Link className="span-like" to={doacao.ong == null ? '#' : '/likes/' + doacao.idDoacao}>Likes {doacao.ong == null ? 0 : doacao.ong.length}</Link>
                                <button className="btn btn-clique-one">Editar</button>
                                <button className="btn btn-clique-two">Excluir</button>

                            </div>
                        </div>
                    ))
                }


                <Link className="more-style" to="#"><img className="more" src={more} /></Link>


            </div>

        );
    }
}
