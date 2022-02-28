const ORDER_BY_PROD_COUNT = "Cant.";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;
let ORDER_BY_ASC_PRECIO = "PrecioASC"
let ORDER_BY_DESC_PRECIO = "PrecioDESC"


function sortProducts(criteria, array){
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

function showProductList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let productos = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(productos.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(productos.cost) <= maxCount))) {

            htmlContentToAppend += `
                <div class="list-group">
                <a class="list-group-item list-group-item-action" href="product-info.html">
                    <div class="row" >
                        <div class="col-3 div-img-categories">
                            <img  src="` + productos.imgSrc + `" alt="` + productos.desc + `" class="img-thumbnail img-categories">
                        </div>
                        <div class="col col-categories">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">` + productos.name + `</h4>
                            </div>
                            <small class="text-muted">` + productos.description + ` artículos</small>
                        </div>
                        <div class="container-price">        
                            <div class="product-price-info">
                               <small class="text-muted product-price-info-child">` + productos.currency + `</small>
                               <small class="text-muted product-price-info-child">` + productos.cost + `</small>
                            </div>
                            <div>
                                <small class="text-muted">` + productos.soldCount + ` artículos</small>
                            </div>
                        </div>
                    </div>
                    </a>
                </div>
            `
        }
        document.getElementById("container-div__productsName").innerHTML = htmlContentToAppend;
    }
}
//-----------------------------------------------------------------------------------------------------------------------------

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentproductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentproductsArray);

    showProductList();
}



//-----------------------------------------------------------------------------------------------------------------------------


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_BY_DESC_PRECIO, resultObj.data);
        }
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });
    document.getElementById("sortByMayorPrecio").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_DESC_PRECIO);
    });

    document.getElementById("sortByMenorPrecio").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_ASC_PRECIO);
    });

    //..............................................................................

    document.getElementById("clearRangeFilterProducts").addEventListener("click", function() {
        document.getElementById("rangeFilterProductsCountMin").value = "";
        document.getElementById("rangeFilterProductsCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });

    document.getElementById("rangeFilterCountProducts").addEventListener("click", function() {

        minCount = document.getElementById("rangeFilterProductsCountMin").value;
        maxCount = document.getElementById("rangeFilterProductsCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }

        showProductList();
    });
});