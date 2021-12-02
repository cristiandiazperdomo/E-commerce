//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const arr = []

alert("El login con google no funcioná de la mejor manera, al cerrar sesión, cierra la cuenta de todos los servicíos de Google(No probar).")

/*DO not*/
const loginNormal = () => {
  const txtName = document.getElementById("txtuser");
  const txtPassword = document.getElementById("txtpassword");
  const name = txtName.value;
  const password = txtPassword.value;

  if (name && password) {
    arr.push({
      name,
      password,

    })
    let getData = JSON.stringify(arr);
    localStorage.setItem("DATA", getData);
    alert("INICIO DE SESIÓN, REALIZADO CORRECTAMENTE ✔️.");
    window.location.replace("index.html");
  } else {
    alert("Nombre y contraseña no deben ser vacíos");
  }
};

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  let profile = googleUser.getBasicProfile();
  /*console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

        

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);*/


  //Do stuff here after the user has been signed out, you can still authenticate the token with Google on the server side

  if (profile.getName() && profile.getGivenName()) {
    localStorage.setItem('userDataGoogle', JSON.stringify(profile));
    alert("INICIO DE SESIÓN, REALIZADO CORRECTAMENTE ✔️.");
    window.location.replace("index.html");
  } else {
    alert("Algo salio mal, vuelva a intentarlo mas tarde. :(")
  }

}



/*document.addEventListener("DOMContentLoaded", function(e){
window.location.href = 'index.html';
console.log(JSON.parse(localStorage.getItem("DATA")))
});*/