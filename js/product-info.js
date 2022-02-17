let staticComments = [];

let currentProductArray = [];

function showProduct(currentProductArray) {

	let dataProd = "";

	let product = currentProductArray;

	dataProd += `	
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + product.name + ` </h4>
                            <small class="text-muted">` + product.cost + ` ` + product.currency + ` ` + product.soldCount + ` artículos </small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                        <small class="text-muted">` + product.category + `</small>
                    </div>
                </div>
            </div>`

	dataProd += `<div class="carousel-item active">
                	<img  src="` + product.images[0] + `" class="d-block w-100">
                </div>`

	for (let i = 1; i < product.images.length; i++) {

		dataProd += `<div class="carousel-item">
	                	<img src="` + product.images[i] + `" class="d-block w-100">
	                </div>`

	}
	document.getElementById("dataImage").innerHTML = dataProd;
}

function showRelatedProducts(allProd, relatedProd) {

	let relatedProdHTML = "";

	let arrayWithProdFilter = []

	for (var i = 0; i < relatedProd.relatedProducts.length; i++) {

		arrayWithProdFilter.push(allProd[relatedProd.relatedProducts[i]])

	}
	relatedProdHTML += `	
    <div class="carousel-item active">
    	<img src="` + arrayWithProdFilter[0].imgSrc + `" class=" rounded mx-auto d-block">
    </div>`
	for (var i = 1; i < arrayWithProdFilter.length; i++) {
		relatedProdHTML += `	
        <div class="carousel-item">
        	<img src="` + arrayWithProdFilter[i].imgSrc + `" class=" rounded mx-auto d-block">
        </div>`
	}

	document.getElementById("relatedProd").innerHTML = relatedProdHTML;

}

const deleteComment = (id) => {

	staticComments[0].splice(id, 1)

	showOldComments()
}

const yellowStart = (puntuacion) => {
	let res = "";

	for (let i = 0; i < puntuacion; i++) {
		res += `<span class="fa fa-star checked" ></span>`
	}
	return res;
}

const blackStart = (puntuacion) => {
	let res = "";

	for (let i = 0; i < puntuacion; i++) {
		res += `<span class="fa fa-star"></span>`
	}
	return res;
}

const btnEnviar = document.getElementById('btnEnviar');

const canDeleteComments = (user, numberOfComments) => {

	let canErase = "";

	let valueName = localStorage.getItem("DATA")

	if (user === JSON.parse(valueName)[0].name) {
		canErase += `
		<div class="btn-group">
		  <button type="button" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="background-color: transparent; border: none;">
		    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;">
			    <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path>
			    <g fill="#cccccc"><path d="M86,153.1875c-11.11416,0 -20.15625,-9.04209 -20.15625,-20.15625c0,-11.11416 9.04209,-20.15625 20.15625,-20.15625c11.11416,0 20.15625,9.04209 20.15625,20.15625c0,11.11416 -9.04209,20.15625 -20.15625,20.15625zM86,119.59375c-7.40944,0 -13.4375,6.02806 -13.4375,13.4375c0,7.40944 6.02806,13.4375 13.4375,13.4375c7.40944,0 13.4375,-6.02806 13.4375,-13.4375c0,-7.40944 -6.02806,-13.4375 -13.4375,-13.4375zM86,106.15625c-11.11416,0 -20.15625,-9.04209 -20.15625,-20.15625c0,-11.11416 9.04209,-20.15625 20.15625,-20.15625c11.11416,0 20.15625,9.04209 20.15625,20.15625c0,11.11416 -9.04209,20.15625 -20.15625,20.15625zM86,72.5625c-7.40944,0 -13.4375,6.02806 -13.4375,13.4375c0,7.40944 6.02806,13.4375 13.4375,13.4375c7.40944,0 13.4375,-6.02806 13.4375,-13.4375c0,-7.40944 -6.02806,-13.4375 -13.4375,-13.4375zM86,59.125c-11.11416,0 -20.15625,-9.04209 -20.15625,-20.15625c0,-11.11416 9.04209,-20.15625 20.15625,-20.15625c11.11416,0 20.15625,9.04209 20.15625,20.15625c0,11.11416 -9.04209,20.15625 -20.15625,20.15625zM86,25.53125c-7.40944,0 -13.4375,6.02806 -13.4375,13.4375c0,7.40944 6.02806,13.4375 13.4375,13.4375c7.40944,0 13.4375,-6.02806 13.4375,-13.4375c0,-7.40944 -6.02806,-13.4375 -13.4375,-13.4375z"></path></g></g>
		    </svg>
		  </button>
		    <ul class="normalize-list dropdown-menu">
				<li onclick="deleteComment(${numberOfComments});" class="options dropdown-item">
					<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;">
						<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path>
						<g fill="#cccccc"><path d="M130.40408,56.16327h-88.80816c-0.96084,-0.08151 -1.91289,0.23584 -2.63265,0.87755c-0.70765,0.67985 -1.03576,1.66419 -0.87755,2.63265l9.12653,79.50612c1.07015,8.76566 8.54501,15.33447 17.37551,15.26939h44.22857c9.0789,0.12923 16.7265,-6.75362 17.55102,-15.79592l7.54694,-79.33061c0.04677,-0.85097 -0.2726,-1.68132 -0.87755,-2.28163c-0.71976,-0.64171 -1.67182,-0.95906 -2.63265,-0.87755zM119.34694,138.30204c-0.55157,5.34456 -5.16192,9.34019 -10.53061,9.12653h-44.22857c-5.2721,0.21399 -9.80403,-3.70343 -10.3551,-8.95102l-8.77551,-75.29388h81.08571zM143.21633,33.34694h-36.1551v-5.61633c0.09687,-2.69772 -0.92009,-5.31653 -2.81222,-7.24186c-1.89213,-1.92533 -4.49286,-2.98768 -7.19186,-2.93773h-22.11429c-2.69899,-0.04994 -5.29972,1.0124 -7.19186,2.93773c-1.89213,1.92533 -2.90909,4.54414 -2.81222,7.24186v5.61633h-36.1551c-1.93863,0 -3.5102,1.57157 -3.5102,3.5102c0,1.93863 1.57157,3.5102 3.5102,3.5102h114.43265c1.93863,0 3.5102,-1.57157 3.5102,-3.5102c0,-1.93863 -1.57157,-3.5102 -3.5102,-3.5102zM71.95918,33.34694v-5.61633c-0.10734,-0.83501 0.16562,-1.67413 0.74367,-2.28619c0.57806,-0.61206 1.40022,-0.93248 2.24,-0.87299h22.11429c0.83978,-0.05949 1.66194,0.26093 2.24,0.87299c0.57806,0.61206 0.85101,1.45118 0.74367,2.28619v5.61633z"></path></g></g>
					</svg>
					<p>Eliminar</p>	
				</li>
				<li class="options salchicha dropdown-item">
					<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 172 172" style=" fill:#000000;">
						<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path>
						<g fill="#cccccc"><path d="M111.27416,21.06122c-5.96045,-0.05251 -11.67736,2.36179 -15.79592,6.67076l-57.21564,57.39047c-0.50579,0.4059 -0.87441,0.95764 -1.0558,1.58028l-7.37006,33.87141c-0.20171,1.21604 0.1893,2.4553 1.05237,3.33538c0.64837,0.66129 1.5318,1.03955 2.45783,1.05238h0.70273l33.87141,-7.37006c0.65981,-0.10987 1.27132,-0.41563 1.7551,-0.87755l57.39389,-57.39047c4.192,-4.18351 6.53078,-9.87366 6.49251,-15.79592c0.00865,-5.96899 -2.32215,-11.70369 -6.49251,-15.97417c-4.18351,-4.192 -9.87366,-6.53078 -15.79592,-6.49251zM111.27416,28.08163c4.08029,0.00009 7.99081,1.63325 10.85922,4.53514c2.86841,2.9019 4.45606,6.83111 4.4088,10.91113c0.05722,4.01728 -1.52756,7.8839 -4.38776,10.70544l-21.5857,-21.76395c2.84403,-2.82647 6.69581,-4.40517 10.70544,-4.38776zM95.65306,37.55987l21.58913,21.5857l-50.02041,49.84558l-21.58913,-21.41087zM42.82518,94.60069l17.37619,17.37619l-22.29185,4.91223zM27.20408,143.91837c-1.93863,0 -3.5102,1.57157 -3.5102,3.5102c0,1.93863 1.57157,3.5102 3.5102,3.5102h117.59184c1.93863,0 3.5102,-1.57157 3.5102,-3.5102c0,-1.93863 -1.57157,-3.5102 -3.5102,-3.5102z"></path></g></g>
					</svg>
					<p>Editar</p>	
				</li>
			</ul>
		</div>

		`
	} else {
		canErase += "";
	}
	return canErase;
}

const receiveNewComment = (i) => {

	let reddit = document.getElementById('inputReddit').value;

	staticComments[0][i].description = reddit;

	showOldComments()

}

const clickToChangeComment = (numOfDiv, num) => {

	let specificDiv = document.querySelectorAll(".opinion")[numOfDiv + 4];

	specificDiv.innerHTML = "";

	return specificDiv.innerHTML += `
	<div class="reddit"> 	
		<input type="text" id="inputReddit"/>
		<ul class="cancelordoit" style="margin: 0; padding: 0;">	
			<li class="options">	
				<button type="button" onclick="receiveNewComment(${numOfDiv + 4})" id="hola" style="margin: 0; padding: 0; background-color: transparent; border: none;">
					<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 172 172" style=" fill:#000000;">
			 			<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path>
			 			<g fill="#2ecc71"><path d="M86,31.01123c-30.32037,0 -54.98746,24.71884 -54.98746,55.04257c0,30.32373 24.6654,55.03995 54.98746,55.03995h0.00328c30.32037,0 54.98746,-24.71949 54.98746,-55.04323c0,-30.32373 -24.66868,-55.03929 -54.99074,-55.03929zM86.00328,37.75557c26.61902,0 48.26739,21.69234 48.26739,48.31136c0,26.61902 -21.65305,48.30807 -48.26871,48.30807h-0.00197c-26.61566,0 -48.26871,-21.7058 -48.26871,-48.32448c0,-26.61868 21.65297,-48.29495 48.27199,-48.29495zM105.31837,64.998c-0.89006,-0.01139 -1.74921,0.3261 -2.39355,0.94023l-25.13692,24.21899l-9.6418,-9.28159c-1.33683,-1.2863 -3.46325,-1.24547 -4.74971,0.0912l-7.92077,8.23047c-1.28647,1.33665 -1.24594,3.46307 0.09055,4.74971l19.89774,19.15303c1.30092,1.25278 3.35955,1.25278 4.66048,0l35.38695,-34.09831c0.64165,-0.61825 1.0114,-1.46609 1.02788,-2.35697c0.01649,-0.89088 -0.32163,-1.75183 -0.93996,-2.39339l-7.92406,-8.22522c-0.61817,-0.64171 -1.46594,-1.01155 -2.35681,-1.02815zM105.16747,73.10774l3.26292,3.38693l-30.63921,29.51788l-15.14605,-14.57916l3.26096,-3.38825l9.55256,9.19498c1.30101,1.2532 3.36012,1.2532 4.66113,0z"></path></g></g>
					</svg>
				</button>
			</li>
			<li class="options">
			<button onclick="showOldComments()" style="margin-bottom: 2px; padding: 0; background-color: transparent; border: none;">
				<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="22" height="22" viewBox="0 0 172 172" style=" fill:#000000;">
					<g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,172v-172h172v172z" fill="none"></path>
					<g fill="#e74c3c"><path d="M86,11.57692c-41.03688,0 -74.42308,33.38619 -74.42308,74.42308c0,41.03655 33.38619,74.42308 74.42308,74.42308c41.03688,0 74.42308,-33.38652 74.42308,-74.42308c0,-41.03688 -33.38619,-74.42308 -74.42308,-74.42308zM119.76856,132.30075c-0.043,0.48788 -0.30001,0.93045 -0.70156,1.21062c-9.73255,6.78606 -21.16692,10.37325 -33.067,10.37325c-31.91758,0 -57.88462,-25.96704 -57.88462,-57.88462c0,-11.89975 3.58719,-23.33412 10.37325,-33.06733c0.28016,-0.40155 0.72339,-0.65823 1.21095,-0.70156c0.48921,-0.04333 0.96915,0.13198 1.31547,0.47796l78.27555,78.27588c0.34598,0.34632 0.52129,0.82792 0.47796,1.3158zM133.51136,119.06733c-0.28016,0.40122 -0.72339,0.6579 -1.21095,0.70123c-0.04829,0.0043 -0.09725,0.00695 -0.14521,0.00695c-0.43662,0 -0.85802,-0.17266 -1.16927,-0.48458l-78.27654,-78.27588c-0.34598,-0.34598 -0.52096,-0.82758 -0.47796,-1.31547c0.043,-0.48755 0.30001,-0.93078 0.70156,-1.21095c9.73288,-6.78606 21.16725,-10.37325 33.067,-10.37325c31.91758,0 57.88462,25.96704 57.88462,57.88462c0,11.90008 -3.58719,23.33412 -10.37325,33.06733z"></path></g></g>
				</svg>
			</button>				
			</li>
		</ul>
	<div>`

}

const editComment = (num) => {

	let groupOfComments = document.querySelectorAll(".salchicha");

	for (let numOfDiv = 0; numOfDiv < groupOfComments.length; numOfDiv++) {
		groupOfComments[numOfDiv].addEventListener('click', (event) => clickToChangeComment(numOfDiv))
	}

}

function showOldComments() {

	const commentsHTML = document.querySelector('.comments');

	commentsHTML.innerHTML = "";

	for (let product of staticComments[0]) {

	let numberOfComments = document.querySelectorAll('.commentsTd');

		commentsHTML.innerHTML +=
		`<td class="commentsTd">
			<div class="cuestion">
				<p>Nombre de usuario: ${product.user}</p> 
				<p>Puntuación: ${yellowStart(product.score)} ${blackStart(5 - product.score)}</p>
				<div class="opinion">
					<p class="es">Opinión: ${product.description}</p>  
				</div>
				<p> Fecha: ${product.dateTime}</p> 
			</div>
			<div>	
			 	${canDeleteComments(product.user, numberOfComments.length)}	
		 	</div>
		</td>`

	}	
	let num = document.querySelectorAll('.commentsTd')

	editComment(num.length) 

	return commentsHTML;

}

const toComments = (e) => {

	e.preventDefault()

	let valueName = localStorage.getItem("DATA");
	let valueScore = document.getElementById('entradaScore').value;
	let valueDescription = document.getElementById('entradaDescription').value;
	let valuedataTime = new Date();

	if (valueName && valueScore && valueDescription && valuedataTime) {

		let date = valuedataTime.getFullYear() + "-" + valuedataTime.getMonth() + "-" + valuedataTime.getDay() +
			" " + valuedataTime.getHours() + ":" + valuedataTime.getMinutes() + ":" + valuedataTime.getSeconds()

		staticComments[0].push({
			dateTime: date,
			user: JSON.parse(valueName)[0].name,
			score: Number(valueScore),
			description: valueDescription
		})

		showOldComments();

	} else {
		alert("Completa todos los valores")
	}

}

btnEnviar.addEventListener('click', toComments);

document.addEventListener("DOMContentLoaded", async function(e) {

	/*SHOW PRODUCT*/
	getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
		if (resultObj.status === "ok") {
			showProduct(resultObj.data)
		}
	});

	/*COMMENTS*/
	getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
		if (resultObj.status === "ok") {
			staticComments.push(resultObj.data)
			showOldComments()
		}
	});

	/* RELATED PRODUCTS */
	const arrAllProd = await getJSONData(PRODUCTS_URL);
	const arrRelatedProd = await getJSONData(PRODUCT_INFO_URL);

	if (arrAllProd.status && arrRelatedProd.status === "ok") {
		showRelatedProducts(arrAllProd.data, arrRelatedProd.data)
	}

});