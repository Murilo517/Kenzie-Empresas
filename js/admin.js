import {
  takeDepartment,
  listAllUsers,
  requestUpdateUserAdmin,
  requestCreateNewDepart,
  RequestEditDepartment,
  deleteUser,
  getEmpresas,
  contratarUsuario,
  demitirUsuario,
  deleteDepartment,
  userOutOfWork,
  takeAllDepartments,
  validUser,
} from "./requests.js";

import { getLocalStorage } from "./localstorage.js";

function buttonLogout() {
  const btnLogout = document.querySelector(".btnLogout");

  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.replace(`/index.html`);
  });
}
buttonLogout();

const permit = async () => {
  const user = getLocalStorage();

  let valid = validUser(user)
  console.log(valid);

  if (user == "" ) {
    window.location.replace(`/index.html`);
  }
};

permit();

async function listarEmpresasSelect() {
  let select = document.querySelector("#selectEmpresas");

  let empresas = await getEmpresas();

  empresas.forEach((element) => {
    let option = document.createElement("option");

    option.innerText = element.name;
    option.value = element.uuid;

    select.append(option);
  });

  select.addEventListener("change", (event) => {

    renderDepartments(event.target.value);

  });
}
listarEmpresasSelect();

async function renderDepartments(id) {
  let arrDep = await takeDepartment(id);

  const section = document.querySelector(".departments");

  arrDep.forEach((element) => {

     section.innerHTML = ""

    let cardDep = document.createElement("div");
    cardDep.classList.add("cardDep");

    let divInfoDep = document.createElement("div");
    divInfoDep.classList.add("divInfoUser");

    let name = document.createElement("h2");
    name.innerText = element.name;

    let description = document.createElement("p");
    description.innerText = element.description;

    let company = document.createElement("p");
    company.innerText = element.companies.name;

    let divBtns = document.createElement("div");
    divBtns.classList.add("divBtns");
    let btnView = document.createElement("button");
    btnView.classList.add("btnView");
    btnView.id = element.uuid;

    btnView.addEventListener("click", (event) => {
      viewDepartment(event.target.id, id);
    });

    let btnEdit = document.createElement("button");
    btnEdit.classList.add("btnEditUser");
    btnEdit.id = element.uuid;

    btnEdit.addEventListener("click", (event) => {
      editDepartmentModal(event.target.id, element.description);
    });

    let btnDelete = document.createElement("button");
    btnDelete.classList.add("btnDeleteUser");
    btnDelete.id = element.uuid;

    btnDelete.addEventListener("click", (event) => {
      modalConfirmDeleteDepartment(event.target.id, element.name);
    });

    divInfoDep.append(name, description, company);
    divBtns.append(btnView, btnEdit, btnDelete);

    cardDep.append(divInfoDep, divBtns);

    section.append(cardDep);
  });
}


async function renderAllUsers() {
  let arrUsers = await listAllUsers();

  const section = document.querySelector(".allUsers");

  arrUsers.forEach((element) => {
    if (element.username !== "ADMIN") {
      let cardUser = document.createElement("div");
      cardUser.classList.add("cardUser");

      let divInfoUser = document.createElement("div");
      divInfoUser.classList.add("divInfoUser");

      let name = document.createElement("h2");
      name.innerText = element.username;

      let level = document.createElement("p");
      level.innerText = element.professional_level;

      let kind = document.createElement("p");
      kind.innerText = element.kind_of_work;

      let divBtnsUser = document.createElement("div");
      divBtnsUser.classList.add("div");

      let btnEditUser = document.createElement("button");
      btnEditUser.classList.add("btnEditUser");
      btnEditUser.id = element.uuid;

      btnEditUser.addEventListener("click", async (event) => {
        updateUserAdmin(event.target.id);
      });

      let btnDeleteUser = document.createElement("button");
      btnDeleteUser.classList.add("btnDeleteUser");
      btnDeleteUser.id = element.uuid;

      btnDeleteUser.addEventListener("click", (event) => {
        modalConfirmDelete(event.target.id, element.username);
      });

      divInfoUser.append(name, level, kind);

      divBtnsUser.append(btnEditUser, btnDeleteUser);

      cardUser.append(divInfoUser, divBtnsUser);

      section.append(cardUser);
    }
  });
}
renderAllUsers()


function updateUserAdmin(id) {
  const main = document.querySelector("main");

  const backgroundContainer = document.createElement("section");
  backgroundContainer.id = "modal";
  backgroundContainer.classList.add("modal");

  const container = document.createElement("section");
  container.classList.add("modalBody");

  backgroundContainer.addEventListener("click", (event) => {
    const { className } = event.target;
    if (className === "modal") {
      backgroundContainer.remove();
    }
  });

  const btnX = document.createElement("button");
  btnX.innerText = "x";
  btnX.classList.add("xEdit");

  btnX.addEventListener("click", () => {
    backgroundContainer.remove();
  });

  const h2 = document.createElement("h2");
  h2.innerText = "Editar Usuário";

  const inputKind = document.createElement("input");
  inputKind.type = "text";
  inputKind.placeholder =
    "Selecionar Modalidade de trabalho (home office, presencial, híbrido)";
  inputKind.id = "kind_of_work";
  inputKind.classList.add("inputUpdateUserAdmin");

  const inputProfessional = document.createElement("input");
  inputProfessional.type = "text";
  inputProfessional.placeholder =
    "Selecionar nivel profissional  (estágio, júnior, pleno, sênior)";
  inputProfessional.id = "professional_level";
  inputProfessional.classList.add("inputUpdateUserAdmin");

  const btnSubmit = document.createElement("button");
  btnSubmit.innerText = "Editar";
  btnSubmit.classList.add("btnEditUserAdmin");

  let form = document.createElement("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let dadosInput = [...form.elements];

    const body = {};

    dadosInput.forEach((element) => {
      if (element.tagName == "INPUT" && element.value !== "") {
        body[element.id] = element.value;
      }
    });

    await requestUpdateUserAdmin(body, id).then(() => {
      backgroundContainer.remove();
      window.location.replace(`./admin.html`);
    });
  });

  form.append(inputKind, inputProfessional, btnSubmit);

  container.append(btnX, h2, form);

  backgroundContainer.appendChild(container);

  main.append(backgroundContainer);
}

//
let btnCreaterNewDepart = document.querySelector(".btnCriar");

btnCreaterNewDepart.addEventListener("click", () => {
  createNewDepartModal();
});

//

async function viewDepartment(id, idEmpresa) {
  let arrDep = await takeDepartment(idEmpresa);

  let depart = arrDep.find((element) => element.uuid === id);

  const main = document.querySelector("main");

  const backgroundContainer = document.createElement("section");
  backgroundContainer.id = "modalDepart";
  backgroundContainer.classList.add("modalDepart");

  const container = document.createElement("section");
  container.classList.add("modalBodyDepart");

  backgroundContainer.addEventListener("click", (event) => {
    const { className } = event.target;
    if (className === "modalDepart") {
      backgroundContainer.remove();
    }
  });

  const btnX = document.createElement("button");
  btnX.innerText = "x";
  btnX.classList.add("xEdit");

  btnX.addEventListener("click", () => {
    backgroundContainer.remove();
  });

  const h2 = document.createElement("h2");
  h2.innerText = depart.name;

  const divTopDepart = document.createElement("div");
  divTopDepart.classList.add("divTopDepart");

  const h3 = document.createElement("h3");
  h3.innerText = depart.description;

  const divNameDescription = document.createElement("h3");
  divNameDescription.classList.add("divNameDescription");

  const p = document.createElement("p");
  p.innerText = depart.companies.name;

  const divSelect = document.createElement("div");
  divSelect.classList.add("divSelect");

  const form = document.createElement("form");
  form.classList.add("formContratar");

  const select = document.createElement("select");
  select.classList.add("selectCreate");

  let arrUsers = await userOutOfWork();

  arrUsers.forEach((element) => {
    let option = document.createElement("option");

    if (element.username !== "ADMIN") {
      option.innerText = element.username;
      option.value = element.uuid;

      select.append(option);
    }
  });

  const btnContratar = document.createElement("button");
  btnContratar.innerText = "Contratar";
  btnContratar.classList.add("btnContratar");

  btnContratar.addEventListener("click", async (event) => {
    event.preventDefault();

    console.log(select.value);

    const body = {
      user_uuid: select.value,
      department_uuid: id,
    };

    await contratarUsuario(body);
    window.location.replace(`./admin.html`);
  });


  const divBotDepart = await createCardDepart(depart.uuid);

  form.append(select, btnContratar);

  divSelect.append(form);

  divNameDescription.append(h3, p);

  divTopDepart.append(divNameDescription, divSelect);

  container.append(btnX, h2, divTopDepart, divBotDepart);

  backgroundContainer.appendChild(container);

  main.append(backgroundContainer);
}

async function createCardDepart(id) {

  const divBotDepart = document.createElement("div");
  divBotDepart.classList.add("divBotDepart");
  
  let arrUsers = await listAllUsers();

  arrUsers.forEach((element) => {
    if (element.username !== "ADMIN" && element.department_uuid == id) {
      let divCard = document.createElement("div");
      divCard.classList.add("divCard");

      let name = document.createElement("h2");
      name.innerText = element.username;

      let professional = document.createElement("p");
      professional.innerText = element.professional_level;

      let btnDelete = document.createElement("button");
      btnDelete.innerText = "Desligar";
      btnDelete.classList.add("desligar");

      btnDelete.addEventListener("click", async () => {
        await demitirUsuario(element.uuid);
        window.location.replace(`./admin.html`);
      });

      divCard.append(name, professional, btnDelete);

      divBotDepart.appendChild(divCard);
    }
  });
  return divBotDepart;
}

async function createNewDepartModal() {
  const main = document.querySelector("main");

  const backgroundContainer = document.createElement("section");
  backgroundContainer.id = "modalNewDepart";
  backgroundContainer.classList.add("modalNewDepart");

  const container = document.createElement("section");
  container.classList.add("modalBodyNewDepart");

  backgroundContainer.addEventListener("click", (event) => {
    const { className } = event.target;
    if (className === "modalNewDepart") {
      backgroundContainer.remove();
    }
  });

  const btnX = document.createElement("button");
  btnX.innerText = "x";
  btnX.classList.add("xEdit");

  btnX.addEventListener("click", () => {
    backgroundContainer.remove();
  });

  const formulario = document.createElement("form");
  formulario.classList.add("modalForm");

  const h2 = document.createElement("h2");
  h2.innerText = "Criar Departamento";

  const inputName = document.createElement("input");
  inputName.type = "text";
  inputName.placeholder = "Nome do Departamento";
  inputName.id = "name";
  inputName.classList.add("inputNewDepart");

  const inputDescription = document.createElement("input");
  inputDescription.type = "text";
  inputDescription.placeholder = "Descrição";
  inputDescription.id = "description";
  inputDescription.classList.add("inputNewDepart");

  const select = document.createElement("select");
  select.classList.add("selectCreateNewDepart");

  let empresas = await getEmpresas();

  empresas.forEach((element) => {
    let option = document.createElement("option");

    option.innerText = element.name;

    option.value = element.uuid;

    select.append(option);
  });

  const btnSubmit = document.createElement("button");
  btnSubmit.innerText = "Criar o Departamento";
  btnSubmit.classList.add("btnCreateNewDepart");

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const inputs = [...event.target];
    console.log(inputs);

    const newDepartment = {};

    newDepartment.name = inputs[0].value;
    newDepartment.description = inputs[1].value;
    newDepartment.company_uuid = select.value;

    await requestCreateNewDepart(newDepartment);
    window.location.replace(`./admin.html`);
    backgroundContainer.remove();
  });

  formulario.append(h2, inputName, inputDescription, select, btnSubmit);

  container.append(btnX, formulario);

  backgroundContainer.appendChild(container);

  main.append(backgroundContainer);

  return formulario;
}

function editDepartmentModal(id, description) {
  const main = document.querySelector("main");

  const backgroundContainer = document.createElement("section");
  backgroundContainer.id = "modalEditDepart";
  backgroundContainer.classList.add("modalEditDepart");

  const container = document.createElement("section");
  container.classList.add("modalBodyEditDepart");

  backgroundContainer.addEventListener("click", (event) => {
    const { className } = event.target;
    if (className === "modalEditDepart") {
      backgroundContainer.remove();
    }
  });

  const btnX = document.createElement("button");
  btnX.innerText = "x";
  btnX.classList.add("xEdit");

  btnX.addEventListener("click", () => {
    backgroundContainer.remove();
  });

  const formulario = document.createElement("form");

  const h2 = document.createElement("h2");
  h2.innerText = "Editar Departamento";
  h2.classList.add("h2EditDescription");

  const inputEdit = document.createElement("textarea");
  inputEdit.placeholder = "Descrição do Departamento";
  inputEdit.id = "description";
  inputEdit.classList.add("inputEditDescription");
  inputEdit.value = description;

  const btnSubmit = document.createElement("button");
  btnSubmit.innerText = "Salvar Alterações";
  btnSubmit.classList.add("submitDescription");
  btnSubmit.type = "submit";

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newDescription = { description: inputEdit.value };

    await RequestEditDepartment(newDescription, id);
    window.location.replace(`./admin.html`);
  });

  formulario.append(inputEdit, btnSubmit);

  container.append(btnX, h2, formulario);

  backgroundContainer.appendChild(container);

  main.append(backgroundContainer);

  return formulario;
}

function modalConfirmDelete(id, name) {
  const main = document.querySelector("main");

  const backgroundContainer = document.createElement("section");
  backgroundContainer.id = "modalConfirmDelete";
  backgroundContainer.classList.add("modalConfirmDelete");

  const container = document.createElement("section");
  container.classList.add("modalBodyConfirmDelete");

  backgroundContainer.addEventListener("click", (event) => {
    const { className } = event.target;
    if (className === "modalConfirmDelete") {
      backgroundContainer.remove();
    }
  });

  const btnX = document.createElement("button");
  btnX.innerText = "x";
  btnX.classList.add("xDelete");

  btnX.addEventListener("click", () => {
    backgroundContainer.remove();
  });

  const div = document.createElement("div");
  div.classList.add("divDelete");

  const p = document.createElement("p");
  p.innerText = `Realmente deseja remover o usuário ${name}?`;

  const BtnRemove = document.createElement("button");
  BtnRemove.innerText = "Deletar";
  BtnRemove.classList.add("btnRemove");

  BtnRemove.addEventListener("click", async (event) => {
    await deleteUser(id);

    backgroundContainer.remove();

    window.location.replace(`./admin.html`);
  });

  div.append(p, BtnRemove);
  container.append(btnX, div);
  backgroundContainer.append(container);
  main.append(backgroundContainer);
}

function modalConfirmDeleteDepartment(id, name) {
  const main = document.querySelector("main");

  const backgroundContainer = document.createElement("section");
  backgroundContainer.id = "modalConfirmDelete";
  backgroundContainer.classList.add("modalConfirmDelete");

  const container = document.createElement("section");
  container.classList.add("modalBodyConfirmDelete");

  backgroundContainer.addEventListener("click", (event) => {
    const { className } = event.target;
    if (className === "modalConfirmDelete") {
      backgroundContainer.remove();
    }
  });

  const btnX = document.createElement("button");
  btnX.innerText = "x";
  btnX.classList.add("xDelete");

  btnX.addEventListener("click", () => {
    backgroundContainer.remove();
  });

  const div = document.createElement("div");
  div.classList.add("divDelete");

  const p = document.createElement("p");
  p.innerText = `Realmente deseja deletar o departarmento ${name} e demitir todos seus funcionários?`;

  const BtnRemove = document.createElement("button");
  BtnRemove.innerText = "Confirmar";
  BtnRemove.classList.add("btnRemove");

  BtnRemove.addEventListener("click", async (event) => {
    await deleteDepartment(id);

    window.location.replace(`./admin.html`);
  });

  div.append(p, BtnRemove);
  container.append(btnX, div);
  backgroundContainer.append(container);
  main.append(backgroundContainer);
}


async function renderAllDepartments() {
  let arrDep = await takeAllDepartments();
  
  const section = document.querySelector(".departments");

  arrDep.forEach((element) => {


    let cardDep = document.createElement("div");
    cardDep.classList.add("cardDep");

    let divInfoDep = document.createElement("div");
    divInfoDep.classList.add("divInfoUser");

    let name = document.createElement("h2");
    name.innerText = element.name;

    let description = document.createElement("p");
    description.innerText = element.description;

    let company = document.createElement("p");
    company.innerText = element.companies.name;

    let divBtns = document.createElement("div");
    divBtns.classList.add("divBtns");
    let btnView = document.createElement("button");
    btnView.classList.add("btnView");
    btnView.id = element.uuid;

    btnView.addEventListener("click", (event) => {
      // viewDepartment(event.target.id, id);
    });

    let btnEdit = document.createElement("button");
    btnEdit.classList.add("btnEditUser");
    btnEdit.id = element.uuid;

    btnEdit.addEventListener("click", (event) => {
      editDepartmentModal(event.target.id, element.description);
    });

    let btnDelete = document.createElement("button");
    btnDelete.classList.add("btnDeleteUser");
    btnDelete.id = element.uuid;

    btnDelete.addEventListener("click", (event) => {
      modalConfirmDeleteDepartment(event.target.id, element.name);
    });

    divInfoDep.append(name, description, company);
    divBtns.append(btnView, btnEdit, btnDelete);

    cardDep.append(divInfoDep, divBtns);

    section.append(cardDep);
  });
}
renderAllDepartments()