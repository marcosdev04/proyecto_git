


function login(){
     var email =  $("#usuario").val();
     var password =  $("#contrasena").val();

     var data = {
          
          email: email,
          password: password
     }
      
     fetch("http://68.183.27.173:8080/login", {
          method: 'POST', // or 'PUT',
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .then(response => {
          const datos = JSON.stringify(response);

         if(datos.length>0){
          localStorage.setItem('Datos',datos);
          location.href="post_list.html";
         }
               
        })
        .catch(error => console.error('Error:', error));
}

$(document).ready(function(){
     $("#btn").click(function(){
          login();
     });
});