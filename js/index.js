function buttonLogin() {
  const btnLogin = document.querySelector(".btnLogin");

  btnLogin.addEventListener("click", () => {
    window.location.replace(`pages/login.html`);
  });
}
buttonLogin();

function buttonCadastro() {
  const btnLogin = document.querySelector(".btnCadastro");

  btnLogin.addEventListener("click", () => {
    window.location.replace(`pages/register.html`);
  });
}
buttonCadastro();

let arrEmpresas = await getEmpresas();

async function renderEmpresas(arr) {

  const div = document.querySelector(".divEmpresas");

  arr.forEach((element) => {
    let card = document.createElement("div");
    card.classList.add("card");

    let divInfoEmpresa = document.createElement("div");
    divInfoEmpresa.classList.add("divInfoEmpresa");

    let name = document.createElement("h2");
    name.innerText = element.name;

    let time = document.createElement("p");
    time.innerText = `${element.opening_hours} horas`;

    let sector = document.createElement("p");
    sector.innerText = element.sectors.description;
    sector.classList.add("sector");

    divInfoEmpresa.append(name, time, sector);

    card.append(divInfoEmpresa);

    div.append(card);
  });
}

renderEmpresas(arrEmpresas);

import { getEmpresas, getSectors } from "./requests.js";

async function filterEmpresas() {

  let select = document.querySelector("#selectEmpresa");

  let arrSetores = await getSectors();

  let arrEmpresas = await getEmpresas();



  arrSetores.forEach((element) => {
    let setores = document.createElement("option");
    setores.innerText = element.description;
    setores.value = element.uuid

    select.append(setores);
  });
   

  select.addEventListener("change",(event)=>{

    divEmpresas.innerHTML = ""

   let empresasFiltradas = arrEmpresas.filter((element) => element.sectors.uuid === event.target.value );

   
   renderEmpresas(empresasFiltradas)
  })
  

  let divEmpresas = document.querySelector(".divEmpresas");


}

filterEmpresas();
