package com.nwt.spade.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.joda.deser.LocalDateDeserializer;
import com.nwt.spade.devops.Builds;
import com.nwt.spade.domain.util.CustomLocalDateSerializer;

import org.bson.types.ObjectId;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.joda.time.LocalDate;
import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.List;

/**
 * A Projects.
 */
public class Projects implements Serializable {

    @Id
    private String id;

    private String name;

    private String gitUsername;
    
    private String gitPassword;
    
    private String gitUrl;
    
    private String buildUrl;

    private List<Builds> builds;
    
    private int latestBuildNumber;
    
    public int getLatestBuildNumber() {
		return latestBuildNumber;
	}


	public void setLatestBuildNumber(int latestBuildNumber) {
		this.latestBuildNumber = latestBuildNumber;
	}


	public List<Builds> getBuilds() {
		return builds;
	}


	public void setBuilds(List<Builds> builds) {
		this.builds = builds;
	}


	public String getGitPassword() {
		return gitPassword;
	}


	public void setGitPassword(String gitPassword) {
		this.gitPassword = gitPassword;
	}


	public String getGitUrl() {
		return gitUrl;
	}


	public void setGitUrl(String gitUrl) {
		this.gitUrl = gitUrl;
	}


	public String getBuildUrl() {
		return buildUrl;
	}


	public void setBuildUrl(String buildUrl) {
		this.buildUrl = buildUrl;
	}


	public String getGitUsername() {
		return gitUsername;
	}
    

	public void setGitUsername(String gitUsername) {
		this.gitUsername = gitUsername;
	}

	//private LocalDate lastBuildDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Projects projects = (Projects) o;

        if (id != null ? !id.equals(projects.id) : projects.id != null) return false;

        return true;
    }

//    @Override
//    public int hashCode() {
//        return 
//    }

    @Override
    public String toString() {
        return "Projects{" +
                "id=" + id +
                ", name='" + name + "'" +
                ", latestBuildNumber='" + latestBuildNumber + "'" +
                '}';
    }
}
