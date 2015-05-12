package com.nwt.spade.devops;
//package com.newwave.dashboard;
//
//import java.util.ArrayList;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//import org.apache.commons.codec.binary.Base64;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.client.RestTemplate;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.ObjectWriter;
//
//public class RestSample {
//
//	
//	public static void main(String[] args) {
//		
//		 String plainCreds = "nwt-buildserver"+':'+"NWT91life";
//	 		byte[] plainCredsBytes = plainCreds.getBytes();
//	 		byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
//	 		String base64Creds = new String(base64CredsBytes);
//	 		HttpHeaders headers = new HttpHeaders();
//	 		headers.add("Authorization", "Basic " + base64Creds);
//
//	        RestTemplate restTemplate = new RestTemplate();
//	     
//	     HttpEntity<String> request = new HttpEntity<String>(headers);
//	     String url="https://api.github.com/repos/newwavetechnologies/depot-dev-cmsEppe/commits";
//	     ResponseEntity<Checkin[]> response = restTemplate.exchange(url, HttpMethod.GET, request, Checkin[].class);
//	     Checkin[] checkins = response.getBody();
//	     Map<String, Integer> occurrences = new HashMap<String, Integer>();
//
//	     
//	     for ( Checkin checkin : checkins ) {
//	    	 
//	    	  String date = checkin.getCommit().getCommitter().getDate().substring(0,10);
//	    	   Integer oldCount = occurrences.get(date);
//	    	   if ( oldCount == null ) {
//	    	      oldCount = 0;
//	    	   }
//	    	   occurrences.put(date, oldCount + 1);
//	    	}
//	     List<CheckinChart> checkinChart = new ArrayList<CheckinChart>();
//	     for ( String date : occurrences.keySet() ) {
//	    	 CheckinChart commitChart = new  CheckinChart();
//	    	 commitChart.setDate(date);
//	    	 Integer i= occurrences.get(date);
//	    	 commitChart.setCheckin(i.intValue());
//	    	 
//	    	 checkinChart.add(commitChart);
//
//	    	 
//	    	 
//	    	}
//	    
//    
//	}
//
//}
