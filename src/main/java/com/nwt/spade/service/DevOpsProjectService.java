package com.nwt.spade.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.nwt.spade.devops.BuildAll;
import com.nwt.spade.devops.BuildInfo;
import com.nwt.spade.devops.Builds;
import com.nwt.spade.devops.Checkin;
import com.nwt.spade.devops.CheckinChart;
import com.nwt.spade.devops.Contributor;
import com.nwt.spade.devops.IssueChart;
import com.nwt.spade.devops.Severity;
import com.nwt.spade.domain.DevOpsProject;
import com.nwt.spade.repository.DevOpsProjectRepository;

@Service
public class DevOpsProjectService {

	private final Logger LOG = LoggerFactory.getLogger(UserService.class);

	@Inject
	private DevOpsProjectRepository projectRepository;

	@Inject
	private MongoTemplate mongoTemplate;

	// @Inject
	// private RestTemplate restTemplate;

    public List<CheckinChart> findAllCheckins(String name)
    {
    	DevOpsProject project=projectRepository.getProjectByName(name);
   	 String plainCreds = project.getGitUsername()+':'+project.getGitPassword();
		byte[] plainCredsBytes = plainCreds.getBytes();
		byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
		String base64Creds = new String(base64CredsBytes);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Basic " + base64Creds);

       RestTemplate restTemplate = new RestTemplate();
    
    HttpEntity<String> request = new HttpEntity<String>(headers);
    String url="https://api.github.com/repos/"+project.getGitUrl()+"/commits";
    
  ResponseEntity<Checkin[]> response = restTemplate.exchange(url, HttpMethod.GET, request, Checkin[].class);
  Checkin[] checkins = response.getBody();
  Map<String, Integer> occurrences = new HashMap<String, Integer>();

  
  for ( Checkin checkin : checkins ) {
 	 
 	  String date = checkin.getCommit().getCommitter().getDate().substring(0,10);
 	   Integer oldCount = occurrences.get(date);
 	   if ( oldCount == null ) {
 	      oldCount = 0;
 	   }
 	   occurrences.put(date, oldCount + 1);
 	}
  List<CheckinChart> checkinChart = new ArrayList<CheckinChart>();
  for ( String date : occurrences.keySet() ) {
	  CheckinChart commitChart = new  CheckinChart();
 	 commitChart.setDate(date);
 	 Integer i= occurrences.get(date);
 	 commitChart.setCheckin(i.intValue());
 	 
 	 checkinChart.add(commitChart);

 	 
 	 
 	}
 
		return checkinChart;
    	
    }
    public Contributor[] findAllcontributors(String name)
    {
    	
//    	 RestTemplate restTemplate1 = new RestTemplate();
//	     BuildInfo builds=restTemplate1.getForObject("http://192.168.1.10:8080/job/EPPE-CI/api/json", BuildInfo.class);
//	     
//	     List<Projects> proj= mongoTemplate.findAll(Projects.class);
//	     
//	      proj.size();
	     
    	 DevOpsProject project=projectRepository.getProjectByName(name);
    	 String plainCreds = project.getGitUsername()+':'+project.getGitPassword();
 		byte[] plainCredsBytes = plainCreds.getBytes();
 		byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
 		String base64Creds = new String(base64CredsBytes);
 		HttpHeaders headers = new HttpHeaders();
 		headers.add("Authorization", "Basic " + base64Creds);

        RestTemplate restTemplate = new RestTemplate();
     
     HttpEntity<String> request = new HttpEntity<String>(headers);
     String url="https://api.github.com/repos/"+project.getGitUrl()+"/stats/contributors";
     ResponseEntity<Contributor[]> response = restTemplate.exchange(url, HttpMethod.GET, request, Contributor[].class);
     Contributor[] account = response.getBody();
    
     return account;
    	
    }
    
   public List<Builds> insertBuildInformation(String name)
   {
       RestTemplate restTemplate = new RestTemplate();
       List<Builds> builds;
	  DevOpsProject project= projectRepository.getProjectByName(name);
	  String buildurl = project.getBuildUrl();
	  String url=buildurl+"/lastBuild/api/json";
	  
	  Builds latestBuild = restTemplate.getForObject(url, Builds.class);
	  if(project.getBuilds()==null)
	  {
		  builds = new ArrayList<Builds>();
	  }
	  else
	  {
		  builds = project.getBuilds();
	  }
	   BuildInfo allbuilds=restTemplate.getForObject(buildurl+"/api/json", BuildInfo.class);

	 if(project.getLatestBuildNumber()==0)
	 {
	  if(latestBuild.getNumber()>0)
	  {
		  for (BuildAll buildAll : allbuilds.getBuilds()) {
			  Builds build =new Builds();
			  Builds latestBuild1 = restTemplate.getForObject(buildAll.getUrl()+"api/json", Builds.class);
			  build.setDuration(latestBuild1.getDuration());
			  build.setNumber(latestBuild1.getNumber());
			  build.setResult(latestBuild1.getResult());
			  build.setTimestamp(latestBuild1.getTimestamp());
			  build.setUrl(latestBuild1.getUrl());
			  
			  builds.add(build);
			
		}
		
	  }
	  project.setLatestBuildNumber(latestBuild.getNumber());
	 }
	  
	 else if(project.getLatestBuildNumber()<latestBuild.getNumber())
	  {
		  for(int i=project.getLatestBuildNumber();i<latestBuild.getNumber();i++)
		  {
			  Builds build = new Builds();
			  String url1=buildurl+"/"+i+"/api/json";
			  
			  Builds latestBuild1 = restTemplate.getForObject(url1, Builds.class);
			  build.setDuration(latestBuild1.getDuration());
			  build.setNumber(latestBuild1.getNumber());
			  build.setResult(latestBuild1.getResult());
			  build.setTimestamp(latestBuild1.getTimestamp());
			  build.setUrl(latestBuild1.getUrl());
			  
			  builds.add(build);
			  
		  }
		project.setLatestBuildNumber(latestBuild.getNumber());

	  }

	  project.setBuilds(builds);
	  
	  mongoTemplate.save(project);
	  //latestBuild.getUrl();
	  
	  
	   return builds;

   }

public List<IssueChart> getIssues(String name) {
	String projectName = "";
    RestTemplate restTemplate = new RestTemplate();
    HttpHeaders headers = new HttpHeaders();
	headers.set("Accept", "application/json");
	List<IssueChart> issues = new ArrayList<IssueChart>();
	IssueChart chart;
    HttpEntity<String> request = new HttpEntity<String>(headers);
    if(name.equals("cmsCdat"))
    {
    	projectName = "gov.hhs.cms.radv.cdat:cmsCdat";
    }
    else
    {
    	projectName = "gov.hhs.cms.ebs:cmsEppe";
    }
    ResponseEntity<Severity> response = restTemplate.exchange("http://192.168.1.10:9000/api/issues/search?componentRoots={project}&severities={severities}&statuses={statuses}", HttpMethod.GET, request, Severity.class,projectName,"MINOR","OPEN");
    Severity minor = response.getBody();
    chart = new IssueChart();
    chart.setValue(minor.getPaging().getTotal());
    chart.setLabel("MINOR DEFECTS");
    issues.add(chart);
    
    ResponseEntity<Severity> response1 = restTemplate.exchange("http://192.168.1.10:9000/api/issues/search?componentRoots={project}&severities={severities}&statuses={statuses}", HttpMethod.GET, request, Severity.class,projectName,"MAJOR","OPEN");
    Severity major = response1.getBody();
    chart = new IssueChart();
    chart.setValue(major.getPaging().getTotal());
    chart.setLabel("MAJOR DEFECTS");
    issues.add(chart);
    
    ResponseEntity<Severity> response2 = restTemplate.exchange("http://192.168.1.10:9000/api/issues/search?componentRoots={project}&severities={severities}&statuses={statuses}", HttpMethod.GET, request, Severity.class,projectName,"CRITICAL","OPEN");
    Severity critical = response2.getBody();
    chart = new IssueChart();
    chart.setValue(critical.getPaging().getTotal());
    chart.setLabel("CRTICAL DEFECTS");
    issues.add(chart);
    
    
    ResponseEntity<Severity> response3 = restTemplate.exchange("http://192.168.1.10:9000/api/issues/search?componentRoots={project}&severities={severities}&statuses={statuses}", HttpMethod.GET, request, Severity.class,projectName,"BLOCKER","OPEN");
    Severity blocker = response3.getBody();
    chart = new IssueChart();
    chart.setValue(blocker.getPaging().getTotal());
    chart.setLabel("BLOCKER DEFECTS");
    issues.add(chart);
    
    ResponseEntity<Severity> response4 = restTemplate.exchange("http://192.168.1.10:9000/api/issues/search?componentRoots={project}&severities={severities}&statuses={statuses}", HttpMethod.GET, request, Severity.class,projectName,"INFO","OPEN");
    Severity info = response4.getBody();
    chart = new IssueChart();
    chart.setValue(info.getPaging().getTotal());
    chart.setLabel("INFO DEFECTS");
    issues.add(chart);
    
    
    
    
   
	
 	return issues;
}


}
