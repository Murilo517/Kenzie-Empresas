



const baseModal = (children) => {

    const main = document.querySelector("main");
  
    const backgroundContainer = document.createElement("section");
    backgroundContainer.id = "modal"; 
    backgroundContainer.classList.add("modal");

    const btnX = document.createElement("button");
    btnX.innerText = "x";
    btnX.classList.add("xBase")
  
    
    btnX.addEventListener("click", () => {
      backgroundContainer.remove();
    });
  
  
    const container = document.createElement("section"); 
    container.classList.add("modalBody");
  
    backgroundContainer.addEventListener("click", (event) => {
      const { className } = event.target;
      if (className === "modal") {
        backgroundContainer.remove();
      }
    });

    container.append(btnX,children);
    backgroundContainer.appendChild(container);
  
    main.appendChild(backgroundContainer);
  };


  export{baseModal}


  