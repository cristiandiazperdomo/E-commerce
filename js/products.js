const ORDER_BY_PROD_COUNT = "Cant.";
let currentCategoriesArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let ORDER_BY_ASC_PRECIO = "PrecioASC"
let ORDER_BY_DESC_PRECIO = "PrecioDESC"
//-----------------------------------------------------------------------------------------------------------------------------

function sortCategories(criteria, array){
    let result = [];
     if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
    else if (criteria === ORDER_BY_DESC_PRECIO ){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }
    else if (criteria === ORDER_BY_ASC_PRECIO){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return 1; }
            if ( aCost < bCost ){ return -1; }
            return 0;
        });
    }
    

    return result;
}

//-----------------------------------------------------------------------------------------------------------------------------
function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let productos = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(productos.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(productos.soldCount) <= maxCount))){

        htmlContentToAppend += `
        <div class="list-group">
        <a class="list-group-item list-group-item-action" href="product-info.html">
            <div class="row" >
                <div class="col-3">
                    <img  src="` + productos.imgSrc + `" alt="` + productos.desc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ productos.name +`</h4>
                        <small class="text-muted">` + productos.soldCount + ` artículos</small>
                    </div>
                <small class="text-muted">` + productos.description + ` artículos</small>
                </div>
               <small class="text-muted">` + productos.cost + productos.currency + `</small>
            </div>
            </a>
        </div>
        
        `
        }
        document.getElementById("container-div__categoryName").innerHTML = htmlContentToAppend;
    }
}
//-----------------------------------------------------------------------------------------------------------------------------

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}


 
//-----------------------------------------------------------------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_BY_DESC_PRECIO, resultObj.data);
        }
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });
    document.getElementById("sortByMayorPrecio").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_DESC_PRECIO);
        });

    document.getElementById("sortByMenorPrecio").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_ASC_PRECIO);
        });
    });