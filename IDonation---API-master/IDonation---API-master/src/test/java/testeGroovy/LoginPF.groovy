package testeGroovy
import spock.lang.Specification;

import com.idonate.backend.domains.pass.PessoaPass;
import com.idonate.backend.IdonationTest;
public class LoginPF extends Specification {


    def 'valida login pessoa fisica'(){
        expect:

        teste == new IdonationTest().loginComSucesso(cpf, senha)

        where:
        cpf    | senha   | teste
        "TESTE"| "TESTE" | 200
        "123"  | "123"   | 200
        "bla"  | "bla"   | 400
    }

}
