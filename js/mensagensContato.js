
//insere ou remove msg erro durante escrita no input
for(let i = 0; i < 4; i++){
  let el = form[i]
  let error = document.querySelector("#"+el.id + "+ span.error")
  el.addEventListener("input", (event) => {
    if (el.validity.valid) {
      el.classList.remove("invalid")
      el.classList.add("valid")
      error.textContent = ""
      error.className = "error" 
    } else {
      el.classList.remove("valid")
      el.classList.add("invalid")
      showError(el.name ,error)
    }
  });
}

//click botao Enviar
submit.addEventListener("click", (event) => {
  let valid = true
  //verifica se cada campo valido
  for(let i = 0; i < 4; i++){
    el = form[i]
    error = document.querySelector("#"+el.id + "+ span.error")
   
    if (!el.validity.valid) {
      valid = false
      showError(el.name ,error)
      event.preventDefault()
    }
  }
  //se tds campos validos
  //armazena objeto mensagem
  if(valid){
    let mensagem = {nome: "",telefone: "",email: "",mensagem: ""}
    for(let i = 0; i < 4; i++){
      let el = form[i]
     mensagem[el.name] = el.value
    }
    addMensagem(mensagem)
  }
});

function showError(name, error) {
  error.textContent = `Por favor, insira um(a) ${name} válido(a).`
  error.className = "error active"
}

function addMensagem(mensagem){
  let mensagens = []
  let json
  if(localStorage["mensagensContato"]){
    json = localStorage.getItem("mensagensContato")
    mensagens = JSON.parse(json)
  }
  mensagens.push(mensagem)
  json = JSON.stringify(mensagens)
  localStorage.setItem("mensagensContato", json)
}

function clearMensagens(){
  localStorage.remove("mensagensContato")
}