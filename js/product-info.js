//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


let dataOnGoogleComment = JSON.parse(localStorage.getItem('userDataGoogle')); //data de usuario de google

let comYaCreados = []; //ARRAY PARA COMENTARIOS YA CREADOS

//-------

//MOSTRAR PRODUCTO

var currentProductArray = [];

function showProduct(currentProductArray) {

	let dataProd = "";

	let product = currentProductArray; //PRODUCTO CONTIENE EL ARRAY

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
            </div>
            `

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
//-------------
//MOSTRAR PRODUCTOS RELACIONADOS.

function showRelatedProducts(array, array2) {

	let relatedProdHTML = "";

	let arrayWithProdFilter = []

	for (var i = 0; i < array2.relatedProducts.length; i++) {

		arrayWithProdFilter.push(array[array2.relatedProducts[i]])

	}
	relatedProdHTML += `	
            <div class="carousel-item active">
            	<img src="` + arrayWithProdFilter[0].imgSrc + `" class=" rounded mx-auto d-block">
            </div>
            `
	for (var i = 1; i < arrayWithProdFilter.length; i++) {

		relatedProdHTML += `	
            <div class="carousel-item">
            	<img src="` + arrayWithProdFilter[i].imgSrc + `" class=" rounded mx-auto d-block">
            </div>
            `
	}

	document.getElementById("rela").innerHTML = relatedProdHTML;

}

const getImg = async () => {
	const arrAllProd = await getJSONData(PRODUCTS_URL);
	const arrRelatedProd = await getJSONData(PRODUCT_INFO_URL);
	if (arrAllProd.status && arrRelatedProd.status === "ok") {
		showRelatedProducts(arrAllProd.data, arrRelatedProd.data)
	}

}
getImg()
//---------------------------------------------
// LLAMO A AL JSON Y ENIVO EL PARAMETRO
document.addEventListener("DOMContentLoaded", function(e) {
	getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
		if (resultObj.status === "ok") {
			showProduct(resultObj.data)

		}

	});
});
//-------------
// 							----NO LOGRE PONER LAS ESTRELLAS AÚN----
//ESTRELLAS PARA COMENTARIOS YA CREADOS
/*
	let prueba  = document.getElementById('pruebatime')
const changeColorStar = (puntuacion)  => {  // CAMBIAR PUNTUACION A ESTRELLAS

	for (var i = 0; i < 5; i++) {
		if (i < puntuacion) {
			prueba.innerHTML += `<span  class="fa fa-star checked" ></span>`
		}
		else{
			prueba.innerHTML += `<span  class="fa fa-star"></span>`
		}
	}
}
*/

//-------------
//OBTENER ID DE HTML
const sectionCom = document.querySelector('.comments'); //ZONA COMENTARIOS
//-------------
//OBTENER NUEVOS COMENTARIOS

const entradaScore = document.getElementById('entradaScore');
const entradaDescription = document.getElementById('entradaDescription');
//OBTENER NUEVOS BOTONES
const btnEnviar = document.getElementById('btnEnviar');

//------------
//COMENTARIOS TANTO NUEVOS COMO VIEJOS

//COMENTARIOS VIEJOS

function showOldComments(comYaCreados) { //FUNCION PARA MOSTRAR LOS COMENTARIOS POR EL ULTIMO

	sectionCom.innerHTML = "";

	for (let product of comYaCreados) {
		sectionCom.innerHTML += `<td class="comentarios">Nombre de usuario: ${product.user} </br>  Puntuación: ${product.score}
	 </br> Opinión: ${product.description}  </br> Fecha: ${product.dateTime}</br> </td>`
	}
}

//COMENTARIOS NUEVOS

function nuevosComentarios(arr) {

	if (bLogin) { //bLogin revisa si se a iniciado sesion sin google.
		console.log(arr[0])
		for (let product of arr[0]) {
			let userName = JSON.parse(product.user);

			sectionCom.innerHTML += `<td class="comentarios">Nombre de usuario: ${userName[0].name} </br> Puntuación: ${(product.score)}
	 </br> Opinión: ${product.description}  </br> Fecha: ${product.dateTime.getFullYear()}-${product.dateTime.getMonth()}-${product.dateTime.getDay()} 
     ${product.dateTime.getHours()}:${product.dateTime.getMinutes()}:${product.dateTime.getSeconds()} </td>`
		}


	}
	/*else{ para cuando logre login con GOOGLE.
		for(let product of arr[0]) {
            console.log(product)
            
	 	sectionCom.innerHTML +=`<td class="comentarios">Nombre de usuario: ${product.user.toLowerCase()} </br> Puntuación: ${(product.score)}
		 </br> Opinión: ${product.description}  </br> Fecha: ${product.dateTime.getFullYear()}-${product.dateTime.getMonth()}-${product.dateTime.getDay()} 
	     ${product.dateTime.getHours()}:${product.dateTime.getMinutes()}:${product.dateTime.getSeconds()} </td>`
		}
	}
	*/
}

document.addEventListener("DOMContentLoaded", function(e) {
	getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
		if (resultObj.status === "ok") {
			showOldComments(resultObj.data) //mando valores apartir de una api
			//llamo la funcion para almacenar estos valores por parametros
		}

	});
});
//dataOnGoogle.Se.toLowerCase()

const crear_valor = () => {

	let comentarios = []; //ARRAY
	let valorName = localStorage.getItem("DATA");
	let valorScore = entradaScore.value;
	let valorDescription = entradaDescription.value;
	let valordataTime = new Date();

	if (bLogin) {
		if (valorName && valorScore && valorDescription && valordataTime) {

			comentarios.push([{
				user: valorName,
				score: valorScore,
				description: valorDescription,
				dateTime: valordataTime
			}]) //INSERTO VALORES EN UN ARRAY

			nuevosComentarios(comentarios);

			alert("¡Comentario agregado con exito!") //MUESTRO LOS VALORES
		} else {
			alert("Completa todos los valores")
		}
	} else {
		if (dataOnGoogle.jf && valorScore && valorDescription && valordataTime) {

			comentarios.push([{
				user: dataOnGoogle.jf,
				score: valorScore,
				description: valorDescription,
				dateTime: valordataTime
			}]) //INSERTO VALORES EN UN ARRAY

			nuevosComentarios(comentarios);

			alert("¡Comentario agregado con exito!") //MUESTRO LOS VALORES
		} else {
			alert("Completa todos los valores")
		}
	}
}


btnEnviar.addEventListener('click', crear_valor);