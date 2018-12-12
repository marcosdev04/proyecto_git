let idpost2;
 
let dato = JSON.parse(localStorage.getItem('Datos'));
let token = dato.token;


function cargarPosts(){
     
     wsConnect(token);
    
     let Liposts =  document.querySelector('#dt_post');
     Liposts.innerHTML="";
    
     var idpost = localStorage.getItem('idpost');

     fetch('http://68.183.27.173:8080/post/'+idpost,{
          method: 'GET', // or 'PUT'
         // body: JSON.stringify(data), // data can be string or {object}!
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
     }).then(res => res.json())
       .then(response => {            
          
                let {id,title, tags,userEmail,userName,createdAt,likes,body,views,comments,liked}=response;
                 idpost2 = id;

          //   NUEVO FORMATO DE POST

          Liposts.innerHTML = `
          <div class="card text-center">
               <div class="card-header">
                    <span class="float-left">${title} <a href="post_ditail.html" class="openbutton" id="detallepost" alt="${id}" ><img src="assets/img/openbutton.png" class="size"></a> </span><span class="float-right">${tags}</span>
                   
               </div>
               <div class="card-body">
                    
                    <p class="card-text text-justify">${body}</p>
                   
               </div>
               <div class="card-footer text-muted">
                    <span class="float-left"><a href="user_info.html">${userEmail} | ${userName} </a>--- ${fecha = new Date(createdAt).toLocaleDateString()}</span>
                    <span class="float-right"><span class="comments"><i class="far fa-comment-alt"><span id="comment-${id}">${comments}</span></i></span><img src="assets/img/views.png" class="size"> <span class="imgviews" id="view-${id}">${views}</span><span><i class="${(liked) ? "fas fa-star" : "far fa-star"}" onclick="like(${id})" id="articulo-like-${id}" data-liked="${liked}"></i><span  id="likes-${id}">${likes}</span></span>
               </div>
          </div> <br>
          <div class="card">
               <h5 class="card-header">Agregar comentario</h5>
               <div class="card-body">
                    <div class="col-12">
                         <input type="text" id="newcomment" class="form-control" placeholder="agregar su comentario aqui." required></input>
                    </div>
               
               </div>
               <input typ="button" id="btncomment" class="btn btn-primary" value="Agregar comentario">
          </div>  
          `;

       
     }).catch(error => console.log('Se ha presentado el siguiente error: ',error));
     
}




function cargarComentarios(){
       
     let Liposts =  document.querySelector('#comentarios');
     Liposts.innerHTML="";
     
     let dato = JSON.parse(localStorage.getItem('Datos'));
     let token = dato.token;

     fetch('http://68.183.27.173:8080/post/'+ localStorage.getItem('idpost') + "/comment",{
          method: 'GET', // or 'PUT'
         // body: JSON.stringify(data), // data can be string or {object}!
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
     }).then(res => res.json())
       .then(response => {           

            response.forEach(comen => {
                let {body,
                createdAt,
                id,
                postId,
                userEmail,userId,userName}=comen;
                 
                 
               Liposts.innerHTML +=`
               <div class="card">
                    <div class="card-header">
                    ${userName}
               </div>
               <div class="card-body">
               <blockquote class="blockquote mb-0">
                    <p>${body}</p>
                    <footer class="blockquote-footer">Fecha :  <cite title="Source Title">${fecha = new Date(createdAt).toLocaleDateString()}</cite></footer>
               </blockquote>
               </div>
               </div><br>  
          `;
        });
     }).catch(error => console.log('Se ha presentado el siguiente error: ',error));
}

// LIKE  - UNLIKE


$(document).ready(function(){
     cargarPosts();
     cargarComentarios();
     // $(document).on('click','#like_button',function(e){
    
     // var metodo = "";
     // var idpost = $(this).attr('alt2');

     //      if($(this).attr('alt') == 0){
     //           $(this).attr('alt','1');
     //           $(this).removeClass("far fa-star");
     //           $(this).addClass("fas fa-star");
     //           metodo= "PUT";
     //      }else{
     //           $(this).attr('alt','0');
     //           $(this).removeClass("fas fa-star");
     //           $(this).addClass("far fa-star");
     //           metodo= "DELETE";
     //      }  
          
     //      let dato = JSON.parse(localStorage.getItem('Datos'));
     //      let token = dato.token;

     //      fetch(`http://68.183.27.173:8080/post/${idpost}/like`, {
     //           method: metodo, // or 'PUT',         
     //           headers:{
     //           'Content-Type': 'application/json',
     //           'Authorization': `Bearer ${token}`
     //           }
     //      })
     //      .then(function(e) {
     //           // location.href="post_list.html";
          
     //      })
     //      .catch(error => console.error('Error:', error));
     //  });

      // BOTON COMENTAR

      $(document).on('click','#btncomment',function(e){
          var comentario =  $("#newcomment").val();

         
          var data = {
               body: comentario
          };


          fetch(`http://68.183.27.173:8080/post/${idpost2}/comment`,{
               method: 'POST',
               body: JSON.stringify(data),
               headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
               }
          }).then(res => res.json())
          .then(response =>{
               cargarComentarios();
          }).catch(error => console.log('Se ha presentado el siguiente error: ',error));

      });

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

