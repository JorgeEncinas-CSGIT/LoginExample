
/*
   * Activado cuando el usuario acepta el inicio de sesiÃ³n, cancela o cierra el
   * cuadro de diÃ¡logo de autorizaciÃ³n.
   
   * Inicia la solicitud del punto final userinfo para obtener la direccion de correo electronico del
   * usuario. Esta funcion se basa en gapi.auth.setToken que contiene un token
   * de acceso de OAuth valido.
   *
   * Cuando se completa la solicitud, se activa getEmailCallback y recibe
   * el resultado de la solicitud.
   */

function signinCallback(authResult) 
  {
    if (authResult) 
    {
    	if (authResult['error'] == undefined)
	    {
    		confirm("Token recuperado");
	        gapi.auth.setToken(authResult); // Almacena el token recuperado.
	        //toggleElement("signinButton"); // Oculta el inicio de sesion si se ha accedido correctamente.
	        getEmail();                    // Activa la solicitud para obtener la direcciÃ³n de correo electrÃ³nico.
	        //confirm("undefined");
	    } 
	    else 
	    {
	    	alert("Intentarlo Nuevamente");
	    	console.log('An error occurred');
	    }
    } 
    else
    {
    	alert("Empty authResult");
      	console.log('Empty authResult');  // Se ha producido algun error
    }
  }


function getEmail()
{
	// Carga las bibliotecas oauth2 para habilitar los metodos userinfo.
	gapi.client.load('oauth2', 'v2', function() 
 	{
		var request = gapi.client.oauth2.userinfo.get();
		request.execute(getEmailCallback);
		//llamaServlet();
 	});
}

function llamaServlet()
{
	  alert("llamaServlet ");
}

function getEmailCallback(obj)
{
	//var el = document.getElementById('email');
    var email = '';

    if (obj['email']) 
    {
    	email = 'Email: ' + obj['email'];
    	alert("Email: "+email);
    }

    if (obj['hd']=="csgit.com.mx")
    {
    	confirm("DOMINIO CSGIT");
    	redireccionar();
    }
    
    console.log(obj);   // Sin comentario para inspeccionar el objeto completo.
    el.innerHTML = email;
    //toggleElement('email');
    
}

function toggleElement(id) 
{
	  alert("toggleElement "+id);
	  var el = document.getElementById(id);
	  
	  if (el.getAttribute('class') == 'hide') 
	  {
		  alert("is hided "+id);
		  el.setAttribute('class', 'show');
	  }
	  else 
	  {
		  alert("is showed "+id);
	      el.setAttribute('class', 'hide');
	  }
} 

function redireccionar() 
{
	//location.href="http://1-dot-iuyet-cao-csgit.appspot.com/views/PruebaProyecto.html"
	//location.href="https://www.google.com.mx/"
	
} 
