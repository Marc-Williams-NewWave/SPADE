package com.nwt.spade.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.nwt.spade.devops.Contributor;
import com.nwt.spade.domain.DevOpsProject;
import com.nwt.spade.repository.DevOpsProjectRepository;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import javax.inject.Inject;

import java.util.List;

/**
 * REST controller for managing Projects.
 */
@RestController
@RequestMapping("/spade/api/devops")
public class DevOpsProjectResource {

    private final Logger log = LoggerFactory.getLogger(DevOpsProjectResource.class);

    @Inject
    private DevOpsProjectRepository projectsRepository;

    /**
     * POST  /rest/projectss -> Create a new projects.
     */
    @RequestMapping(value = "/projects",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void create(@RequestBody DevOpsProject projects) {
        log.debug("REST request to save Projects : {}", projects);
        projectsRepository.save(projects);
    }

    /**
     * GET  /rest/projectss -> get all the projectss.
     */
    @RequestMapping(value = "/projects",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<DevOpsProject> getAll() {
        log.debug("REST request to get all Projectss");
        return projectsRepository.findAll();
    }

    /**
     * GET  /rest/projectss/:id -> get the "id" projects.
     */
    @RequestMapping(value = "/projects/{id}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<DevOpsProject> get(@PathVariable String id) {
        log.debug("REST request to get Projects : {}", id);
        DevOpsProject projects = projectsRepository.findOne(id);
        if (projects == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(projects, HttpStatus.OK);
    }

    /**
     * DELETE  /rest/projectss/:id -> delete the "id" projects.
     */
    @RequestMapping(value = "/projects/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public void delete(@PathVariable String id) {
        log.debug("REST request to delete Projects : {}", id);
        projectsRepository.delete(id);
    }
    
    
    /**
     * Get the list of Contributors
     * 
     */
//    @RequestMapping(value = "/rest/contributor",
//            method = RequestMethod.GET,
//            produces = MediaType.APPLICATION_JSON_VALUE)
//    @Timed
//    public Contributor[] contribuotors() {
//    	
//    	String plainCreds = "nwt-buildserver:NWT91life";
//		byte[] plainCredsBytes = plainCreds.getBytes();
//		byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
//		String base64Creds = new String(base64CredsBytes);
//		HttpHeaders headers = new HttpHeaders();
//		headers.add("Authorization", "Basic " + base64Creds);
//
//        RestTemplate restTemplate = new RestTemplate();
//    
//    HttpEntity<String> request = new HttpEntity<String>(headers);
//    ResponseEntity<Contributor[]> response = restTemplate.exchange("https://api.github.com/repos/newwavetechnologies/depot-dev-cmsEppe/stats/contributors", HttpMethod.GET, request, Contributor[].class);
//    Contributor[] account = response.getBody();
//   
//    
//    System.out.println(account);
//    
//		return account;
//      
//    	
//    }
    
    
    /*
     * Get the List of releases
     * 
     */
    
    
    /**
     * Get the list of check-ins
     * 
     */
    
    
    
    /**
     * Get the list of Errors
     */
    
    
    
}
