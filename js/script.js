//destaque nav 
//secao sendo vizualizada

function isInViewport(el) {
  var rect = el.getBoundingClientRect();
  var elemTop = rect.top;
  var elemBottom = rect.bottom;

  // ocupa menos da metade da tela
  isVisible = elemTop < window.innerHeight/2 && elemBottom > window.innerHeight/2;
  return isVisible;
}

const nav = ["home", "perfil", "portfolio", "contato"];

nav.forEach(element => {
  document.addEventListener('scroll', function () {
    let el = document.getElementById(element);
    const messageText = isInViewport(el) ?
      destacaMenu(element) :
      "n visivel";
  }, {
    passive: true
  });
});

function destacaMenu(el){
  document.getElementsByClassName("active")[0].classList.remove("active");
  let id = "nav-"+ el
  let nav = document.getElementById(id)
  nav.classList.add("active")
}


//msg erro formulario

const submit = document.getElementById("btn-submit")
const form = document.getElementById("form-contato").elements


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




submit.addEventListener("click", (event) => {
  for(let i = 0; i < 4; i++){
    el = form[i]
    error = document.querySelector("#"+el.id + "+ span.error")
   
    if (!el.validity.valid) {
      showError(el.name ,error)
      event.preventDefault()
    }
  }
  
});

function showError(name, error) {
  error.textContent = `Por favor, insira um ${name} válido.`
  error.className = "error active"
}