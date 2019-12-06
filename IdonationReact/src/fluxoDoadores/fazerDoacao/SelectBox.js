import React, {Component} from 'react';


export default class SelectBox extends Component {

    handleChange(e) {
        e.preventDefault();
        const Valor = e.target.value;
        this.props.funcao(Valor);
    }

    render() {
        return (

            <select funcao={this.exibirSelect.bind(this)} dados={this.state.ongs}/>

        );

    }
}


