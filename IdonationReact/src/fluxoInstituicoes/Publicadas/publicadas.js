import React,{ Component } from 'react';
import Navbar from '../../components/Navbar';
import { Link } from 'react-router-dom';
import publicadas from './publicadas.css';
import minhaFoto from '../../template/assets/images/user.png';
import more from '../../img/plus.svg';
import Api from '../../services/Api';
import { requestOptions } from '../../Url';
 


export default class Home extends Component {
    
  currentUser;

  countId = 0;
    constructor(props){
      super(props);
      this.state = {
        publicacoes: []
      };

      this.currentUser = JSON.parse(localStorage.getItem('user'));
    }

    handleNewDonations = async () =>{
      return await Api.get('donation/todasDoacoes', requestOptions)
        .then(res => {
          this.setState({publicacoes: res.data});
        });
    }

    handleShowDonation = (doacao) => {
      if(doacao.ong != null){
        doacao.ong.forEach(element => {
          if(element.id === this.currentUser.id){
            console.log(doacao);
            console.log(element);
            console.log(this.currentUser);
            console.log('achou um igual');
            return;
          }
        });
      }else{
        return (
          <div className="publicacoes container" key={++this.countId}>
          <div className="umPerfil">
            <img className="logo-principal logo-doadores minhaFoto-style"  src={minhaFoto} />
        <p className="eu">{ doacao.pessoa != null ? doacao.pessoa.nome : (doacao.empresa != null ? doacao.empresa.razao_social  : 'Empresa X' ) }</p>
          </div>
          <h3>Publicação:</h3>
          <div className="umaPublicacao">
            <p>{ doacao.descricao }</p>
          </div>
          
          <div className="btn-clique">
            <button className="btn btn-clique-one" value={doacao.idDoacao} onClick={(event) => this.handleInsertNewLike(event)}>Curtir</button>
            <button className="btn btn-clique-two">Ocultar</button>
          </div>
         </div>
        )
      }
      
    }

    handleInsertNewLike = (e) => {

      console.log(e.target.value)

      let usuario = JSON.parse(localStorage.getItem('user'));

      let objDoacao;

      this.state.publicacoes.forEach(element => {
        if(element.idDoacao === e.target.value){
          objDoacao = element;
        }
      });

      console.log(objDoacao);

      if(objDoacao.ong != null){
        objDoacao.ong.push(usuario);
      }

      let doacao = {
        idDoacao: objDoacao.idDoacao,
        tipoDoacao: objDoacao.tipoDoacao,
        descricao: objDoacao.descricao,
        dataCriacao: objDoacao.dataCriacao,
        categoria: objDoacao.categoria,
        empresa: objDoacao.empresa != null ? objDoacao.empresa : null,
        pessoa: objDoacao.pessoa != null ? objDoacao.pessoa : null,
        ong: objDoacao.ong == null ? [usuario] : objDoacao.ong
      }

      console.log(doacao);

      Api.put('donation/updateDonation', doacao,requestOptions)
        .then(res => {
          if(res.status == 200){
            this.handleNewDonations();
          }
        });
    }

    async componentDidMount(){
      await this.handleNewDonations();
    }

    render() {
        return (
            <div>
                <div className="geral">
                <Navbar/>
                </div>
                <Link className="paragrafo-HD" to="/HomeOngs">Página Inicial /</Link>
                <Link className="paragrafo-FD" to="/DoacoesPublicadas">Doações Publicadas</Link>
              {
                this.state.publicacoes != null ? this.state.publicacoes.map(doacao => 
                  (
                    this.handleShowDonation(doacao)
                  )     
                )
                : null
              }
             
        
           <Link className="more-style" to="#"><img className="more"  src={more} /></Link>
            

         
    
            

           </div>
           
        );
    }
}








//