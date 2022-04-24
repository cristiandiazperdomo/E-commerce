const URL_NEW_CART = "https://mysterious-cove-37583.herokuapp.com/cart"
const URL_GET = "https://mysterious-cove-37583.herokuapp.com/tobuy"
const URL_SHIPPING = "https://mysterious-cove-37583.herokuapp.com/shipping"

let getCountArticlesToCheck = [];

let elementsOnArray = [];
let shippingArray = [];

const cartElements = async () => {

    const newCartJSON = await getJSONData(URL_NEW_CART);

    if (newCartJSON.status === "ok") {

        elementsOnArray.push(newCartJSON.data)

        showCart(newCartJSON.data)

    }
};

const postTypeShipping = async () => {

    await fetch(URL_SHIPPING, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shippingArray)
    })

}
const cartElementsToBackend = async () => {

    await fetch(URL_GET, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(elementsOnArray[0])
    })

}

const priceToDollars = (array) => {
    const priceToDollarsArray = [];

    for (arr of array.articles) {
        if (arr.currency === "UYU") {
            priceToDollarsArray.push(arr.unitCost / 40);
        } else {
            priceToDollarsArray.push(arr.unitCost);
        }
    }

    return priceToDollarsArray;
}

const showCart = (array) => {

    if (array.articles.length !== 0) {

        let convertToDollars = priceToDollars(array)

        let allArticles = "";

        for (let i = 0; i < array.articles.length; i++) {
            const elementsCart = array.articles[i];

            allArticles += `
                <div class="list-group">
                <a class="list-group-item">
                    <div class="row cart-elements">
                        <div class="col-3 img-container">
                            <img src="` + elementsCart.src + `"class="img-thumbnail">
                        </div>
                        <div class="col container-down-info">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">` + elementsCart.name + `</h4>
                                <label class="text-muted count-container">Cantidad:   <input type="number" name="take" min="0" max="100" class="countArticles countArticlesClass" value="` + elementsCart.count + `" id="laid${i}"></label>
                            </div>
                            <div class="bottom-data">
                                <div>    
                                    <small class="text-muted each-price-product">Precio individual: ` + convertToDollars[i] + `</small>
                                    <small class="subtotal text-muted d-flex"></small>
                                    <small class="showSubTotalandShipping text-muted d-flex"></small>
                                    </br>
                                </div>
                                <div class="d-flex justify-content-end">
                                    <label onclick="deleteArticle(${i});"><input type="button" class="btn btn-primary" value="Eliminar Articulo"></input></label>
                                </div>
                            </div>
                        </div>
                    </div>
                    </a>
                </div>
            `
            document.getElementById('itemsCart').innerHTML = allArticles;
        }

    } else {
        document.getElementById('itemsCart').innerHTML = "";
    }
}

const calculateSubTotal = (numberOfEachItems, dolarPrice) => numberOfEachItems * dolarPrice;

const showTotal = (array, shipping) => {

    const dolarPrice = priceToDollars(array) // ARRAY WITH PRICES IN DOLLARS

    const numberOfEachItems = document.querySelectorAll('.countArticlesClass');

    let allSubTotalsArray = [];

    for (let i = 0; i < array.articles.length; i++) { // SUBTOTAL

        const subTotalHTML = document.querySelectorAll('.subtotal');
        
        const subTotal = calculateSubTotal(Number(numberOfEachItems[i].value), dolarPrice[i])

        allSubTotalsArray.push(subTotal);

        subTotalHTML[i].innerHTML = `SubTotal: ` + allSubTotalsArray[i] + ` USD `;

        elementsOnArray[0].articles[i].count = numberOfEachItems[i].value; // ASSIGN NEW VALUE TO MAIN ARRAY
    }

    let showSubTotalandShipping = document.querySelectorAll('.showSubTotalandShipping'); // SUBTOTAL AND SHIPPING

    for (let i = 0; i < allSubTotalsArray.length; i++) {

        const valorTotalAndShipping = allSubTotalsArray[i] + (allSubTotalsArray[i] * (shipping / 100));

        showSubTotalandShipping[i].innerHTML = `Envio + SubTotal: ${valorTotalAndShipping.toFixed(2)} `

    }

    let totalValue = 0; // CALCULAR TOTAL

    for (let i = 0; i < allSubTotalsArray.length; i++) {
        totalValue += allSubTotalsArray[i] + (allSubTotalsArray[i] * (shipping / 100));
    }
    
    let showTotalInnerHTML = document.getElementById('totalPriceAll');

    showTotalInnerHTML.innerHTML = `<p> TOTAL + ENVÍO: <span class="total">` + totalValue.toFixed(2) + ` USD</span></p>`


}

const allCurrentlyPrice = async (shipping) => {

    let countArticles = document.querySelectorAll('.countArticles')

    for (let i = 0; i < countArticles.length; i++) {

        countArticles[i].addEventListener('click', () => {
            showTotal(elementsOnArray[0], shipping)
        })
        countArticles[i].addEventListener('keyup', () => {
            showTotal(elementsOnArray[0], shipping)
        })

    }

    showTotal(elementsOnArray[0], shipping)
}

const deleteArticle = async (index) => {

    elementsOnArray[0].articles.splice(index, 1);

    showCart(elementsOnArray[0]);

    shippingType();

    await cartElementsToBackend();

};

const shippingType = async () => {

    let shippingType = []

    for (let i = 0; i < document.fradios.shipping.length; i++) {

        if (document.fradios.shipping[i].checked) {

            let shippingValue = document.fradios.shipping.value;
            shippingType.shift(shippingValue);
            shippingType.push(shippingValue);

            break;
        }

    }
    shippingArray = [];

    shippingArray.push(Number(shippingType[0]))


    await postTypeShipping()

    allCurrentlyPrice(Number(shippingType[0]))

}

document.getElementById('shopping-end').addEventListener('click', async () => {
    await cartElementsToBackend()
})
document.addEventListener('DOMContentLoaded', async () => {
    //GET ELEMENTS 
    await cartElements()
    //SHIPPING TYPE  
    shippingType()
})