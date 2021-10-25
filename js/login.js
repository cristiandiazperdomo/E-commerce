//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const arr =[]

/*DO not*/
const login = () => {
  const txtName = document.getElementById("txtuser");
  const txtPassword = document.getElementById("txtpassword");
  const name = txtName.value;
  const password = txtPassword.value;

  if (name && password) {
    arr.push({
      name, password,

    })
    
    let getData = JSON.stringify(arr);
    localStorage.setItem("DATA", getData);
    
    alert("INICIO DE SESIÓN, REALIZADO CORRECTAMENTE ✔️.");
    window.location.replace("index.html");    
  } 
  else {
    alert("Nombre y contraseña no deben ser vacíos");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("entrar").addEventListener("click", login);
 
});
















/*document.addEventListener("DOMContentLoaded", function(e){
window.location.href = 'index.html';
console.log(JSON.parse(localStorage.getItem("DATA")))
});*/