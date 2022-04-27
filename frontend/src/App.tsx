import Header from './components/Header'

import NavigationBar from './components/NavigationBar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Homepage from './components/Homepage'
import DetailsPage from './components/DetailsPage'
import useTodos from './hooks/useTodos'
import './App.css'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const {todos, addTodo, advanceTodo, removeTodo} = useTodos()

    return (
        <BrowserRouter>
            <ToastContainer />
            <div className={"page-layout"}>
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
            </div>
        </BrowserRouter>
    )
}

export default App
