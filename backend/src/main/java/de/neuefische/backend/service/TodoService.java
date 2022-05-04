package de.neuefische.backend.service;

import de.neuefische.backend.dto.CreateTodoDto;
import de.neuefische.backend.model.Todo;
import de.neuefische.backend.repo.TodoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class TodoService {

    private final TodoRepo todoRepo;

    @Autowired
    public TodoService(TodoRepo todoRepo) {
        this.todoRepo = todoRepo;
    }

    public List<Todo> getTodos() {
        return todoRepo.findAll();
    }

    public Todo addTodo(CreateTodoDto todo) {
        Todo newTodo = new Todo();
        newTodo.setDescription(todo.getDescription());
        newTodo.setStatus(todo.getStatus());

        return todoRepo.insert(newTodo);
    }

    public Todo updateTodo(Todo todo) {
        if(todoRepo.existsById(todo.getId())){
            return todoRepo.save(todo);
        } else{
            throw new NoSuchElementException("Could not update Todo element! Element with id does not exist: " + todo.getId());
        }
    }

    public void deleteTodo(String id) {
        todoRepo.deleteById(id);
    }

    public Todo getTodo(String id) {
        return todoRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Todo with id: " + id + " not found!"));
    }
}
