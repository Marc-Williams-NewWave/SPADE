package com.nwt.spade.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.nwt.spade.devops.Builds;
import com.nwt.spade.devops.CheckinChart;
import com.nwt.spade.devops.Contributor;
import com.nwt.spade.devops.IssueChart;
import com.nwt.spade.devops.Releases;
import com.nwt.spade.domain.Projects;
import com.nwt.spade.repository.ProjectsRepository;
import com.nwt.spade.service.DevOpsProjectService;
import com.nwt.spade.domain.Authority;
import com.nwt.spade.domain.PersistentToken;
import com.nwt.spade.domain.User;
import com.nwt.spade.repository.PersistentTokenRepository;
import com.nwt.spade.repository.UserRepository;
import com.nwt.spade.security.SecurityUtils;
import com.nwt.spade.service.MailService;
import com.nwt.spade.service.UserService;
import com.nwt.spade.web.rest.dto.UserDTO;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;
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
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.*;
import java.util.stream.Collectors;

/**
 * REST controller for managing the current user's account.
 */
@RestController
@RequestMapping("/api")
public class AccountResource {

    private final Logger log = LoggerFactory.getLogger(AccountResource.class);

    @Inject
    private UserRepository userRepository;

    @Inject
    private UserService userService;

    @Inject
    private PersistentTokenRepository persistentTokenRepository;

    @Inject
    private MailService mailService;
    
    @Inject
    private DevOpsProjectService projectService;
    
    @Inject
    private ProjectsRepository projectsRepository;
    
    /**
     * GET  /rest/activate -> activate the registered user.
     */
    @RequestMapping(value = "/rest/contributor",
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
    @RequestMapping(value = "/rest/builds",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Builds> builds(@RequestParam(value = "name") String name) {
       
    	List<Builds> builds=projectService.insertBuildInformation(name);

    	    
    	
    	
		return builds;
      
    	
    }
    
    
    @RequestMapping(value = "/rest/listProjects",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Projects> listProjects() {
       
         List<Projects> projects = projectsRepository.findAll();

    	    
    	
    	
		return projects;
      
    	
    }
    
    
    
    /**
     * GET  /rest/activate -> activate the registered user.
     */
    @RequestMapping(value = "/rest/issues",
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
    @RequestMapping(value = "/rest/checkin",
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
    @RequestMapping(value = "/rest/releases",
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
    

    /**
     * POST  /register -> register the user.
     */
    @RequestMapping(value = "/register",
            method = RequestMethod.POST,
            produces = MediaType.TEXT_PLAIN_VALUE)
    @Timed
    public ResponseEntity<?> registerAccount(@Valid @RequestBody UserDTO userDTO, HttpServletRequest request) {
    	// Need to find a way to connect my back-end projects with the DTO projects so that I can
    	// set a default project and keep track of them that way.
        return userRepository.findOneByLogin(userDTO.getLogin())
            .map(user -> new ResponseEntity<>("login already in use", HttpStatus.BAD_REQUEST))
            .orElseGet(() -> userRepository.findOneByEmail(userDTO.getEmail())
                .map(user -> new ResponseEntity<>("e-mail address already in use", HttpStatus.BAD_REQUEST))
                .orElseGet(() -> {
                    User user = userService.createUserInformation(userDTO.getLogin(), userDTO.getPassword(),
                    userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail().toLowerCase(),
                    userDTO.getLangKey(), userDTO.getDefaultProject());
                    String baseUrl = request.getScheme() + // "http"
                    "://" +                                // "://"
                    request.getServerName() +              // "myhost"
                    ":" +                                  // ":"
                    request.getServerPort();               // "80"

                    mailService.sendActivationEmail(user, baseUrl);
                    return new ResponseEntity<>(HttpStatus.CREATED);
                })
        );
    }
    /**
     * GET  /activate -> activate the registered user.
     */
    @RequestMapping(value = "/activate",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<String> activateAccount(@RequestParam(value = "key") String key) {
        return Optional.ofNullable(userService.activateRegistration(key))
            .map(user -> new ResponseEntity<String>(HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
    }

    /**
     * GET  /authenticate -> check if the user is authenticated, and return its login.
     */
    @RequestMapping(value = "/authenticate",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public String isAuthenticated(HttpServletRequest request) {
        log.debug("REST request to check if the current user is authenticated");
        return request.getRemoteUser();
    }

    /**
     * GET  /account -> get the current user.
     */
    @RequestMapping(value = "/account",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<UserDTO> getAccount() {
        return Optional.ofNullable(userService.getUserWithAuthorities())
            .map(user -> new ResponseEntity<>(
                new UserDTO(
                    user.getLogin(),
                    null,
                    user.getFirstName(),
                    user.getLastName(),
                    user.getEmail(),
                    user.getLangKey(),
                    user.getAuthorities().stream().map(Authority::getName).collect(Collectors.toList()),
                    user.getDefaultProject()),
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
    }

    /**
     * POST  /account -> update the current user information.
     */
    @RequestMapping(value = "/account",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<String> saveAccount(@RequestBody UserDTO userDTO) {
        return userRepository
            .findOneByLogin(userDTO.getLogin())
            .filter(u -> u.getLogin().equals(SecurityUtils.getCurrentLogin()))
            .map(u -> {
                userService.updateUserInformation(userDTO.getFirstName(), userDTO.getLastName(), userDTO.getEmail());
                return new ResponseEntity<String>(HttpStatus.OK);
            })
            .orElseGet(() -> new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
    }

    /**
     * POST  /change_password -> changes the current user's password
     */
    @RequestMapping(value = "/account/change_password",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<?> changePassword(@RequestBody String password) {
        if (StringUtils.isEmpty(password)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        userService.changePassword(password);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * GET  /account/sessions -> get the current open sessions.
     */
    @RequestMapping(value = "/account/sessions",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public ResponseEntity<List<PersistentToken>> getCurrentSessions() {
        return userRepository.findOneByLogin(SecurityUtils.getCurrentLogin())
            .map(user -> new ResponseEntity<>(
                persistentTokenRepository.findByUser(user),
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR));
    }

    /**
     * DELETE  /account/sessions?series={series} -> invalidate an existing session.
     *
     * - You can only delete your own sessions, not any other user's session
     * - If you delete one of your existing sessions, and that you are currently logged in on that session, you will
     *   still be able to use that session, until you quit your browser: it does not work in real time (there is
     *   no API for that), it only removes the "remember me" cookie
     * - This is also true if you invalidate your current session: you will still be able to use it until you close
     *   your browser or that the session times out. But automatic login (the "remember me" cookie) will not work
     *   anymore.
     *   There is an API to invalidate the current session, but there is no API to check which session uses which
     *   cookie.
     */
    @RequestMapping(value = "/account/sessions/{series}",
            method = RequestMethod.DELETE)
    @Timed
    public void invalidateSession(@PathVariable String series) throws UnsupportedEncodingException {
        String decodedSeries = URLDecoder.decode(series, "UTF-8");
        userRepository.findOneByLogin(SecurityUtils.getCurrentLogin()).ifPresent(u -> {
            persistentTokenRepository.findByUser(u).stream()
                .filter(persistentToken -> StringUtils.equals(persistentToken.getSeries(), decodedSeries))
                .findAny().ifPresent(t -> persistentTokenRepository.delete(decodedSeries));
        });
    }
}
