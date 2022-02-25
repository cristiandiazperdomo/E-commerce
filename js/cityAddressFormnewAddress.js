const URL_GET = "http://localhost:3000/tobuy"
const URL_SHIPPING = "http://localhost:3000/shipping"

let elementsOnArray = [];
let shippingArray = [];

const getProductsToBuy = async () => {
    const buyCart = await (await fetch(URL_GET)).json();

    elementsOnArray.push(buyCart[buyCart.length - 1])

    showProductInfo(elementsOnArray[0])
};

const getTypeShipping = async () => {
    const typeShipping = await (await fetch(URL_SHIPPING)).json();

    if (typeShipping.status = "ok") {
        shippingArray.push(typeShipping[typeShipping.length - 1])
    }
}

const showProductInfo = (array) => {

    let productInfoHTML = document.querySelector('.products-info')

    for (let i = 0; i < array.articles.length; i++) {
        productInfoHTML.innerHTML += `
		<div class="list-group pb-3">
            <a class="list-group-item list-group-item-action" style="border: 0;" target="_blank">
                <div class="row d-flex justify-content-center">
                    <div class="pr-0">  
                        <img  src="` + array.articles[i].src + `" alt="` + array.articles[i].name + `" class="img-thumbnail" style="width: 100px; height: 90px;">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + array.articles[i].name + `</h4>
                        </div>
            		<small class="text-muted">` + array.articles[i].count + ` artículos</small>
                </div>
            </div>
            </a>
        </div>`
    }
}

const showPriceInfo = (array, shippingtype) => {

    let productInfoHTML = document.querySelector('.price-section')

    let total = 0;

    let convertToDollars = [];

    for (let arr of array.articles) { //convert to dollars
        if (arr.currency === "UYU") {
            convertToDollars.push((arr.unitCost / 40) * arr.count);
        } else {
            convertToDollars.push(arr.unitCost * arr.count);
        }
    }
    for (let i = 0; i < convertToDollars.length; i++) { //plus shipping

        total += convertToDollars[i] + (convertToDollars[i] * (shippingtype / 100));

    }
    productInfoHTML.innerHTML += `<p>${total} USD</p>`

}

const validateInformation = () => {
    let alertThereAreAllData = document.getElementById('alert-thereAreAllData') 

    const inputAddress = document.getElementById('country').value;
    const inputCountry = document.getElementById('inputAddress').value;
    const inputAddress2 = document.getElementById('inputAddress2').value;
    const inputCity = document.getElementById('inputCity').value;
    const inputZip = document.getElementById('inputAdittionalData').value;

    if (inputAddress, inputCountry, inputAddress2, inputCity, inputZip) {
       window.location.href = "paymentsMethodsNewMethods.html";
    } else {
        document.getElementById('alert-thereAreAllData').style.display = 'flex';
        setTimeout(() => {
            document.getElementById('alert-thereAreAllData').style.display = 'none';
        },5000)
    }
}

const addEventsListeners = () => {
    document.getElementById('button_validateInfo').addEventListener('click', () => {
        validateInformation();
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    await getTypeShipping();
    await getProductsToBuy();

    showPriceInfo(elementsOnArray[0], shippingArray[0])

    addEventsListeners()
})