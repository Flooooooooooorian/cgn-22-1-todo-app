package de.neuefische.backend.controller;

import de.neuefische.backend.model.Todo;
import de.neuefische.backend.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/todo")
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getTodos(){
        return todoService.getTodos();
    }

    @GetMapping("{id}")
    public Todo getTodo(@PathVariable String id){
        return todoService.getTodo(id);
    }

    @PostMapping
    public Todo addTodo(@RequestBody Todo todo){
        return todoService.addTodo(todo);
    }

    @PutMapping("{id}")
    public Todo updateTodo(@PathVariable String id, @RequestBody Todo todo){

        if(!id.equals(todo.getId())){
            throw new IllegalArgumentException("Could not update element! Path id does not match with element id in request body!");
        }

        return todoService.updateTodo(todo);
    }

    @DeleteMapping("{id}")
    public void deleteTodo(@PathVariable String id){
        todoService.deleteTodo(id);
    }

}
