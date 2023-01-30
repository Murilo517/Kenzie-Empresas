export const getLocalStorage = () =>{

    let user = JSON.parse(localStorage.getItem("user")) || ""
    
    return user
    
    }

