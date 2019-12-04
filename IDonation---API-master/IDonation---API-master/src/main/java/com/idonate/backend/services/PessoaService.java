package com.idonate.backend.services;

import java.io.FileWriter;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Formatter;
import java.util.FormatterClosedException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idonate.backend.domains.Pessoa;
import com.idonate.backend.domains.pass.PessoaPass;
import com.idonate.backend.repositories.PessoaRepository;
import com.idonate.backend.services.exceptions.AuthenticationFailedException;
import com.idonate.backend.services.exceptions.ObjectNotFoundException;

@Service
public class PessoaService {

	@Autowired
	private PessoaRepository repository;

	public List<Pessoa> usuariosLogados;

	public PessoaService() {
		this.usuariosLogados = new ArrayList<>();
	}

	public List<Pessoa> getAllPessoas() {
		return repository.findAll();
	}

	public Pessoa findById(String id) {
		Optional<Pessoa> opPessoa = repository.findById(id);
		Pessoa pessoa = opPessoa.orElseThrow(() -> new ObjectNotFoundException("Pessoa não encontrada"));
		return pessoa;
	}

	public Pessoa findByCpf(String cpf) {
		Optional<Pessoa> opPessoa = repository.findByCpf(cpf);
		Pessoa pessoa = opPessoa.orElseThrow(() -> new ObjectNotFoundException("Pessoa não encontrada"));
		return pessoa;
	}

	public void salvar(Pessoa p) {
		repository.save(p);
	}

	public Pessoa update(Pessoa pessoa) {
		Pessoa newPessoa = findById(pessoa.getId());
		updateData(newPessoa, pessoa);
		return repository.save(newPessoa);
	}

	public boolean autenticate(PessoaPass pass) {
		Pessoa pessoa = findByCpf(pass.getCpf());
		Integer pessoaPass = pessoa.getPass().hashCode();
		Integer passPass =pass.hashCode();
		
		if (pessoaPass.equals(passPass)) {
			return true;
		}
		throw new AuthenticationFailedException("Falha na autenticação");
	}

	public Pessoa updateData(Pessoa newPessoa, Pessoa pessoa) {
		newPessoa.setId(pessoa.getId());
		newPessoa.setEmail(pessoa.getEmail());
		newPessoa.setNome(pessoa.getNome());
		newPessoa.setSobrenome(pessoa.getSobrenome());
		newPessoa.setPass(pessoa.getPass());
		return newPessoa;
	}

	public void logUsuariosLogados(Pessoa e, String s) {
		System.out.println(usuariosLogados.add(e));
		if (usuariosLogados.size() > 10 || s.equals("Deslogado")) {
			// criar documento de log para usuários logados
			for (Pessoa p : usuariosLogados) {
				gravaArquivoTxt(p, s);
			}
			if (!s.equals("Deslogado"))
				usuariosLogados.clear();
		}

	}

	private static void gravaArquivoTxt(Pessoa lista, String status) {
		FileWriter f = null;
		Formatter s = null;

		try {
			f = new FileWriter("UsuariosLogados.txt", true);
			s = new Formatter(f);
		} catch (IOException ex) {
			System.err.println("Erro ao abrir o arquivo " + ex.getMessage());
			System.exit(1);
		}

		try {
			s.format("\n %s %s %s", lista.getEmail(), LocalDate.now().toString(), status);
		} catch (FormatterClosedException ex) {
			System.out.println("Erro ao gravar no arquivo, " + ex.getMessage());
		} finally {
			s.close();
			try {
				f.close();
			} catch (IOException ex) {
			}
		}

	}

	public String logout(Pessoa u) {
		usuariosLogados.remove(u);
		logUsuariosLogados(u, "Saiu do sistema");
		return "Deslogado com sucesso!";
	}

}
