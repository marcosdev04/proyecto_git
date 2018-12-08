function cargarUser(){
     
    usinfo
     let cardusinfo =  document.querySelector('#usinfo');
     cardusinfo.innerHTML="";
     
     let dato = JSON.parse(localStorage.getItem('Datos'));
     let token = dato.token;
     let iduser = localStorage.getItem('userif');

     fetch('http://68.183.27.173:8080/users/'+iduser,{
          method: 'GET', // or 'PUT'
         // body: JSON.stringify(data), // data can be string or {object}!
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
     }).then(res => res.json())
       .then(response => {            
          console.log(response);
          let {id,name,email,posts,createdAt}=response;
                 

          //   NUEVO FORMATO DE POST

          cardusinfo.innerHTML = `
               <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="assets/img/user_info.png" alt="Card image cap">
                    <div class="card-body">
                         <p class="card-title">Nombre: <b>${name} </b></p>
                         <p class="card-text"> Id: <b> ${id}</b><p>
                          <p class="card-text">Correo: <b>${email}</b></p>
                         <p class="card-text">Total de posts: <b>${posts}</b></p>         
                         <span class="float-left">Activo desde: <b>${fecha = new Date(createdAt).toLocaleDateString()}</span>                
                    </div>
                    
               </div>
          `;
  
       
     }).catch(error => console.log('Se ha presentado el siguiente error: ',error));
     
}



$(document).ready(function(){
     cargarUser();
});