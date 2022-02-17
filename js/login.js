const arr = []

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

