import { takeInfoUser, updateUser } from "./requests.js";
import { baseModal } from "./modal.js";
import { getLocalStorage } from "./localstorage.js";
import { userDepartment,validUser } from "./requests.js";

function buttonLogout() {
  const btnLogin = document.querySelector(".btnLogout");

  btnLogin.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.replace(`/index.html`);
  });
}
buttonLogout();

const permit = () => {
  const user = getLocalStorage();

  if (user == "") {
    window.location.replace(`/index.html`);
  }
};

permit();

async function renderInfoUser() {
  const obj = await takeInfoUser();

  let div = document.querySelector(".divPerfil");

  let user = document.createElement("h2");

  let divInfo = document.createElement("div");
  divInfo.classList.add("divInfo");

  let email = document.createElement("p");

  let nivel = document.createElement("p");

  let type = document.createElement("p");

  let btnEdit = document.createElement("button");
  btnEdit.classList.add("btnEdit");

  btnEdit.addEventListener("click", async () => {
    baseModal(updateUserModal());
  });

  let divTop = document.createElement("div");
  divTop.classList.add("divTop");

  divTop.append(user, btnEdit);

  user.innerText = obj.username;
  email.innerText = obj.email;
  nivel.innerText = obj.professional_level;
  type.innerText = obj.kind_of_work;

  divInfo.append(email, nivel, type);

  div.append(divTop, divInfo);
}

renderInfoUser();

const updateUserModal = (obj) => {
  const formulario = document.createElement("form");
  formulario.classList.add("modalForm");

  const h2 = document.createElement("h2");
  h2.innerText = "Editar Perfil";

  const inputName = document.createElement("input");
  inputName.type = "text";
  inputName.placeholder = "Seu Nome";
  inputName.id = "username";
  inputName.classList.add("inputUser");

  const inputEmail = document.createElement("input");
  inputEmail.type = "email";
  inputEmail.placeholder = "Seu Email";
  inputEmail.id = "email";
  inputEmail.classList.add("inputUser");

  const inputPassword = document.createElement("input");
  inputPassword.type = "password";
  inputPassword.placeholder = "Sua senha";
  inputPassword.id = "password";
  inputPassword.classList.add("inputUser");

  const btnSubmit = document.createElement("button");
  btnSubmit.innerText = "Editar Perfil";
  btnSubmit.classList.add("btnUpdate");

  formulario.addEventListener("submit", async (event) => {
    const modal = document.querySelector("#modal");

    event.preventDefault();

    const inputs = [...event.target];

    const postUpdate = {};

    inputs.forEach((element) => {
      if (element.value !== "") {
        postUpdate[element.id] = element.value;
      }
    });

    await updateUser(postUpdate);
    modal.remove();
    window.location.replace(`./user.html`);
  });
  formulario.append(h2, inputName, inputEmail, inputPassword, btnSubmit);
  return formulario;
};

async function usersDep() {
  let div = document.querySelector(".divBot");

  let usuarioLogado = await userDepartment();


  if (usuarioLogado[0] !== undefined) {
    div.innerHTML = "";

    let aba = document.createElement("div");
    aba.classList.add("divCompany");

    let company = document.createElement("p");
    company.innerText = usuarioLogado[0].name;
    company.classList.add("nameCompany");

    let department = document.createElement("p");
    department.innerText = usuarioLogado[0].description;
    department.classList.add("descriptionDepart");

    let containerCompany = document.createElement("div");
    containerCompany.classList.add("containerCompany")

    aba.append(company, department);

    div.append(aba,containerCompany);

    usuarioLogado[0].users.forEach((element) => {
      let cardUser = document.createElement("div");
      cardUser.classList.add("cardUser");

      let name = document.createElement("h2");
      name.innerText = element.username;

      let level = document.createElement("p");
      level.innerText = element.professional_level;

      cardUser.append(name, level);
  
      containerCompany.append(cardUser);
    });
  }
}

usersDep();
