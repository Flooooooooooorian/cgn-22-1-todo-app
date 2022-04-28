package de.neuefische.backend.repo;

import de.neuefische.backend.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TodoRepo extends MongoRepository<Todo, String> {

}
