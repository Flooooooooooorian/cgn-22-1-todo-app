import Header from './components/Header'
import styled from 'styled-components/macro'

import NavigationBar from './components/NavigationBar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Homepage from './components/Homepage'
import DetailsPage from './components/DetailsPage'
import useTodos from './hooks/useTodos'

function App() {
    const {todos, addTodo, advanceTodo, removeTodo} = useTodos()

    return (
        <BrowserRouter>
            <PageLayout>
                <Header/>
                <NavigationBar/>
                <Routes>
                    <Route path="/" element={<Homepage
                        todos={todos}
                        onAdvance={advanceTodo}
                        onDelete={removeTodo}
                        onAdd={addTodo}
                        />}
                    />
                    <Route path={'/todo/:id'} element={<DetailsPage/>}/>
                </Routes>
            </PageLayout>
        </BrowserRouter>
    )
}

export default App

const PageLayout = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: min-content min-content 1fr min-content;
`
