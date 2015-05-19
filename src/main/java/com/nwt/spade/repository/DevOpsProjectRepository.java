package com.nwt.spade.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.nwt.spade.domain.DevOpsProject;
import com.nwt.spade.domain.User;


public interface DevOpsProjectRepository extends MongoRepository<DevOpsProject,String> {

	@Query("{name: ?0}")
    DevOpsProject getProjectByName(String name);

}
