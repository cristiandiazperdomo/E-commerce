const URL_NEW_CART = "https://japdevdep.github.io/ecommerce-api/cart/654.json"
const URL_GET = "http://localhost:3000/tobuy"

let getCountArticlesToCheck = [];

let elementsOnArray = [];
let shippingArray = [];

const cartElements = async() => {

    const newCartJSON = await getJSONData(URL_NEW_CART);

    if (newCartJSON.status === "ok") {

        elementsOnArray.push(newCartJSON.data)

        showCart(newCartJSON.data)
      
    }
};
        
const postTypeShipping = async() => {
  
    await fetch("http://localhost:3000/shipping", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(shippingArray)
    })
}
const cartElementsToBackend = async() => {

    await fetch(URL_GET, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(elementsOnArray[0])
    })

}


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
                            <small class="text-muted each-price-product">` + convertToDollars[i] + `</small>
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

        elementsOnArray[0].articles[i].count = countArticlesNew[i].value;
    }

    for (let i = 0; i < unitCountArticlesOld.length; i++) {

        let showSubTotalandShippingArray = "";

        let valorTotalAndShipping = unitCountArticlesOld[i] + (unitCountArticlesOld[i] * (shipping / 100));

        showSubTotalandShippingArray += `Envio + SubTotal: ${valorTotalAndShipping.toFixed(2)} `

        showSubTotalandShipping[i].innerHTML = showSubTotalandShippingArray;

    }

    let valorTotal = 0; // CALCULAR TOTAL

    console.log(unitCountArticlesOld)
    for (let i = 0; i < unitCountArticlesOld.length; i++) {

        valorTotal += unitCountArticlesOld[i] + (unitCountArticlesOld[i] * (shipping / 100));
    }

    //--------   

    let showTotalInnerHTML = "";

    showTotalInnerHTML += `<p> TOTAL + ENVÍO: <span class="total">` + valorTotal.toFixed(2) + ` USD</span></p>`

    document.getElementById('totalPriceAll').innerHTML = showTotalInnerHTML;

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

const shippingType = async() => {

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

document.getElementById('shopping-end').addEventListener('click', async() => {
    await cartElementsToBackend()
})
document.addEventListener('DOMContentLoaded', async() => {
    //GET ELEMENTS 
    await cartElements()
    //SHIPPING TYPE  
    shippingType()
})