package com.nwt.spade.controllers;

import java.util.Date;

import javax.inject.Inject;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonValue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nwt.spade.domain.Authority;
import com.nwt.spade.repository.AuthorityRepository;
import com.nwt.spade.service.UserService;

@Service
public class UserController {
	
private MongoDBController db;
	
	private static final Logger LOG = LoggerFactory
			.getLogger(UserController.class);

	@Inject
    private AuthorityRepository authorityRepository;
	
	@Inject
	private UserService userService;
	
	@Autowired
	public UserController(MongoDBController db){
		this.db = db;
	}
	
	public JsonObject updateUser(String payload){
		JsonObjectBuilder objBuild = Json.createObjectBuilder();
		objBuild.add("api", "v0.0.4");
		objBuild.add("time", new Date().getTime());
		objBuild.add("type", "UpdateUser");
		objBuild.add("items", db.updateUser(payload));
		return objBuild.build();
	}
	
	public JsonObject getUser(String username){
		JsonObjectBuilder objBuild = Json.createObjectBuilder();
		objBuild.add("api", "v0.0.4");
		objBuild.add("time", new Date().getTime());
		objBuild.add("type", "GetUser");
		objBuild.add("items", db.getUser(username));
		return objBuild.build();
	}
	
	public JsonObject deleteUser(String username){
		JsonObjectBuilder objBuild = Json.createObjectBuilder();
		objBuild.add("api", "v0.0.4");
		objBuild.add("time", new Date().getTime());
		objBuild.add("type", "DeleteUser");
		objBuild.add("items", db.deleteUser(username));
		return objBuild.build();
	}
	
	public JsonObject listAllUsers(){
		JsonObjectBuilder objBuild = Json.createObjectBuilder();
		objBuild.add("api", "v0.0.4");
		objBuild.add("time", new Date().getTime());
		objBuild.add("type", "ListUsers");
		objBuild.add("items", db.getAllUsers());
		return objBuild.build();
	}
	
	public JsonObject addRole(String role){
		JsonObjectBuilder objBuild = Json.createObjectBuilder();
		objBuild.add("api", "v0.0.4");
		objBuild.add("time", new Date().getTime());
		objBuild.add("type", "AddRole");
		
		Authority auth = new Authority();
		auth.setName(role);
		
		JsonArrayBuilder arrBuild = Json.createArrayBuilder();
		arrBuild.add((JsonValue) authorityRepository.save(auth));
		objBuild.add("items", arrBuild.build());
		return objBuild.build();
	}
	
	public JsonArray listAllRoles(){
		return db.getAllRoles();
	}
	
	public JsonArray listAllPermissions(){
		return db.getAllPermissions();
	}
}
