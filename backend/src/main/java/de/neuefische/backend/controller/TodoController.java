package de.neuefische.backend.controller;

import de.neuefische.backend.model.Todo;
import de.neuefische.backend.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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


    @DeleteMapping("{id}")
    public void deleteTodo(@PathVariable String id){
        todoService.deleteTodo(id);
    }

}
