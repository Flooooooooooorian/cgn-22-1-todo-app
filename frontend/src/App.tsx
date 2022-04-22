import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import BoardPage from "./page/BoardPage";
import Details from "./component/Details";

function App() {



  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route element={<BoardPage />} path={"/"}/>
                <Route element={<Details />} path={"/details/:id"}/>
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
