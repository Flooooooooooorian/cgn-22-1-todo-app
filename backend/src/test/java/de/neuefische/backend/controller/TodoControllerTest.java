package de.neuefische.backend.controller;

import de.neuefische.backend.model.Todo;
import de.neuefische.backend.repo.TodoRepo;
import de.neuefische.backend.service.IdService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.hamcrest.collection.ArrayMatching.arrayContainingInAnyOrder;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment =
        SpringBootTest.WebEnvironment.RANDOM_PORT)
class TodoControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private TodoRepo repository;

    @BeforeEach
    public void clearDb() {
        repository.deleteAll();
    }

    @MockBean
    private IdService idService;

    @LocalServerPort
    private int port;

    @Test
    void addTodo() {

        // GIVE
        Todo todo = new Todo(null, "Dinge tun", "OPEN");
        when(idService.generateId()).thenReturn("1");
        // WHEN
        ResponseEntity<Todo> postResponse = restTemplate.postForEntity("/api/todo", todo, Todo.class);
        Todo actual = postResponse.getBody();

        // THEN
        assertEquals(HttpStatus.OK, postResponse.getStatusCode());
        assertNotNull(actual);
        assertEquals(new Todo("1", "Dinge tun", "OPEN"), actual);

        // THEN: check via GET if element was created
        String actualId = actual.getId();
        ResponseEntity<Todo> getResponse = restTemplate.getForEntity("/api/todo/" + actualId, Todo.class);
        Todo persistedTodo = getResponse.getBody();

        assertNotNull(persistedTodo);
        assertEquals(actualId, persistedTodo.getId());
        assertEquals(todo.getDescription(), persistedTodo.getDescription());
        assertEquals(todo.getStatus(), persistedTodo.getStatus());
    }

    @Test
    public void getTodoItemsShouldReturnItemsFromDb() {
        //GIVEN
        repository.save(new Todo("1", "sleep", "OPEN"));
        repository.save(new Todo("2", "chill ", "IN_PROGRESS"));

        //WHEN
        ResponseEntity<Todo[]> response = restTemplate.getForEntity("/api/todo", Todo[].class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), arrayContainingInAnyOrder(
                new Todo("1", "sleep", "OPEN"),
                new Todo("2", "chill ", "IN_PROGRESS")));

    }

    @Test
    public void putTodoItemShouldUpdateItem() {
        //GIVEN
        repository.save(new Todo("1", "sleep", "OPEN"));
        repository.save(new Todo("2", "chill", "IN_PROGRESS"));

        //WHEN
        Todo updatedTodo = new Todo("1", "drink", "OPEN");
        restTemplate.put("/api/todo/1", updatedTodo, Todo.class);

        //THEN
        List<Todo> todoItems = repository.findAll();
        assertThat(todoItems, containsInAnyOrder(
                new Todo("2", "chill", "IN_PROGRESS"),
                new Todo("1", "drink", "OPEN")));
    }

    @Test
    public void getTodoShouldReturnTodoItem() {
        //GIVEN
        repository.save(new Todo("1", "sleep", "OPEN"));
        repository.save(new Todo("2", "chill", "IN_PROGRESS"));

        //WHEN
        ResponseEntity<Todo> response = restTemplate.getForEntity("/api/todo/2", Todo.class);

        //THEN
        assertThat(response.getStatusCode(), is(HttpStatus.OK));
        assertThat(response.getBody(), is(new Todo("2", "chill", "IN_PROGRESS")));

    }

    @Test
    public void deleteTodoShouldDeleteItemFromDb() {
        //GIVEN
        repository.save(new Todo("1", "sleep", "OPEN"));
        repository.save(new Todo("2", "chill", "IN_PROGRESS"));

        //WHEN
        restTemplate.delete("http://localhost:" + port + "/api/todo/2");

        //THEN
        List<Todo> todoItems = repository.findAll();
        assertEquals(todoItems, List.of(new Todo("1", "sleep", "OPEN")));
    }

}
