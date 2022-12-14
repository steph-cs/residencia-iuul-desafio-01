
//valida formulario
//armazena mensagens

if(document.title == "Home"){
  const submit = document.getElementById("btn-submit")
  const form = document.getElementById("form-contato").elements
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

  //btn limpar mensagens
  const btn_limpar_mensagens = document.getElementById("btn-limpar-mensagens")
  btn_limpar_mensagens.addEventListener("click", (event) => {
    clearMensagens()
    toast("Mensagens excluídas.")
    console.log("toast")
  })
}
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

  toast("Mensagem enviada.")
}

function clearMensagens(){
  localStorage.removeItem("mensagensContato")
}


/*Listagem mensagens */

const mensagensHtml = document.getElementById("mensagens")

if(document.title == "Mensagens"){
  addMensagemHtml()
}

function addMensagemHtml(){
 
  if(localStorage["mensagensContato"]){
    let json = localStorage.getItem("mensagensContato")
    let mensagens = JSON.parse(json)

    for(let i = 0; i < mensagens.length; i++){
      
      mensagensHtml.innerHTML += `
        <div class="mensagem">
          <div class="f-row contato">
            <div>
              <h4>Nome:</h4>
              <p>${mensagens[i]["nome"]}</p>
            </div>
            <div>
              <h4>Telefone:</h4>
              <p><a href='tel:+${mensagens[i]["telefone"]}'>${mensagens[i]["telefone"]}</a></p>
            </div>
            <div>
              <h4>Email:</h4>
              <p><a href='mailto:${mensagens[i]["email"]}'>${mensagens[i]["email"]}</a></p>
            </div>
          </div>
          <div class="f-col contato-mensagem">
            <h3>Mensagem:</h3>
            <p>${mensagens[i]["mensagem"]}</p>
          </div>
      </div>
      `  
    }
  }else{
    mensagensHtml.innerHTML += `
        <div class="mensagem f-col center">
          <p>Não há mensagens enviadas.</p>
          <a class="btn btn-third" href="/index.html#form-contato">Enviar mensagem</a>
        </div>
      `
  }
}

function toast(mensagem) {
  var toast = document.getElementById("toast");
  toast.innerHTML = `${mensagem}`
  toast.className = "show";
  setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}