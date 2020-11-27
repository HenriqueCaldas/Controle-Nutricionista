
var botao = document.querySelector("#adicionar-paciente");

botao.addEventListener("click", function(event){
    event.preventDefault();

    var form = document.querySelector("#formulario");

    var paciente = obtemDadoDoFormulario(form);

    var erros = validaPaciente(paciente);
    if(erros.length > 0) {
        exibeMensagensErros(erros);
        return;
    }
    
    adicionaPacienteNaTabela(paciente);

    var mensagensErro = document.querySelector("#mensagem-erro");
    mensagensErro.innerHTML = "";

    form.reset();

});

function adicionaPacienteNaTabela(paciente){
    var pacienteTr = montaTr(paciente);
    var tabela = document.querySelector("#tabela-pacientes");
    tabela.appendChild(pacienteTr);
}

function obtemDadoDoFormulario(form) {
    var paciente = {
        nome: form.nome.value,
        peso: form.peso.value,
        altura: form.altura.value,
        gordura: form.gordura.value,
        imc: calculaImc(form.peso.value, form.altura.value)
    }
    return paciente;
}
function montaTr(paciente) {
    var pacienteTr = document.createElement("tr");
    pacienteTr.classList.add("paciente");

    var nomeTd = montaTd(paciente.nome, "info-nome");
    var pesoTd = montaTd(paciente.peso, "info-peso");
    var alturaTd = montaTd(paciente.altura, "info-altura");;
    var gorduraTd = montaTd(paciente.gordura, "info-gordura");;
    var imcTd = montaTd(paciente.imc, "info-imc");;

    pacienteTr.appendChild(nomeTd);
    pacienteTr.appendChild(pesoTd);
    pacienteTr.appendChild(alturaTd);
    pacienteTr.appendChild(gorduraTd);
    pacienteTr.appendChild(imcTd);

    return pacienteTr;
}

function montaTd(dado, classe) {
       var td =  document.createElement("td");
       td.textContent = dado;
       td.classList.add(classe);

       return td;
}
function validaPaciente(paciente) {
    var erros = [];
    if(paciente.nome.length == "") {
        erros.push("O campo nome está em branco.");
    }
    if(paciente.peso.length == "") {
        erros.push("O campo peso está em branco.");
    }
    if(!validaPeso(paciente.peso)) {
        erros.push("Peso Inválido!");
    }
    if(!validaAltura(paciente.altura)){
        erros.push("Altura inválida!");
    }
    if(!paciente.altura) {
        erros.push("O campo altura está em branco.");
    }      
    if(paciente.gordura.length == "") {
        erros.push("O campo gordura está em branco.");
    }
    return erros;
}
function exibeMensagensErros(erros){
   
        var ul = document.querySelector("#mensagem-erro");
        ul.innerHTML = "";
        erros.forEach(function(erro){

            var li = document.createElement("li");
            li.textContent = erro;
            ul.appendChild(li);
        });
}