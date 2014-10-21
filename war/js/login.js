
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
var aToken;

function signinCallback(authResult) 
  {
    if (authResult) 
    {
    	console.log('Valor= '+authResult['error']);
  		console.log(authResult);
    	if (authResult['error'] == undefined)
	    {
    		confirm("Token recuperado");
    		console.log('Token recuperado');
      		aToken = authResult['access_token'] //valor del token
      		
	        gapi.auth.setToken(authResult); // Almacena el token recuperado.
	        //toggleElement("signinButton"); // Oculta el inicio de sesion si se ha accedido correctamente.
	        getEmail();                    // Activa la solicitud para obtener la direcciÃ³n de correo electrÃ³nico.
	        //confirm("undefined");
	    }
    	if (authResult['error'] == 'user_signed_out') //if (authResult['access_token'])
      	{
      		//alert("user_signed_out");
      		console.log('authResult= user_signed_out');
      		location.href="https://mail.google.com/mail/u/0/?logout&hl=en"
      		//location.href="https://www.google.com.mx/"
      		
      	}
	    else 
	    {
	    	//alert("Intentarlo Nuevamente");
	    	console.log('Intentarlo Nuevamente');
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
 	});
}

function getEmailCallback(obj)
{
	//var el = document.getElementById('email');
    var email = '';
    console.log('ENTRA getEmailCallback '+obj['email']);
    
    /*if (obj['email']) 
    {
    	email = 'Email: ' + obj['email'];
    	//console.log(email);
    	//alert("Email: "+email);
    }*/

    if (obj['hd']=="csgit.com.mx")
    {
    	confirm("DOMINIO CSGIT");
    	redireccionar();
    }
    
    else
    {
    	confirm("Se requiere cuenta del dominio CSGIT");
    	disconnectUser(aToken);
    	aToken=null;
    }
    
    
    console.log(obj);   // Sin comentario para inspeccionar el objeto completo.
    //el.innerHTML = email;
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
	//location.href="https://www.google.com.mx/"
	//location.href="PruebaProyecto.html"
	var peticion = 'loginPlus';
		$.ajax({
			url : '/loginexample',
			type : 'post',
			data : {'objectJson' : JSON.stringify(peticion)},
			success: function(data){
				if(data=="ok")location.href="https://www.google.com.mx/"
			},
			error: function(jHR,e,throwsError){
				alert('error loginPlus');
			}		
	});	
} 

function disconnectUser(access_token) 
{
	//alert("Elimina autorizaciondel usuario "+access_token);
	
	alert("Entra a signOut el usuario "+access_token);
	gapi.auth.signOut();
	/*var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +access_token;
	
	// Realiza una solicitud GET asíncrona.
	$.ajax({
	    type: 'GET',
	    url: revokeUrl,
	    async: false,
	    contentType: "application/json",
	    dataType: 'jsonp',
	    success: function(nullResponse) {
	      //confirm("Usuario Desconectado");
	      location.href="https://mail.google.com/mail/u/0/?logout&hl=en"
	      //https://mail.google.com/mail/u/0/?logout&hl=en
	    },
	    error: function(e) {
	      console.log(e);
	      // https://plus.google.com/apps
	    }
	});*/
}
