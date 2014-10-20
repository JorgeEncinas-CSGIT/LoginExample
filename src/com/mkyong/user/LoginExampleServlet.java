package com.mkyong.user;

import java.io.IOException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



import java.nio.charset.StandardCharsets;
import java.nio.charset.Charset;
import java.util.logging.Logger;

import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;


@SuppressWarnings("serial")
public class LoginExampleServlet extends HttpServlet 
{
	private static final Logger log = Logger.getLogger(LoginExampleServlet.class.getName()); 
	/*log.info("Ciok information log message");
	log.warning("Ciok warning log message");
	log.severe("Ciok severe log message"); 
	*/
	
	
	public void doGet(HttpServletRequest req, HttpServletResponse resp)	throws IOException 
	{
		/*LogQuery query = LogQuery.Builder.withDefaults();
		query.includeAppLogs(true);
		query.offset("Se llamo correctamente el metodo doGet +++++++++++++++++++++++++++++++++++++++++++++++++++");
		*/
		
		System.out.println("doGet \n");
		
		log.severe("doGet \n");
		
		log.warning("RequestURI 		="+req.getRequestURI());
		
		UserService userService = UserServiceFactory.getUserService();
		
		if(userService.isUserLoggedIn())
		{
			System.out.println("	= UserLoggedIn =\n");			
			User ciok = userService.getCurrentUser();
			 
			if(ciok.getEmail().indexOf("csgit.com") != -1) 
			{
				System.out.println("		>> DOMINIO CSGIT <<\n");
				log.warning("		>> DOMINIO CSGIT <<\n"); 
			}

			
			System.out.println("ciok.getAuthDomain()		="+ciok.getAuthDomain()); 
			System.out.println("ciok.getEmail()			="+ciok.getEmail()); 
			System.out.println("ciok.getFederatedIdentity() 	="+ciok.getFederatedIdentity()); 
			System.out.println("ciok.getNickname()		="+ciok.getNickname()); 
			System.out.println("ciok.getUserId() 		="+ciok.getUserId()); 
			System.out.println("ciok.hashCode() 		="+ciok.hashCode());		
			
			log.warning("ciok.getAuthDomain()		="+ciok.getAuthDomain()); 
			log.warning("ciok.getEmail()		="+ciok.getEmail()); 
			log.warning("ciok.getFederatedIdentity() 	="+ciok.getFederatedIdentity()); 
			log.warning("ciok.getNickname()		="+ciok.getNickname()); 
			log.warning("ciok.getUserId() 		="+ciok.getUserId()); 
			log.warning("ciok.hashCode() 		="+ciok.hashCode());
			
		}

		
		User user = userService.getCurrentUser();

		resp.setContentType("text/html");
		resp.getWriter().println("<h2>GAE - Integrating Google user account</h2>");
		
		if (user != null) 
		{
			resp.getWriter().println("Welcome,  " + user.getNickname());
			resp.getWriter().println("<a href='"+ userService.createLogoutURL(req.getRequestURI())+"'>  LogOut </a>");
			
		} 
		else 
		{
			//resp.getWriter().println("Please <a href='"+userService.createLoginURL(req.getRequestURI())+"'> LogIn </a>");
			//resp.getWriter().println("\n\nEntrar <a href='"+userService.createLoginURL(req.getRequestURI(), "csgit.com.mx")+"'> CSGIT </a>");
			
			resp.getWriter().println("\n\nEntrar <a href='"+userService.createLoginURL(req.getRequestURI())+"'> CSGIT </a>");
			
			
		}
	}
	
	
	
}
