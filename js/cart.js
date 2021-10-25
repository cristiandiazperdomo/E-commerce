//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const URL_NEW_CART = "https://japdevdep.github.io/ecommerce-api/cart/654.json"

const showCart = (array) => {

    let convertToDollars = [];

    for(arr of array.articles){
        if (arr.currency === "UYU") {
            convertToDollars.push(arr.unitCost / 40 + " USD")
        }
        else{
            convertToDollars.push(arr.unitCost + " USD")
        }     
        
    }

	let allArticles = "";
    
for (var i = 0; i < array.articles.length; i++) {
    let elementsCart = array.articles[i]

		allArticles += `
        <div class="list-group">
        <a class="list-group-item ">
            <div class="row" >
                <div class="col-3">
                    <img src="`+ elementsCart.src + `"class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ elementsCart.name +`</h4>
                        <label class="text-muted">Cantidad:   <input type="number" name="take" min="0" max="100" id="countArticles`+ i +`" class="countArticlesClass" value="`+ elementsCart.count+`"></label>
                    </div>
                    <small class="ladata text-muted d-flex"></small>
                </div>
               <small class="text-muted">` + convertToDollars[i] + `</small>
            </div>
            </a>
        </div>
        `	
	document.getElementById('itemsCart').innerHTML = allArticles

    }
}

const showTotal = (array) => {

    let convertToDollars = [];

    for(arr of array.articles){
        if (arr.currency === "UYU") {
            convertToDollars.push(arr.unitCost / 40)
        }
        else{
            convertToDollars.push(arr.unitCost)
        }     
    }

    let countArticlesNew =  document.querySelectorAll('.countArticlesClass')

    let location = document.querySelectorAll('.ladata')

    //--------
        let unitCountArticlesOld = [];

    for (var i = 0; i < array.articles.length; i++) {
        let showSubTotal = "";

        unitCountArticlesOld.push(Number(countArticlesNew[i].value) * convertToDollars[i]); 

        showSubTotal += `SubTotal: `+ unitCountArticlesOld[i] +` USD `

        location[i].innerHTML = showSubTotal;

    }
        let valorTotal = 0;

        for (var i = 0; i < unitCountArticlesOld.length; i++) {
                valorTotal += unitCountArticlesOld[i];
        }
    //--------

    let showTotalInnerHTML = "";

        showTotalInnerHTML += `<p> TOTAL: ` + valorTotal + ` USD</p>`

        document.getElementById('totalPriceAll').innerHTML = showTotalInnerHTML;
}

const buyAllMyCart = () =>{
    alert("Su compra fue realizada con exito")
}
document.getElementById('buyAllMyCart').addEventListener("click", buyAllMyCart)


const newProductstoCart = async() => {
    const newCartJSON = await getJSONData(URL_NEW_CART);
        if (newCartJSON.status === "ok"){
            showCart(newCartJSON.data)
            showTotal(newCartJSON.data)
        }
        document.getElementById('countArticles0').addEventListener('click', ()=>{showTotal(newCartJSON.data)}) 
        document.getElementById('countArticles0').addEventListener('keyup', ()=>{showTotal(newCartJSON.data)})

        document.getElementById('countArticles1').addEventListener('click', ()=>{showTotal(newCartJSON.data)}) 
        document.getElementById('countArticles1').addEventListener('keyup', ()=>{showTotal(newCartJSON.data)}) 
}
newProductstoCart()
