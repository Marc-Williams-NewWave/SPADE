package com.nwt.spade.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.nwt.spade.devops.Builds;
import com.nwt.spade.devops.CheckinChart;
import com.nwt.spade.devops.Contributor;
import com.nwt.spade.devops.IssueChart;
import com.nwt.spade.devops.Releases;
import com.nwt.spade.domain.DevOpsProject;
import com.nwt.spade.repository.DevOpsProjectRepository;
import com.nwt.spade.service.DevOpsProjectService;
import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.inject.Inject;
import java.util.*;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/spade/api/devops")
public class DevOpsFunctionsResource {

    private final Logger log = LoggerFactory.getLogger(DevOpsFunctionsResource.class);

    @Inject
    private DevOpsProjectService projectService;
    
    @Inject
    private DevOpsProjectRepository projectsRepository;
    
    /**
     * GET  /rest/activate -> activate the registered user.
     */
    @RequestMapping(value = "/contributor",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public Contributor[] contribuotors(@RequestParam(value = "name") String name) {
    	Contributor[] project = projectService.findAllcontributors(name);
    	    
    	
    	
		return project;
      
    	
    }
    
    /**
     * GET  /rest/activate -> activate the registered user.
     */
    @RequestMapping(value = "/builds",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Builds> builds(@RequestParam(value = "name") String name) {
       log.debug("Project name: " + name);
    	List<Builds> builds=projectService.insertBuildInformation(name);

    	    
    	
    	
		return builds;
      
    	
    }
    
    
    @RequestMapping(value = "/listProjects",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<DevOpsProject> listProjects() {
       
         List<DevOpsProject> projects = projectsRepository.findAll();

    	    
    	
    	
		return projects;
      
    	
    }
    
    
    
    /**
     * GET  /rest/activate -> activate the registered user.
     */
    @RequestMapping(value = "/issues",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<IssueChart> issues(@RequestParam(value = "name") String name) {
       
    	List<IssueChart> issues=projectService.getIssues(name);

    	    
    	
    	
		return issues;
      
    	
    }
    
    /**
     * GET  /rest/activate -> activate the registered user.
     */
    @RequestMapping(value = "/checkin",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<CheckinChart> checkins(@RequestParam(value = "name") String name) {
       
    	List<CheckinChart> checkin=projectService.findAllCheckins(name);

    	    
    	
    	
		return checkin;
      
    	
    }
    
    /**
     * GET  /rest/activate -> activate the registered user.
     */
    @RequestMapping(value = "/releases",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public Releases[] releases() {
    	
    	String plainCreds = "nwt-buildserver:NWT91life";
		byte[] plainCredsBytes = plainCreds.getBytes();
		byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
		String base64Creds = new String(base64CredsBytes);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Basic " + base64Creds);

    RestTemplate restTemplate = new RestTemplate();
    
    HttpEntity<String> request = new HttpEntity<String>(headers);
    ResponseEntity<Releases[]> response = restTemplate.exchange("https://api.github.com/repos/newwavetechnologies/depot-dev-cmsEppe/releases", HttpMethod.GET, request, Releases[].class);
    Releases[] account = response.getBody();
   
    
    System.out.println(account);
    
		return account;
      
    	
    }
}
