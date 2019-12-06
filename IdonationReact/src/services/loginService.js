import api from './Api';

export const LoginService = {
    login,
    logout
}

function login(cpf, senha, identificacao){
    let url;
    let info;
    switch (identificacao) {
        case 'ong':
            url = 'Organizacao/login';
            info = {
                cnpj: cpf,
                password: senha
            }
            break;
        case 'pj':
            url = 'empresa/login';
            info = {
                cnpj: cpf,
                password: senha
            }
            break;
        case 'pf':
            url = 'pessoa/login';
            info = {
                cpf: cpf,
                senha: senha
            }
            break;
        default:
            return null;
            break;
    }
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    return api.post(url, info, requestOptions).then(
        person => {
            console.log(person)
            if(person.data != ""){
                localStorage.setItem('user', JSON.stringify(person.data));
                console.log(person.data);
                alert('Bem vindo!');
                return {person, identificacao};
            }else{
                alert('Usuario e/ou senha incorretos');                
                return null;
            }
        }
    )
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}
