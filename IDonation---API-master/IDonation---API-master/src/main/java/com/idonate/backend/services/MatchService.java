package com.idonate.backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.idonate.backend.domains.Match;
import com.idonate.backend.repositories.MatchRepository;

@Service
public class MatchService {

	@Autowired
	private MatchRepository matchRepository;	
	
	public List<Match> getMatchesById(String id) {
		List<Match> matches = matchRepository.findMatchsById(id);
		return matches;
	}

	public Match setMatch(Match match) {
		List<Match> l = matchRepository.findAll();
		for (Match m : l) {
			if(m.getIdDoador().equals(match.getIdDoador()) && m.getIdOng().equals(match.getIdOng()))
				return null;
		}
		return matchRepository.save(match);
	}

	public List<Match> getAllMatches() {
		return matchRepository.findAll();
	}

	public List<Match> getAllByIdUser(String id) {
		return matchRepository.findAllByIdUser(id);
	}

}
