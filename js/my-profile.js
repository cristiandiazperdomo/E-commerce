const showUserData = (arrayInfoUser) => {

	let myProfileZone = '';

	for(let arrayInfo of arrayInfoUser) {
	
        myProfileZone += `
       <div class="d-flex flex-column  align-items-center" id="showUserImg">
            <img src="`+ arrayInfo.img + `" class="img-thumbnail"></img>
       </div>
            <div class="d-inline">

                </br>
            	<div class="col">
            		<p class="mb-1 "><p class="text-muted">Nombres:</p>		  		`+ arrayInfo.name +`</p>
            	</div>
                    
            	<div class="col ">
            		<p class="mb-1"><p class="text-muted">Apellidos:</p>		    `+ arrayInfo.lastname +`</p>
            	</div>
                    
            	<div class="col">
            		<p class="mb-1"><p class="text-muted">Edad:</p>			  	    `+ arrayInfo.age +` años</p>
            	</div>
                    
            	<div class="col">
            		<p class="mb-1"><p class="text-muted">Email:</p>            	`+ arrayInfo.useremail +`</p>
        		</div>

        		<button class="btn btn-primary mb-2" id="changeData" onclick="changeData()" >Cambiar datos</button>
        	</div>
        	
        `
    document.querySelector('.myProfileData').innerHTML = myProfileZone;
		}
    
}
const getUserData = () => {

	const userName  = document.getElementById('myProfileData__name').value
    const userLastName  = document.getElementById('myProfileData__lastname').value
    const userAge  = document.getElementById('myProfileData__age').value
    const userEmail = document.getElementById('myProfileData__email').value

    let allUserInfo = JSON.parse(localStorage.getItem('userData'))

    let arrWithallUserInfo = [];

    if (allUserInfo) {
            
    	showUserData(JSON.parse(localStorage.getItem('userData')))


    }

    else if (userName && userLastName && userAge && userEmail) {


        

        let arrWithallUserInfo = [{name:userName,lastname:userLastName,age:userAge,useremail:userEmail,img:localStorage.getItem('recent-image')}] 
        
    	let setUserData = JSON.stringify(arrWithallUserInfo);
    		
    	localStorage.setItem('userData', setUserData);

    	showUserData(JSON.parse(localStorage.getItem('userData')));
        
    }
    
}
getUserData()
//------------


const idontKnow = (event) =>{

    var input = event.target;

            const reader = new FileReader();

            reader.addEventListener('load', () => {
                let dataUrl = reader.result

                console.log(dataUrl)
                localStorage.setItem('recent-image', dataUrl );


                const recentImageData = localStorage.getItem('recent-image');
    
            })

            reader.readAsDataURL(input.files[0]);
}

/*
document.getElementById('myProfileImg').addEventListener('change', function(){

    

            const reader = new FileReader();

            reader.addEventListener('load', () => {
                localStorage.setItem('recent-image', reader.result);


                const recentImageData = localStorage.getItem('recent-image');
                console.log(recentImageData)
                let data = ""

                data += `<img src="`+ recentImageData +`">`


                document.getElementById('showUserImg').innerHTML = data;

            })

            reader.readAsDataURL(this.files[0]);
});
*/


const changeData = () => {

	localStorage.removeItem('userData');
    localStorage.removeItem('recent-image');


	window.location.replace("my-profile.html");

}

