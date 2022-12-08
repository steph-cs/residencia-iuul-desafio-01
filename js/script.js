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


//valida formulario
//armazena mensagens


const submit = document.getElementById("btn-submit")
const form = document.getElementById("form-contato").elements

