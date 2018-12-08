let idpostgeneral;

function cargarPosts(){
         
     let dato = JSON.parse(localStorage.getItem('Datos'));
     let token = dato.token;
    
     wsConnect(token);
    
     let Liposts =  document.querySelector('#postusers');
     Liposts.innerHTML="";


     fetch('http://68.183.27.173:8080/post',{
          method: 'GET', // or 'PUT'
         // body: JSON.stringify(data), // data can be string or {object}!
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
     }).then(res => res.json())
       .then(response => {
            let respuesta = JSON.stringify(response);
            
            response.forEach(post => {
                let {id,title, tags,userEmail,userName,createdAt,likes,body,views,comments,liked,userId}=post;                                       
               idpostgeneral = id;
          Liposts.innerHTML += `
          <div class="card text-center">
               <div class="card-header">
                    <span class="float-left">${title} <a href="post_ditail.html" class="openbutton" id="detallepost" alt="${id}" ><img src="assets/img/openbutton.png" class="size"></a> </span><span class="float-right">${tags}</span>                   
               </div>
               <div class="card-body">
                    
                    <p class="card-text text-justify">${body}</p>
                   
               </div>
               <div class="card-footer text-muted">
                    <span class="float-left"><a href="user_info.html" id="userinf" alt3="${userId}">${userEmail} | ${userName} </a>--- ${fecha = new Date(createdAt).toLocaleDateString()}</span>
                    <span class="float-right"><span class="comments"><img src="assets/img/comments.png" class="size">${comments}</span><img src="assets/img/views.png" class="size"> <span class="imgviews">${views}</span><i class="${(liked) ? "fas fa-star" : "far fa-star"}"  id="articulo-like-${id}" alt="${(liked) ? 0 : 1}" alt2="${id}"></i>${likes}</span>
               </div>
          </div> <br>
          `;
        })
     }).catch(error => console.log('Se ha presentado el siguiente error: ',error));
     
}

function actulikes(id,liked){
     console.log(liked);
     
     let dato = JSON.parse(localStorage.getItem('Datos'));
     let token = dato.token;

     fetch(`http://68.183.27.173:8080/post/${id}/like`, {
          method: (liked) ? 'PUT' : 'DELETE', // or 'PUT',         
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(function(e) {
          // location.href="post_list.html";
         
        })
        .catch(error => console.error('Error:', error));
     
}

$(document).ready(function(){
     
      if(localStorage.getItem('Datos') !== null){    
          cargarPosts();

         // DETECTAR EL BOTON PARA VER LOS DETALLES DEL POST
         //-----------------------------------------------------
         $(document).on('click','#detallepost',function(e){
             localStorage.setItem('idpost',$(this).attr('alt'));            
         });

          // DETECTAR BOTON PARA VER INFORMACION DEL USUARIO
          //---------------------------------------------------------
          $(document).on('click','#userinf',function(e){
               localStorage.setItem('userif',$(this).attr('alt3'));
          });

         // DETECTAR EL LIKE Y DISLIKE DEL BOTON LIKE
         //----------------------------------------------------
         $(document).on('click','#articulo-like-'+idpostgeneral,function(e){
    
          var metodo = "";
          var idpost = $(this).attr('alt2');

          if($(this).attr('alt') == 0){
               $(this).attr('alt','1');
               $(this).removeClass("far fa-star");
               $(this).addClass("fas fa-star");
               metodo= "PUT";
          }else{
               $(this).attr('alt','0');
               $(this).removeClass("fas fa-star");
               $(this).addClass("far fa-star");
               metodo= "DELETE";
          }  
          
          let dato = JSON.parse(localStorage.getItem('Datos'));
          let token = dato.token;

          fetch(`http://68.183.27.173:8080/post/${idpost}/like`, {
               method: metodo, // or 'PUT',         
               headers:{
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
               }
          })
          .then(function(e) {
               
          }).catch(error => console.error('Error:', error));       
     });

     }else{
          location.href="login.html";
     }
      
});


