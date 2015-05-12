package com.nwt.spade.devops;

public class Commit {
	private Committer committer;
    private String message;
    
	public Committer getCommitter() {
		return committer;
	}

	public void setCommitter(Committer committer) {
		this.committer = committer;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	

}
