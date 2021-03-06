package de.neuefische.backend.repo;

import de.neuefische.backend.model.Todo;
import de.neuefische.backend.security.model.AppUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface TodoRepo extends MongoRepository<Todo, String> {

}
