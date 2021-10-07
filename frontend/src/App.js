import Header from "./components/Header";
import styled from "styled-components/macro";
import {useEffect, useState} from "react";
import {deleteTodo, getTodos, postTodo, putTodo} from "./service/todo-api-service";
import {getNextStatus} from "./service/todo-service";
import NavigationBar from "./components/NavigationBar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Homepage from "./components/Homepage";
import BoardPage from "./components/BoardPage";
import DetailsPage from "./components/DetailsPage";

function App() {

    const [todos, setTodos] = useState([]);

    const addTodo = (description) => {
        postTodo(description)
            .then(addedTodo => setTodos([...todos, addedTodo]))
    }

    const advanceTodo = (todo) => {
        const newStatus = getNextStatus(todo.status)
        const advancedTodo = {...todo, status: newStatus}
        putTodo(advancedTodo)
            .then(updatedTodo =>
                setTodos(todos.map(item => updatedTodo.id === item.id ? advancedTodo : item)))
    }

    const removeTodo = (id) => {
        deleteTodo(id)
            .then(() => setTodos(todos.filter(todo => todo.id !== id)))
    }

    useEffect(() => {
        getTodos()
            .then(todos => setTodos(todos))
    }, [])

    return (
        <Router>
            <PageLayout>
                <Header/>
                <NavigationBar/>
                <Switch>
                    <Route path="/" exact>
                        <Homepage
                            todos={todos}
                            onAdvance={advanceTodo}
                            onDelete={removeTodo}
                            onAdd={addTodo}
                        />
                    </Route>
                    <Route path="/todos/:statusSlug">
                        <BoardPage
                            todos={todos}
                            onAdvance={advanceTodo}
                            onDelete={removeTodo}
                        />
                    </Route>
                    <Route path={"/todo/:id"}>
                        <DetailsPage/>
                    </Route>
                </Switch>
            </PageLayout>
        </Router>
    );
}

export default App;

const PageLayout = styled.div`

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: min-content min-content 1fr min-content;
`
