package de.neuefische.backend.controller;

import de.neuefische.backend.model.Todo;
import de.neuefische.backend.repo.TodoRepo;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.containsInAnyOrder;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TodoControllerTest {

    @Autowired
    WebTestClient webTestClient;

    @Autowired
    private TodoRepo repository;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private String dummyJwt;

    @BeforeEach
    public void clearDb() {
        repository.deleteAll();
        appUserRepository.deleteAll();

        dummyJwt = generateDummyJWT();
    }

    @Test
    void addTodo() {

        // GIVE
        Todo todo = new Todo(null, "Dinge tun", "OPEN");

        // WHEN
        Todo actual = webTestClient.post()
                .uri("/api/todo")
                .bodyValue(todo)
                .headers(http -> http.setBearerAuth(dummyJwt))
                .exchange()
                .expectStatus().isOk()
                .expectBody(Todo.class)
                .returnResult()
                .getResponseBody();

        // THEN
        assertNotNull(actual);
        assertEquals("Dinge tun",  actual.getDescription());
        assertEquals("OPEN",  actual.getStatus());

        // THEN: check via GET if element was created
        String actualId = actual.getId();
        Todo persistedTodo = webTestClient.get()
                .uri("/api/todo/" + actualId)
                .headers(http -> http.setBearerAuth(dummyJwt))
                .exchange()
                .expectStatus().isOk()
                .expectBody(Todo.class)
                .returnResult()
                .getResponseBody();


        assertNotNull(persistedTodo);
        assertEquals(actualId, persistedTodo.getId());
        assertEquals(todo.getDescription(), persistedTodo.getDescription());
        assertEquals(todo.getStatus(), persistedTodo.getStatus());
    }

    @Test
    public void getTodoItemsShouldReturnItemsFromDb() {
        //GIVEN
        repository.insert(new Todo("1", "sleep", "OPEN"));
        repository.insert(new Todo("2", "chill ", "IN_PROGRESS"));

        //WHEN
        List<Todo> actual = webTestClient.get()
                .uri("/api/todo")
                .headers(http -> http.setBearerAuth(dummyJwt))
                .exchange()
                .expectStatus().isOk()
                .expectBodyList(Todo.class)
                .returnResult()
                .getResponseBody();

        //THEN
        assertThat(actual, containsInAnyOrder(
                new Todo("1", "sleep", "OPEN"),
                new Todo("2", "chill ", "IN_PROGRESS")));
    }

    @Test
    public void putTodoItemShouldUpdateItem() {
        //GIVEN
        repository.insert(new Todo("1", "sleep", "OPEN"));
        repository.insert(new Todo("2", "chill", "IN_PROGRESS"));

        //WHEN
        Todo updatedTodo = new Todo("1", "drink", "OPEN");

        webTestClient.put()
                .uri("/api/todo/1")
                .bodyValue(updatedTodo)
                .headers(http -> http.setBearerAuth(dummyJwt))
                .exchange()
                .expectStatus().isOk()
                .expectBody(Todo.class)
                .returnResult()
                .getResponseBody();

        //THEN
        List<Todo> todoItems = repository.findAll();
        assertThat(todoItems, containsInAnyOrder(
                new Todo("2", "chill", "IN_PROGRESS"),
                new Todo("1", "drink", "OPEN")));
    }

    @Test
    public void getTodoShouldReturnTodoItem() {
        //GIVEN
        repository.insert(new Todo("1", "sleep", "OPEN"));
        repository.insert(new Todo("2", "chill", "IN_PROGRESS"));

        //WHEN
        Todo actual = webTestClient.get()
                .uri("/api/todo/2")
                .headers(http -> http.setBearerAuth(dummyJwt))
                .exchange()
                .expectStatus().isOk()
                .expectBody(Todo.class)
                .returnResult()
                .getResponseBody();

        //THEN
        assertThat(actual, is(new Todo("2", "chill", "IN_PROGRESS")));
    }

    @Test
    public void deleteTodoShouldDeleteItemFromDb() {
        //GIVEN
        repository.insert(new Todo("1", "sleep", "OPEN"));
        repository.insert(new Todo("2", "chill", "IN_PROGRESS"));

        //WHEN
        webTestClient.delete()
                .uri("/api/todo/2")
                .headers(http -> http.setBearerAuth(dummyJwt))
                .exchange()
                .expectStatus().isOk();

        //THEN
        List<Todo> todoItems = repository.findAll();
        assertEquals(todoItems, List.of(new Todo("1", "sleep", "OPEN")));
    }

    private String generateDummyJWT() {
        // Create dummy user in test DB
        AppUser dummyUser = AppUser.builder()
                .username("test_username")
                .password(passwordEncoder.encode("some-password"))
                .build();

        appUserRepository.save(dummyUser);

        // Get JWT via login
        String jwt = webTestClient.post()
                .uri("/auth/login")
                .bodyValue(dummyUser
                            .withPassword("some-password"))
                .exchange()
                .expectStatus().isOk()
                .expectBody(String.class)
                .returnResult()
                .getResponseBody();

        return jwt;
    }

}
