package de.neuefische.backend.service;

import de.neuefische.backend.model.Todo;
import de.neuefische.backend.repo.TodoRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.NoSuchElementException;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

class TodoServiceTest {

    TodoRepo todoRepo = mock(TodoRepo.class);
    TodoService todoService = new TodoService(todoRepo);

    @Test
    void testUpdateTodo() {
        // GIVEN
        Todo todoToUpdate = new Todo();
        todoToUpdate.setId("123ABC");
        todoToUpdate.setDescription("Aufräumen");
        todoToUpdate.setStatus("OPEN");

        Todo updatedTodoItem = new Todo();
        updatedTodoItem.setId("123ABC");
        updatedTodoItem.setDescription("Aufräumen");
        updatedTodoItem.setStatus("IN PROGRESS");

        when(todoRepo.existsById(any())).thenReturn(true);
        when(todoRepo.save(any())).thenReturn(updatedTodoItem);

        // WHEN
        Todo actual = todoService.updateTodo(todoToUpdate);

        // THEN
        verify(todoRepo).save(todoToUpdate);
        assertThat(actual, is(updatedTodoItem));
    }

    @Test
    void testUpdateTodo_elementNotFound() {
        // GIVEN
        Todo todoToUpdate = new Todo();
        todoToUpdate.setId("123ABC");
        todoToUpdate.setDescription("Aufräumen");
        todoToUpdate.setStatus("OPEN");

        when(todoRepo.existsById("123ABC")).thenThrow(NoSuchElementException.class);

        // WHEN
        Assertions.assertThrows(NoSuchElementException.class, () -> {
            todoService.updateTodo(todoToUpdate);
        });
    }
}
