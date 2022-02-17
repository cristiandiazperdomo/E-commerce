const showUserData = () => {

    let arrayInfoUser = JSON.parse(localStorage.getItem('userData'))

    if (arrayInfoUser) {

        let myProfileZone = '';

        for (let arrayInfo of arrayInfoUser) {

            myProfileZone += `
                <div class="container">
                        <div class="row justify-content-md-center">
                            <div  id="showUserImg">
                                <img src="` + arrayInfo.img + `"  class="w-100"></img>
                            </div> 
                        </div> 
                    <div class="row">
                        <div class="col-4"><p class="col-4"><p class="text-muted">Nombres:</p>              ` + arrayInfo.name + `</p></div>
                        <div class="col-4"><p class="col-4"><p class="text-muted">Apellidos:</p>            ` + arrayInfo.lastname + `</p></div>
                        <div class="col-4"><p class="col-4"><p class="text-muted">Edad:</p>                 ` + arrayInfo.age + ` años</p></div>
                        <div class="col-4"><p class="col-4"><p class="text-muted">Email:</p>                ` + arrayInfo.useremail + `</p></div>
                        <div class="col-12 col-md-8 col-6 col-md-4"><p class="col-6 col-md-4"><p class="text-muted">Teléfono de contacto:</p> ` + arrayInfo.phonenumber + `</p></div>
                    </div>
                    <div class="row justify-content-md-center">
                        <button class="btn btn-primary col-sm-4" id="changeData" onclick="changeData()">Cambiar datos</button>
                    </div> 
                    </br>
                </div>
        `
            document.querySelector('.myProfileData').innerHTML = myProfileZone;
        }

    }

}
const getUserData = () => {

    const userName = document.getElementById('myProfileData__name').value
    const userLastName = document.getElementById('myProfileData__lastname').value
    const userAge = document.getElementById('myProfileData__age').value
    const userEmail = document.getElementById('myProfileData__email').value
    const phoneNumber = document.getElementById('myProfileData__phonenumber').value

    let arrayInfoUser = JSON.parse(localStorage.getItem('userData'))

    let arrWithallUserInfo = [];

    if (arrayInfoUser) {

        showUserData()

    } else if (userName && userLastName && userAge && userEmail && phoneNumber) {

        let arrWithallUserInfo = [{
            name: userName,
            lastname: userLastName,
            age: userAge,
            useremail: userEmail,
            phonenumber: phoneNumber,
            img: localStorage.getItem('recent-image')
        }]

        localStorage.setItem('userData', JSON.stringify(arrWithallUserInfo));

        showUserData()

    }

}
getUserData()

const showImg = (event) => {

    let input = event.target;

    const reader = new FileReader();

    reader.addEventListener('load', () => {

        localStorage.setItem('recent-image', reader.result);

    })

    reader.readAsDataURL(input.files[0]);
}


const changeData = () => {

    localStorage.removeItem('userData');
    localStorage.removeItem('recent-image');

    window.location.replace("my-profile.html");

}