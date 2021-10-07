import Header from "./components/Header";
import styled from "styled-components/macro";

import NavigationBar from "./components/NavigationBar";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Homepage from "./components/Homepage";
import BoardPage from "./components/BoardPage";
import DetailsPage from "./components/DetailsPage";
import useTodos from "./hooks/useTodos";

function App() {

    const {todos, addTodo, advanceTodo, removeTodo} = useTodos()

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
