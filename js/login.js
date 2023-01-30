function buttonHome() {
  const btnLogin = document.querySelector(".btnHome");

  btnLogin.addEventListener("click", () => {
    window.location.replace(`/index.html`);
  });
}
buttonHome();

function buttonCadastro() {
  const btnLogin = document.querySelector(".btnCadastro");

  btnLogin.addEventListener("click", () => {
    window.location.replace(`./register.html`);
  });
}
buttonCadastro();


function buttonCadastro2() {
  const btnLogin = document.querySelector(".btnCadastro2");

  btnLogin.addEventListener("click", () => {
    window.location.replace(`./register.html`);
  });
}
buttonCadastro2();




const inputsLogin = () => {
  let form = document.querySelector("form");

  let dadosInput = [...form.elements];


  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const body = {};

    dadosInput.forEach((element) => {
      if (element.tagName == "INPUT" && element.value !== "") {
        body[element.id] = element.value;
      }
    });

    await login(body);
  });
};

inputsLogin();


import { login , validUser} from "./requests.js";

