package com.nwt.spade.devops;
//package com.newwave.dashboard;
//import java.util.List;
//
//import org.sonar.wsclient.Sonar;
//import org.sonar.wsclient.services.Measure;
//import org.sonar.wsclient.services.Resource;
//import org.sonar.wsclient.services.ResourceQuery;
//import org.sonar.wsclient.services.Violation;
//import org.sonar.wsclient.services.ViolationQuery;
//
//public class SonarSample {
//
//	public static void main(String[] args) {
//		Sonar sonar = Sonar.create("http://192.168.1.10:9000", "admin", "admin");
//		
//		ViolationQuery violationQuery=new ViolationQuery("gov.hhs.cms.ebs:cmsEppe");
//        List<Violation> violations = sonar.findAll(violationQuery);
//	    violations.size();
//		Resource struts = sonar.find(ResourceQuery.createForMetrics("gov.hhs.cms.ebs:cmsEppe", "coverage", "lines", "violations"));
//		Double m =struts.getMeasureValue("violations") ; //getMeasure("coverage");
//      System.out.println(m);
//		
//	}
//
//}
