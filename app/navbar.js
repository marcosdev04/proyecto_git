
function cargarmenu(){

     let navbar = document.querySelector('#navbar');

     navbar.innerHTML = `
     <nav class="navbar navbar-expand-lg navbar-light bg-light">
                         <a class="navbar-brand" href="post_list.html">Posts</a>
                         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                           <span class="navbar-toggler-icon"></span>
                         </button>
                         <div class="collapse navbar-collapse" id="navbarNav">
                           <ul class="navbar-nav">
                             <li class="nav-item active">
                               <a class="nav-link" href="crear_post.html">Crear <span class="sr-only">(current)</span></a>
                             </li>     
                             <li class="nav-item active">
                                   <a class="nav-link" href="login.html" id="logout">Logout <span class="sr-only">(current)</span></a>
                                 </li>                           
                           </ul>
                         </div>
                       </nav>
     `;
}


$(document).ready(function(){
     cargarmenu();
     // LIMPIAR LOCALSTORAGE AL CERRAR SESSION

     $(document).on('click','#logout',function(e){
        localStorage.clear();
     });
});
