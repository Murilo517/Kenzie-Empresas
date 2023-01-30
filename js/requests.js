
const myHeaders = {
    "Content-Type": "application/json",
  };
  


async function login(body) {
    try {
      const request = await fetch(`http://localhost:6278/auth/login`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });
  
      if (request.ok == true) {

        const response = await request.json();
        toast("Logado","Login efeituado com sucesso!")
  
        localStorage.setItem("user", JSON.stringify(response));


        if(await validUser()){

          setTimeout(() => {
            
            window.location.replace(`../pages/admin.html`); 
          }, 2000);

     
          
        }else{
          setTimeout(() => {
            
            window.location.replace(`../pages/user.html`); 
          }, 2000);


        }
      } else {
        erro.classList.remove("hidden")
        
        toast("Erro!", "Algo deu errado"); 
        setTimeout(() => {
          erro.classList.add("hidden")
        }, 2000);
      }
    } catch (err) {
      erro.classList.remove("hidden")
        
      setTimeout(() => {
        toast("Erro!", "Algo deu errado");
        erro.classList.add("hidden")
      }, 2000);
    }
  }
  
let erro = document.querySelector(".spanErro")
  
  async function register(body) {
    try {
      const request = await fetch(`http://localhost:6278/auth/register`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });
  
      if (request.ok) {
        toast("Sucesso","Perfil Foi criado!")

        setTimeout(() => {
          window.location.replace(`../pages/login.html`);    
        }, 2000);


      } else {
        erro.classList.remove("hidden")
        
        toast("Erro!","Confira suas informações!")
        setTimeout(() => {
          erro.classList.add("hidden")
        }, 2000);
      }
    } catch (err) {
      erro.classList.remove("hidden")
        
      toast("Erro!","Confira suas informações!")
      setTimeout(() => {
        erro.classList.add("hidden")
      }, 2000);
    }
  }





  async function validUser() {
    
    const local = getLocalStorage();
  
    try {
      const request = await fetch("http://localhost:6278/auth/validate_user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`,
        },
      })
          
      const response = await request.json();

      return response.is_admin
    } catch (err) {
      console.log(err);
    }
  }



  import { getLocalStorage } from "./localstorage.js";
import { toast} from "./toast.js";


  async function takeInfoUser() {
    
    const local = getLocalStorage();
  
    try {
      const request = await fetch("http://localhost:6278/users/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`,
        },
      })
          
      const response = await request.json();

      return response
    } catch (err) {
      console.log(err);
    }
  }


  async function userDepartment() {
    
    const local = getLocalStorage();
  
    try {
      const request = await fetch("http://localhost:6278/users/departments/coworkers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`,
        },
      })
          
      const response = await request.json();

      return response
    } catch (err) {
      console.log(err);
    }
  }







  async function takeDepartment(id) {
    
    const local = getLocalStorage();
  
    try {
      const request = await fetch(`http://localhost:6278/departments/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`,
        },
      })
          
      const response = await request.json();

      return response
    } catch (err) {
      console.log(err);
    }
  }


  
  async function takeAllDepartments(id) {
    
    const local = getLocalStorage();
  
    try {
      const request = await fetch(`http://localhost:6278/departments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`,
        },
      })
          
      const response = await request.json();

      return response
    } catch (err) {
      console.log(err);
    }
  }





  async function listAllUsers() {
    
    const local = getLocalStorage();
  
    try {
      const request = await fetch("http://localhost:6278/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`,
        },
      })
          
      const response = await request.json();

      return response
    } catch (err) {
      console.log(err);
    }
  }



  async function getEmpresas() {
    
    try {
      const request = await fetch("http://localhost:6278/companies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
          
      const response = await request.json();

      return response
    } catch (err) {
      console.log(err);
    }
  }

  
  async function getSectors() {
    
    try {
      const request = await fetch("http://localhost:6278/sectors", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
          
      const response = await request.json();

      return response
    } catch (err) {
      console.log(err);
    }
  }




  const updateUser = async (body) => {
    const local = getLocalStorage();
  
    try {
      const request = await fetch(`http://localhost:6278/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`
        },
        body: JSON.stringify(body)
      });
      
  
      const response = await request.json();
      return response;
    } catch (err) {
      console.log(err)
    }
  };



  const requestUpdateUserAdmin = async (body, id) => {
    const local = getLocalStorage();
  
    try {
      const request = await fetch(`http://localhost:6278/admin/update_user/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`
        },
        body: JSON.stringify(body)
      });
      
  
      const response = await request.json();
      return response;
    } catch (err) {
      console.log(err)
    }
  };


  

  const contratarUsuario = async (body) => {
    const local = getLocalStorage();
  
    try {
      const request = await fetch(`http://localhost:6278/departments/hire/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`
        },
        body: JSON.stringify(body)
      });
      
  
      const response = await request.json();
      return response;
    } catch (err) {
      console.log(err)
    }
  };

  
  const demitirUsuario = async ( id) => {
    const local = getLocalStorage();
  
    try {
      const request = await fetch(`http://localhost:6278/departments/dismiss/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`
        }
      });
      
  
      const response = await request.json();
      return response;
    } catch (err) {
      console.log(err)
    }
  };



  const requestCreateNewDepart = async (body) =>{

    const local = getLocalStorage();
  
    try {
      const request = await fetch(`http://localhost:6278/departments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`
        },
        body: JSON.stringify(body)
      });
      
  
      const response = await request.json();
      return response;
    } catch (err) {
      console.log(err)
    }
  };


  
  const RequestEditDepartment = async (body, id) =>{

    const local = getLocalStorage();
  
    try {
      const request = await fetch(`http://localhost:6278/departments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`
        },
        body: JSON.stringify(body)
      });
      
  
      const response = await request.json();
      console.log(response);
      return response;
    } catch (err) {
      console.log(err)
    }
  };



  const deleteUser = async(id) =>{


    const local = getLocalStorage();
  
    try {
      const request = await fetch(`http://localhost:6278/admin/delete_user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`
        }
      });
      
  
      const response = await request.json();
      return response;
    } catch (err) {
      console.log(err)
    }
    
  }

  const deleteDepartment = async(id) =>{


    const local = getLocalStorage();
  
    try {
      const request = await fetch(`http://localhost:6278/departments/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`
        }
      });
      
  
      const response = await request.json();
      console.log(response);
      return response;
    } catch (err) {
      console.log(err)
    }
    
  }


  
  async function userOutOfWork() {
    
    const local = getLocalStorage();
    
    try {
      const request = await fetch("http://localhost:6278/admin/out_of_work", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${local.token}`
        },
      })
          
      const response = await request.json();

      return response
    } catch (err) {
      console.log(err);
    }
  }







  export {login,register,validUser,takeInfoUser,takeDepartment,listAllUsers,getEmpresas,getSectors,updateUser,requestUpdateUserAdmin, requestCreateNewDepart,RequestEditDepartment,  userDepartment, deleteUser,contratarUsuario, demitirUsuario, deleteDepartment, userOutOfWork,takeAllDepartments}
