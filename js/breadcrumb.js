
if(document.title == "Home"){
  //limpa breadcrumbs
  localStorage.clear()
  
  //add nome pag e link local storage
  //link da secao ativa
  localStorage.setItem("page"+0, "Portfólio")
  localStorage.setItem("link"+0, "/index.html#portfolio")

}else{
  crumb = true
  var count_page = localStorage.length/2
  
  for(let i = 0; i <= count_page; i++){
    if (localStorage.getItem("page"+i) == document.title){
      crumb = false
      continue
    }
    if(!crumb){
      localStorage.removeItem("page"+i)
      localStorage.removeItem("link"+i)
    }
  }

  count_page = localStorage.length/2
  if(crumb){
    //add nome pag e link local storage
    localStorage.setItem("page"+count_page, document.title)
    localStorage.setItem("link"+count_page, document.documentURI)
  }

  count_page = localStorage.length/2
  //add breadcrumbs html
  let main = document.getElementsByTagName("main")[0]
  main.innerHTML = `<div class="w-100"><ul class="breadcrumb f-row" id="breadcrumb"></ul></div>` + document.getElementsByTagName("main")[0].innerHTML
  let breadcrumb = document.getElementById("breadcrumb")

  
  for(let i = 0; i < count_page; i++){
    if(i == count_page -1 ){
      breadcrumb.innerHTML += `<li><a class="active" href="#" ">${localStorage.getItem("page"+i)}</a></li>`;
    }else{
      breadcrumb.innerHTML += `<li><a href="${localStorage.getItem("link"+i)}" >${localStorage.getItem("page"+i)}</a></li>`;
    }
  }
  
}

