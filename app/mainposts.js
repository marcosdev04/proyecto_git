function cargarPosts(){
     
    
     let Liposts =  document.querySelector('#postusers');
     Liposts.innerHTML="";
     
     let dato = JSON.parse(localStorage.getItem('Datos'));
     let token = dato.token;

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
                let {id,title, tags,userEmail,userName,createdAt,likes,body,views,comments,liked}=post;
                 
                 
               Liposts.innerHTML +=`
               <div class="row border">
                    <div class="col-8">
                         <p>${title} <a href="post_ditail.html" class="openbutton"><img src="assets/img/openbutton.png" class="size"></a></p>
                    </div>   
                    <div class="col-4">
                         <p>${tags}</p>
                    </div>     
                    <div class="w-100"></div>
                    <div class="col-lg-12" style="background-color:#bbb">
                         <p><a href="user_info.html">${userEmail} | ${userName} </a>--- ${fecha = new Date(createdAt).toLocaleDateString()}</p>                        
                    </div>    
                    <div class="w-100"></div>
                    <div class="col-lg-10">
                         <p>${String(body).substring(0,100)}</p>
                    </div>
                    <div class="w-100"></div>
                    <div class="col-lg-12 justify-self-end prueba">
                    <p class="text-right"><span class="comments"><img src="assets/img/comments.png" class="size">${comments}</span><img src="assets/img/views.png" class="size"> <span class="imgviews">${views}</span><button onclick="actulikes(${id},${liked})"></i><i class="${(liked) ? "far fa-star" : "fas fa-star"}"></i></button>${likes}</p>
                    </div>                    
               </div>
               <br>
          `;
        })
     }).catch(error => console.log('Se ha presentado el siguiente error: ',error));
     
}

function actulikes(id,liked){
     console.log(liked);
     
     let dato = JSON.parse(localStorage.getItem('Datos'));
     let token = dato.token;

     fetch(`http://68.183.27.173:8080/post/${id}/like`, {
          method: (liked == true) ? 'DELETE' : 'PUT', // or 'PUT',         
          headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })
        .then(function(e) {
          // location.href="post_list.html";
          cargarPosts();
        })
        .catch(error => console.error('Error:', error));
     
}

$(document).ready(function(){
         cargarPosts();
});