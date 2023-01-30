function buttonHome (){

    const btnHome  = document.querySelector(".btnHome")
  
    btnHome.addEventListener("click", ()=>{


        window.location.replace(`/index.html`);

    })


}
buttonHome()


function buttonReturn(){


  const btnReturn  = document.querySelector(".btnReturn")
  
  btnReturn.addEventListener("click", ()=>{


      window.location.replace(`/index.html`);

  })



}
buttonReturn()


function buttonLogin (){

    const btnLogin  = document.querySelector(".btnLogin")
  
    btnLogin.addEventListener("click", ()=>{


        window.location.replace(`../pages/login.html`);

    })


}
buttonLogin()


const inputsRegister = () => {

    let form = document.querySelector("form");
  
    let dadosInput = [...form.elements];

    let select = document.querySelector("select")
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const body = {};
  
      dadosInput.forEach((element) => {
        if (element.tagName == "INPUT" && element.value !== "") {
          body[element.id] = element.value;
          body.professional_level = select.value;
        }
      });


      await register(body);
    });
  };
  
  inputsRegister();


  import { login, register } from "./requests.js";