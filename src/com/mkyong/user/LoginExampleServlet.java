package com.mkyong.user;

import java.io.IOException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.nio.charset.Charset;
import com.google.appengine.api.users.User;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

@SuppressWarnings("serial")
public class LoginExampleServlet extends HttpServlet 
{
	public void doGet(HttpServletRequest req, HttpServletResponse resp)	throws IOException 
	{
		System.out.println("doGet \n");
		
		UserService userService = UserServiceFactory.getUserService();
		
		if(userService.isUserLoggedIn())
		{
			System.out.println("	= UserLoggedIn =\n");
			User ciok = userService.getCurrentUser();
			System.out.println("ciok.getAuthDomain()		="+ciok.getAuthDomain()); 
			System.out.println("ciok.getEmail()			="+ciok.getEmail()); 
			System.out.println("ciok.getFederatedIdentity() 	="+ciok.getFederatedIdentity()); 
			System.out.println("ciok.getNickname()		="+ciok.getNickname()); 
			System.out.println("ciok.getUserId() 		="+ciok.getUserId()); 
			System.out.println("ciok.hashCode() 		="+ciok.hashCode()); 	
		}

		
		User user = userService.getCurrentUser();

		resp.setContentType("text/html");
		resp.getWriter().println("<h2>GAE - Integrating Google user account</h2>");
		
		if (user != null) 
		{
			resp.getWriter().println("Welcome,  " + user.getNickname());
			//resp.getWriter().println("Welcome Ciok");
			resp.getWriter().println("<a href='"+ userService.createLogoutURL(req.getRequestURI())+"'>  LogOut </a>");
		} 
		else 
		{
			//resp.getWriter().println("Please <a href='"+userService.createLoginURL(req.getRequestURI())+"'> LogIn </a>");
			resp.getWriter().println("\n\nEntrar <a href='"+userService.createLoginURL(req.getRequestURI(), "csgit.com.mx")+"'> CSGIT </a>");

		}
	}
}
