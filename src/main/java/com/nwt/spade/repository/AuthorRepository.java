package com.nwt.spade.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.nwt.spade.domain.Author;



public interface AuthorRepository extends MongoRepository<Author,String> {

}
