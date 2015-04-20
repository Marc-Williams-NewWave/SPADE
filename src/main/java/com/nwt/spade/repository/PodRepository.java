package com.nwt.spade.repository;

import io.fabric8.kubernetes.api.model.Pod;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PodRepository extends MongoRepository<Pod, String> {

	//public Pod findByID(String id);
	
}
