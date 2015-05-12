package com.nwt.spade.devops;

import java.util.List;

public class Severity {
	
	private List<Issues> issues;
	private Paging paging;

	public Paging getPaging() {
		return paging;
	}

	public void setPaging(Paging paging) {
		this.paging = paging;
	}

	public List<Issues> getIssues() {
		return issues;
	}

	public void setIssues(List<Issues> issues) {
		this.issues = issues;
	}
	

}
