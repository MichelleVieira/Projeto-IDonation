import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CadastroOng from './home/cadastro/CadastroOng';
import CadastroPF from './home/cadastro/CadastroPF';
import CadastroPJ from './home/cadastro/CadastroPJ';
import HomeDoadores from './home/homeDoadores/HomeDoadores';
import Home from './home/homeOng/Home';
import DoacoesRealizadas from './fluxoDoadores/doacoesRealizadas/DoacoesRealizadas';
import FazerDoacao from './fluxoDoadores/fazerDoacao/FazerDoacao';
import PublicarDoacoes from './fluxoDoadores/publicarDoacoes/PublicarDoacoes';
import LoginPf from './home/login/LoginPF';
import LoginPj from './home/login/LoginPJ';
import DoacoesDeInteresse from './fluxoInstituicoes/doacoesDeInteresse/DoacoesDeInteresse';
import DoacoesRecebidas from './fluxoInstituicoes/doacoesRecebidas/DoacoesRecebidas';
import Logout from './logout/logout/Logout';
import Chat from './components/Chat';
import matchs from './fluxoInstituicoes/matches/matchs';
import DoacoesPublicadas from   './fluxoDoadores/doacoesPublicadas/DoacoesPublicadas';
import likes from './fluxoDoadores/Likes/Likes';
import  publicadas from './fluxoInstituicoes/Publicadas/publicadas';
import { PrivateRoute } from './components/PrivateRoute';

// import Home from './home/homeOng';

export default class Routes extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route PrivateRoute exact path="/" component={LoginPf} />
                    <Route path="/loginpj" component={LoginPj} />
                    <Route path="/logout"  component={Logout} />


                    <Route path="/HomeDoadores" component={HomeDoadores} />
                    <Route path="/HomeOngs" component={Home} />

                    <Route path="/PublicarDoacoes" component={PublicarDoacoes} />
                    <Route path="/DoacoesRealizadas" component={DoacoesRealizadas} />
                    <Route path="/FazerDoacao" component={FazerDoacao} />
                    <Route path="/publicações" component={DoacoesPublicadas}/>
                    <Route path="/likes/:id" component={likes}/>

                    <Route path="/DoacoesDeInteresse" component={DoacoesDeInteresse} />
                    <Route path="/DoacoesRecebidas" component={DoacoesRecebidas} />
                    <Route path="/matchs" component={matchs}/>
                    <Route path="/DoacoesPublicadas" component={publicadas} />


                    <Route path="/CadastroPF" component={CadastroPF} />
                    <Route path="/CadastroPJ" component={CadastroPJ} />
                    <Route path="/CadastroOng" component={CadastroOng} />
                    <Route path="/Chat" component={Chat} />

                </Switch>
            </BrowserRouter>
        );
    }
}
