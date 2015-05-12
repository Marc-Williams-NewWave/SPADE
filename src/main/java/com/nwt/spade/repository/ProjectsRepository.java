package com.nwt.spade.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.nwt.spade.domain.Projects;
import com.nwt.spade.domain.User;


public interface ProjectsRepository extends MongoRepository<Projects,String> {

	@Query("{name: ?0}")
    Projects getProjectByName(String name);

}
