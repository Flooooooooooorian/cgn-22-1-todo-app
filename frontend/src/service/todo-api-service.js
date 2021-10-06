import axios from "axios";

export const getTodos = () => {
  return axios
    .get("/api/todo")
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const postTodo = (newDescription) => {
  const newTodo = {
    description: newDescription,
    status: "OPEN",
  };

  return axios
      .post("/api/todo", newTodo)
      .then((response) => response.data);
};

export const putTodo = (todo) => {
  return axios
    .put(`/api/todo/${todo.id}`, todo)
    .then((response) => response.data);
};

export const deleteTodo = (id) => {
  return axios
      .delete(`/api/todo/${id}`);
};
