let userInfoArray = [{
    name: '----------',
    lastname: '----------',
    age: '----------',
    email: '----------',
    cellphone: '----------',
    img: 'https://png.pngitem.com/pimgs/s/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'
}]

const cancelRedditComment = () => {
    readData()
    editProfileData()
}

const getInfoNewData = (i) => {

    let newValue = document.getElementById('inputToChangeInfo').value;
    let userInfo_HTML = document.querySelectorAll('.userInfo');

    let specificInfo = userInfo_HTML[i];

    let specificInfoClass = specificInfo.className.split(' ');

    let typeOfData = specificInfoClass[1];

    if (typeOfData == 'Nombre') {
        userInfoArray[0].name = newValue;
    } else if (typeOfData == 'Apellido') {
        userInfoArray[0].lastname = newValue;
    } else if (typeOfData == 'Edad') {
        userInfoArray[0].age = newValue;
    } else if (typeOfData == 'Email') {
        userInfoArray[0].email = newValue;
    } else if (typeOfData == 'Celular') {
        userInfoArray[0].cellphone = newValue;
    }

    readData()

    editProfileData()

    localStorage.setItem('array', JSON.stringify(userInfoArray));
}

const redditData = (i) => {
    let userInfo_HTML = document.querySelectorAll('.userInfo');

    let specificInfo = userInfo_HTML[i];

    let specificInfoClass = specificInfo.className.split(' ');

    let typeOfData = specificInfoClass[1];

    specificInfo.innerHTML = "";

    specificInfo.innerHTML += `
        <form>    
            <input type="text" class="" placeholder="${typeOfData}" id="inputToChangeInfo"/>
            <button class="btn btn-secondary" type="submit" onclick="getInfoNewData(${i})">Aceptar</button>
            <button class="editUserInfo btn btn-danger" onclick="cancelRedditComment()">Cancelar</button>
        </form>
    `
}

const editProfileData = () => {
    let buttonToReddit = document.querySelectorAll('.editUserInfo')

    for (let i = 0; i < buttonToReddit.length; i++) {
        buttonToReddit[i].addEventListener('click', () =>
            redditData(i)
        )
    }
}

const readData = () => {
    let displayInfoHTML = document.querySelector('.description');
    let displayProfileHTML = document.querySelector('.card-profile');

    displayInfoHTML.innerHTML = "";
    displayProfileHTML.innerHTML = "";

    for (info of userInfoArray) {
        displayProfileHTML.innerHTML += `<img class="card-img-top" src="` + info.img + `" alt="user profile">`

        displayInfoHTML.innerHTML += ` 
        <div class="userInfo Nombre d-flex justify-content-center align-items-start">
            <h5 class="card-title mr-2 my-auto">${info.name}</h5>   
            <button class="editUserInfo btn btn-secondary">Editar</button>
        </div>
        <div class="userInfo Apellido d-flex justify-content-between align-items-start">  
            <p class="card-text">${info.lastname}</p>
            <button class="editUserInfo btn btn-secondary">Editar</button>
        </div>
        <div class="userInfo Edad d-flex justify-content-between align-items-start">
            <p class="card-text">${info.age}</p>
            <button class="editUserInfo btn btn-secondary">Editar</button>
        </div>
        <div class="userInfo Email d-flex justify-content-between align-items-start">
            <p class="card-text ">${info.email}</p>
            <button class="editUserInfo btn btn-secondary">Editar</button>
        </div>
        <div class="userInfo Celular d-flex justify-content-between align-items-start">
            <p class="card-text">${info.cellphone}</p>
            <button class="editUserInfo btn btn-secondary">Editar</button>
        </div> `

    }

}

const showProfileImg = (event) => { //MOSTRAR IMAGEN DEL USUARIO

    var input = event.target;

    const reader = new FileReader();

    reader.addEventListener('load', () => {
        let imgProcess = reader.result;

        userInfoArray[0].img = imgProcess;

        localStorage.setItem('array', JSON.stringify(userInfoArray));

        let profilePic_HTML = "";

        profilePic_HTML += `<img width="200px" height="100px" class="card-img-top"  src="` + imgProcess + `" >`
        document.querySelector('.card-profile').innerHTML = profilePic_HTML;

    })

    reader.readAsDataURL(input.files[0]);

}

let changeImgHTML = document.querySelector('.subir');

document.querySelector('.profile-picture').addEventListener('mouseover', () => {
    changeImgHTML.style.visibility = 'visible';
})
document.querySelector('.profile-picture').addEventListener('mouseout', () => {
    changeImgHTML.style.visibility === 'hidden';
})


userInfoArray = JSON.parse(localStorage.getItem('array'))

document.addEventListener('DOMContentLoaded', () => {

    if (!userInfoArray) {
        userInfoArray = [{
            name: 'Nombre',
            lastname: 'Apellido',
            age: 'Edad',
            email: 'Email',
            cellphone: 'Celular',
            img: 'https://png.pngitem.com/pimgs/s/30-307416_profile-icon-png-image-free-download-searchpng-employee.png'
        }];
    }

    //SHOW INFO USER
    readData()
    //EVENTS TO EDIT COMMENTS
    editProfileData()

})