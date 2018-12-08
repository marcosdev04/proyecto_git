function crearPost(){ 
     let createpost =  document.querySelector('#crearpost');

     createpost.innerHTML = `
               
     <div>  
          <form role="form">
          <br>
                         <h3>Crear Post</h3>
                         <div class="form-group">
                                   <input type="text" class="form-control" id="title" name="title" placeholder="Titulo del post" required>
                         </div>
                         
                         <div class="form-group">
                                   <input type="text" class="form-control" id="tags" name="email" placeholder="Tags (separar por ',') " required>
                              </div>

                         <div class="form-group">
                              <textarea class="form-control" type="textarea" id="body" placeholder="Cuerpo del post" maxlength="140" rows="7" required></textarea>
                         </div>
          <button type="button" id="submit" name="submit" class="btn btn-primary pull-right">Crear Post</button>
          </form>
     </div>
     

`;     
}


function listarMisPost(){

     let Liposts =  document.querySelector('#mispost');
     Liposts.innerHTML="";
     
     
  
     let dato = JSON.parse(localStorage.getItem('Datos'));
     let userId = dato.id;
     let token = dato.token;


     fetch('http://68.183.27.173:8080/post?userId='+userId,{
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
                    <span class="float-right"><span class="comments"><img src="assets/img/comments.png" class="size">${comments}</span><img src="assets/img/views.png" class="size"> <span class="imgviews">${views}</span><i class="${(liked) ? "fas fa-star" : "far fa-star"} btn btn-outline-warning"  id="like_button" alt="${(liked) ? 0 : 1}" alt2="${id}"></i>${likes}</span>
               </div>
          </div> <br>
          `;
        })
     }).catch(error => console.log('Se ha presentado el siguiente error: ',error));


}

function enviardatos(){
    
     let dato = JSON.parse(localStorage.getItem('Datos'));
     let token = dato.token;


     var userId = dato.id;
     var userName = dato.name;
     var userEmail = dato.email;

     var title =  $("#title").val();
     var body = $("#body").val();
     var tags =  $("#tags").val().split(",");
     
     console.log(tags);

     var data = {
          
          userId: userId,
          userName: userName,
          userEmail: userEmail,
          title: title,
          body: body,
          tags: tags,
     }

     fetch('http://68.183.27.173:8080/post/',{
          method: 'POST', // or 'PUT'
          body: JSON.stringify(data), // data can be string or {object}!
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`    
          }
     }).then(res => res.json())
       .then(response => {                                           

          listarMisPost();     
       
     }).catch(error => console.log('Se ha presentado el siguiente error: ',error));
}

$(document).ready(function(){
     crearPost();
     listarMisPost();
     
     $(document).on("click","#submit",function(e){
          enviardatos();       
     });
});