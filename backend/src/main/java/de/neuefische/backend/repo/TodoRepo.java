package de.neuefische.backend.repo;

import de.neuefische.backend.model.Todo;
import de.neuefische.backend.service.IdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Repository
public interface TodoRepo extends PagingAndSortingRepository<Todo, String> {
    List<Todo> findAll();
}
