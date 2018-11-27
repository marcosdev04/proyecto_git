function cargarPosts(){
    
     let Liposts =  document.querySelector('#postusers');
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
                let {title, tags,userEmail,userName,createdAt,likes,body,views,comments}=post;
                 console.log(post);
                 
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
            <p class="text-right"><span class="comments"><img src="assets/img/comments.png" class="size">${comments}</span><img src="assets/img/views.png" class="size"> <span class="imgviews">${views}</span><a href="#" id="liked"><img src="assets/img/estrella.png" class="lik size"></a>${likes}</img></p>
                    </div>
               </div>
               <br>
          `;
        })
     }).catch(error => console.log('Se ha presentado el siguiente error: ',error));
     
}



$(document).ready(function(){
         cargarPosts();
});