const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";



//------------------------
        //BOTONES y TABLA

    const botonBuscar  = document.querySelector('.btnes')
    const formulario  = document.querySelector('.form')
    const resultado  = document.querySelector('.resultado')
    const btnDelete = document.querySelector('.btnDelete')

//-----------------------

    const  filtrar = async() => {

        resultado.innerHTML = '';

        const texto = formulario.value.toLowerCase();

        let currentCategories = await getJSONData(PRODUCTS_URL)

        if (currentCategories.status === "ok") {

            let currentCategoriesArrays = currentCategories.data

            for(let producto of currentCategoriesArrays){

            let name = producto.name.toLowerCase();

            if (name.indexOf(texto) !== -1) {
                resultado.innerHTML += `
                <td class="d-md-block m-2"> ${producto.name} - ${producto.cost}  ${producto.currency} ${producto.description}</td>`
            }

        }
            if (resultado.innerHTML === '') {
                resultado.innerHTML += `
                <td class="m-2">Pruducto no encontrado...</td>
                `
            }  

        }
        
}
const borrar = () =>
{
    resultado.innerHTML = ''; 
}

//--------

        //LOGEADO


let bLogin = JSON.parse(localStorage.getItem('DATA'));
if (bLogin) {
    console.log("INGRESO CORRECTO")
}
else{
    window.location.replace("login.html");
}
//-------

        //NOMBRE DE USUARIO
let showUserName = JSON.parse(localStorage.getItem('DATA'));

    let htmlContentToAppendUser = "";
        htmlContentToAppendUser += `
        
            <a class="py-2 d-none d-md-inline-block" href="#"> `+ showUserName[0].name +`</a>
        
        `
        
        document.querySelector(".userSpace").innerHTML = htmlContentToAppendUser;

//-------
var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//-------
    //DELETE INFO
const DEL_DATA = document.getElementById('deleteInfo')

function cerrarSesion() {
        localStorage.removeItem('DATA');
        window.location.replace("index.html");
}
        //-------

                    //EVENTS BUTTONS
DEL_DATA.addEventListener('click', cerrarSesion)



//----------
    //eventos de BUSCAR


    botonBuscar.addEventListener('click', filtrar)

    formulario.addEventListener('keyup', filtrar)

    //evento BORRAR LISTA

    btnDelete.addEventListener('click', borrar)

//------------
