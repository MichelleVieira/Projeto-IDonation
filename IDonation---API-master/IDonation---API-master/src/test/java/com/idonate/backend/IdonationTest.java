package com.idonate.backend;

import org.junit.Before;
import org.springframework.http.ResponseEntity;

import com.idonate.backend.domains.Pessoa;
import com.idonate.backend.domains.pass.PessoaPass;
import com.idonate.backend.resources.PessoaResource;

public class IdonationTest {

    private PessoaResource resource;

    @Before
    public void setUp(){

    }

    public String loginComSucesso(String cpf, String senha){
        PessoaPass pessoa= new PessoaPass(cpf, senha);
        ResponseEntity<Pessoa> resposta = resource.logar(pessoa);

        return String.valueOf(resposta.getBody());
    }

}
