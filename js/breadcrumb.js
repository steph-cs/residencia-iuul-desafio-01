let breadcrumb = {link: "", page: ""}

if(document.title == "Home"){
  //limpa breadcrumbs
  clearBreadcrumbs()
  
  //add nome pag e link local storage
  //link da secao ativa
  breadcrumb["link"] = "/index.html"
  breadcrumb["page"] = "Home"
  addBreadcrumb(breadcrumb)

}else{

  if(removeRightBreadcrumbs()){
    //add nome pag e link local storage
    breadcrumb["link"] = document.documentURI
    breadcrumb["page"] = document.title
    addBreadcrumb(breadcrumb)
  }
  insertBreadcrumbHtml()
}

function addBreadcrumb(breadcrumb){
  let breadcrumbs = []
  let json
  if(localStorage["breadcrumbs"]){
    json = localStorage.getItem("breadcrumbs")
    breadcrumbs = JSON.parse(json)
  }
  breadcrumbs.push(breadcrumb)
  json = JSON.stringify(breadcrumbs)
  localStorage.setItem("breadcrumbs", json)

}

function insertBreadcrumbHtml(){
  let breadcrumbs = localStorage["breadcrumbs"]
  let json = localStorage.getItem("breadcrumbs")
  breadcrumbs = JSON.parse(json)
  
  //add breadcrumbs html
  let main = document.getElementsByTagName("main")[0]
  main.innerHTML = `<div class="w-100"><ul class="breadcrumb f-row" id="breadcrumb"></ul></div>` + document.getElementsByTagName("main")[0].innerHTML
  let breadcrumb = document.getElementById("breadcrumb")

  
  for(let i = 0; i < breadcrumbs.length; i++){
    if(i == breadcrumbs.length -1 ){
      breadcrumb.innerHTML += `<li><a class="active" href="#" ">${breadcrumbs[i]["page"]}</a></li>`;
    }else{
      breadcrumb.innerHTML += `<li><a href="${breadcrumbs[i]["link"]}" >${breadcrumbs[i]["page"]}</a></li>`;
    }
  }
}

//verifica se pag atual estava contida nos breadcrumbs
//se sim, remove os crumbs a direita
function removeRightBreadcrumbs(){
  let breadcrumbs = localStorage["breadcrumbs"]
  let json
  let crumb = true
  
  json = localStorage.getItem("breadcrumbs")
  breadcrumbs = JSON.parse(json)

  for(let i = 0; i < breadcrumbs.length; i++){
    if (breadcrumbs[i]["page"] == document.title){
      crumb = false
      continue
    }
    if(!crumb){
      breadcrumbs.pop()
    }
  }
  
  json = JSON.stringify(breadcrumbs)
  localStorage.setItem("breadcrumbs", json)

  return crumb
}

function clearBreadcrumbs(){
  localStorage.removeItem("breadcrumbs")
}