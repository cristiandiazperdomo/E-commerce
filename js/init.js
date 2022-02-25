"use strict";

const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

const searchForm = document.querySelector('.form')
const results = document.querySelector('.resultado')

const filterProducts = async () => {

    results.innerHTML = "";

    const texto = searchForm.value.toLowerCase();

    let currentCategories = await getJSONDataUnCharge(PRODUCTS_URL);

    if (currentCategories.status === "ok") {

        let currentCategoriesArrays = currentCategories.data;

        for (let producto of currentCategoriesArrays) {

            let name = producto.name.toLowerCase();

            if (name.indexOf(texto) !== -1) {
                results.innerHTML += `
                <td class="d-md-block m-2"> ${producto.name} - ${producto.cost}  ${producto.currency} ${producto.description}</td>`
            }

        }
        if (results.innerHTML === '') {
            results.innerHTML += `
                <td class="m-2">Pruducto no encontrado...</td>
                `
        }

    }

}

let isLogged = JSON.parse(localStorage.getItem('DATA'));

const userCanNavegate = () => isLogged ? console.log("INGRESO CORRECTO") : window.location.replace("login.html");

const showNameinTopNavigationBar = () => {

    let htmlContentToAppendUser = document.querySelector(".userName")

    htmlContentToAppendUser.innerHTML += ` <a class="py-2 d-none d-md-inline-block" href="#"> ` + isLogged[0].name + `</a>`

}

var showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
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


let getJSONDataUnCharge = function(url) { //SPINNERLESS TO EVENT KEYUP
    var result = {};

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;

            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;

            return result;
        });

}

const logOut = () => {
    localStorage.removeItem('DATA');
    window.location.replace("index.html");
}

const addEventsListeners = () => {

    //FORM EVENTS
    searchForm.addEventListener('keyup', filterProducts);
    document.querySelector('.btnes').addEventListener('click', filterProducts);
    document.querySelector('.btnDelete').addEventListener('click', () => {
        results.innerHTML = "";
    });

    //LOGOUT
    document.getElementById('deleteInfo').addEventListener('click', logOut)

}

document.addEventListener('DOMContentLoaded', async() => {
    //USER IS LOGGED
    userCanNavegate()
    //SHOW NAME IN TOP NAVIGATION BAR
    showNameinTopNavigationBar()
    //ADDEVENTLISTENER
    addEventsListeners()
})