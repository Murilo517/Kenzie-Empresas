

const toast = (title,message) => {

  const body = document.querySelector("body")
  
  const container = document.createElement("div")
  container.classList.add("toast")
  

  const textContainer = document.createElement("div")
  
  const h2 = document.createElement("h2")
  h2.innerText = title
  
  const span = document.createElement("span")
  span.innerText = message
  
  
  textContainer.append(h2,span)
  
  container.append(textContainer)
  
  body.append(container)
  
  
  }
  
  
  
  
export{toast}

