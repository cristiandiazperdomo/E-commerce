//const URL_NEW_CART = "http://localhost:3000/cart"

const URL_NEW_CART = "https://japdevdep.github.io/ecommerce-api/cart/654.json"

let getCountArticlesToCheck = [];

let elementsOnArray = [];

const cartElements = async () => {

    const newCartJSON = await getJSONData(URL_NEW_CART);

    if (newCartJSON.status === "ok") {

        elementsOnArray.push(newCartJSON.data)

    }
};

cartElements()

const showCart = (array) => {

    if (array.articles.length !== 0) {

        let convertToDollars = [];

        for (arr of array.articles) {

            if (arr.currency === "UYU") {
                convertToDollars.push(arr.unitCost / 40 + " USD")
            } else {
                convertToDollars.push(arr.unitCost + " USD")
            }

        }

        let allArticles = "";

        for (let i = 0; i < array.articles.length; i++) {
            let elementsCart = array.articles[i];

            allArticles += `
        <div class="list-group">
        <a class="list-group-item ">
            <div class="row" >
                <div class="col-3">
                    <img src="` + elementsCart.src + `"class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + elementsCart.name + `</h4>
                        <label class="text-muted">Cantidad:   <input type="number" name="take" min="0" max="100" class="countArticles countArticlesClass" value="` + elementsCart.count + `" id="laid${i}"></label>
                    </div>
                    <small class="ladata text-muted d-flex"></small>
                    <small class="showSubTotalandShipping text-muted d-flex"></small>
                    </br>
                    </br>
            <div class="d-flex justify-content-end">
               
                <label onclick="deleteArticle(${i});"><input type="button" class="btn btn-primary" value="Eliminar Articulo"></input></label>
            </div>
                </div>
                    <small class="text-muted">` + convertToDollars[i] + `</small>

            </div>
                
            </a>
        </div>

        `
            document.getElementById('itemsCart').innerHTML = allArticles;

        }

    } else {
        let allArticles = "";
        allArticles += `<p class="text-muted">Seria mejor si compras algo :)</p>`

        document.getElementById('itemsCart').innerHTML = allArticles;
    }
}


const showTotal = (array, shipping) => {

    let convertToDollars = [];

    for (arr of array.articles) {
        if (arr.currency === "UYU") {
            convertToDollars.push(arr.unitCost / 40);
        } else {
            convertToDollars.push(arr.unitCost);
        }
    }

    let countArticlesNew = document.querySelectorAll('.countArticlesClass');

    let location = document.querySelectorAll('.ladata');

    let showSubTotalandShipping = document.querySelectorAll('.showSubTotalandShipping');

    //--------
    let unitCountArticlesOld = [];

    for (let i = 0; i < array.articles.length; i++) { //UNICAMENTE SUBTOTAL
        let showSubTotal = "";

        unitCountArticlesOld.push(Number(countArticlesNew[i].value) * convertToDollars[i]);

        showSubTotal += `SubTotal: ` + unitCountArticlesOld[i] + ` USD `

        location[i].innerHTML = showSubTotal;

    }

    let valorTotalAndShipping = []; // CALCULAR SUBTOTAL MAS ENVIO

    for (let i = 0; i < unitCountArticlesOld.length; i++) {

        let showSubTotalandShippingArray = "";

        valorTotalAndShipping.push(unitCountArticlesOld[i] + (unitCountArticlesOld[i] * (shipping / 100)));

        showSubTotalandShippingArray += `Envio + SubTotal: ${valorTotalAndShipping[i].toFixed(2)} `

        showSubTotalandShipping[i].innerHTML = showSubTotalandShippingArray;

    }

    let valorTotal = 0; // CALCULAR TOTAL

    for (let i = 0; i < unitCountArticlesOld.length; i++) {

        valorTotal += unitCountArticlesOld[i] + (unitCountArticlesOld[i] * (shipping / 100));
    }

    //--------   

    let showTotalInnerHTML = "";

    showTotalInnerHTML += `<p> TOTAL + ENVÍO: ` + valorTotal.toFixed(2) + ` USD </p>`

    document.getElementById('totalPriceAll').innerHTML = showTotalInnerHTML;

}

const newProductstoCart = async () => {

    await cartElements() //ESPERA QUE SE EJECUTE ELEMENTS Y ALLA DATOS EN DATAARR

    showCart(elementsOnArray[0])

}
newProductstoCart()


const allCurrentlyPrice = async (shipping) => {

    await cartElements() //ESPERA QUE SE EJECUTE ELEMENTS Y ALLA DATOS EN DATAARR

    showTotal(elementsOnArray[0], shipping)


    let countArticles = document.querySelectorAll('.countArticles')

    for (let i = 0; i < countArticles.length; i++) {

        countArticles[i].addEventListener('click', () => {
            showTotal(elementsOnArray[0], shipping)
        })
        countArticles[i].addEventListener('keyup', () => {
            showTotal(elementsOnArray[0], shipping)
        })

    }

}

/*const trashArticleCart = async (index) => {
    const newCartJSON = await getJSONData(URL_NEW_CART);

        if (newCartJSON.status === "ok"){

            newCartJSON.data.articles.splice(index, 1);

            showCart(newCartJSON.data)

        }

};
*/
const deleteArticle = async (index) => {

    elementsOnArray[0].articles.splice(index, 1);

    showCart(elementsOnArray[0]);

    shippingType();

};

function shippingType() {

    let shippingType = []

    for (let i = 0; i < document.fradios.shipping.length; i++) {


        if (document.fradios.shipping[i].checked) {

            let shippingValue = document.fradios.shipping.value;
            shippingType.shift(shippingValue);
            shippingType.push(shippingValue);

            break;
        }

    }

    allCurrentlyPrice(Number(shippingType[0]))

}
shippingType()

//WAYS TO PAY

const checkPaymentEntry = (paymentType) => {


    const inputAddress = document.getElementById('inputAddress').value;
    const inputCountry = document.getElementById('country').value;
    const inputAddress2 = document.getElementById('inputAddress2').value;
    const inputCity = document.getElementById('inputCity').value;
    const inputZip = document.getElementById('inputZip').value;

    const getCountArticlesToCheck = document.querySelectorAll('.countArticlesClass'); //obtener CANTIDAD DE CADA PRODUCTO


    let there_is_zero = [];

    for (let i = 0; i < getCountArticlesToCheck.length; i++) { //almacenar valores con 0;

        let valueCheck = [];

        valueCheck.push(Number(getCountArticlesToCheck[i].value));

        const zero = valueCheck.find(asd => asd === 0);

        there_is_zero.push(zero)

    }
    console.log(elementsOnArray)

    if (!there_is_zero.includes(0) && elementsOnArray[0].articles.length !== 0) { // no se ejecuta si existe un 0
        if (inputAddress && inputAddress2 && inputCity && inputZip && inputCountry) {

            if (paymentType === "bank") {
                const bankAccount = document.getElementById('bankAccount').value

                if (bankAccount) {
                    alert("Cuenta bancaria aceptada!")

                    setTimeout(() => {
                        alert("Compra Realizada")
                    }, 2000);
                } else {
                    alert("Por favor, completa todos los datos")
                }
            } else {
                const card_name = document.getElementById('credit-card-name').value
                const card_number = document.getElementById('credit-card-number').value
                const card_month = document.getElementById('credit-card-month').value
                const card_year = document.getElementById('credit-card-year').value
                const card_cvv = document.getElementById('credit-card-cvv').value

                if (card_name && card_number && card_month && card_year && card_cvv) {
                    alert("Tarjeta aceptada")

                    setTimeout(() => {
                        alert("¡Compra Realizada!")
                    }, 2000);

                } else {
                    alert("Por favor, completa todos los datos")
                }
            }
        } else {
            alert("Completa todos los datos, por favor.")
        }

    } else {
        alert("Revisa que ninguna cantidad este en 0 o que tengas algo en el carrito.")
    }
}