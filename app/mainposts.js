
let idpostgeneral;

let dato = JSON.parse(localStorage.getItem('Datos'));
let token = dato.token;

function cargarPosts(){
         
   
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
                    <span class="float-right"><span class="comments"><i class="fas fa-comment"><span id="comment-${id}">${comments}</span></i></span><img src="assets/img/views.png" class="size"> <span class="imgviews" id="view-${id}">${views}</span><span><i class="${(liked) ? "fas fa-star" : "far fa-star"}" onclick="like(${id})" id="articulo-like-${id}" data-liked="${liked}"></i><span  id="likes-${id}">${likes}</span></span>
               </div>
          </div> <br>
          `;
        })
     }).catch(error => console.log('Se ha presentado el siguiente error: ',error));
     
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

     }else{
          location.href="login.html";
     }
      
});


function like(id){


     var liked = $(`#articulo-like-${id}`).data("liked");
    
     console.log(liked);


     fetch(`http://68.183.27.173:8080/post/${id}/like`, {
          method: liked ? 'DELETE' : 'PUT', // or 'PUT',         
          headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          }
     })
     .then(function(e) {
          $(`#articulo-like-${id}`).removeClass(liked ? 'fas': 'far').addClass(liked ? 'far': 'fas');
          $(`#articulo-like-${id}`).data("liked", !liked);
           
     }).catch(error => console.error('Error:', error));       
}

