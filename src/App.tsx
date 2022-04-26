import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './views/Home/Home';
import Detail from "./views/Detail/Detail";
import Page404 from "./views/404/404";
import Layout from "./shared/Layout/Layout";
import DrawingResult from "./views/DrawingResult/DrawingResult";

function App() {
  return (
    <div className="App">
      <Layout/>
      <div className="app-container">
        <Routes>
          {/*<Route path="/" element={<Layout/>}>*/}
          <Route path="/secret-santa/" element={<Home />} />
          <Route path="/secret-santa/drawing-result/:drawingId" element={<DrawingResult/>} />
          <Route path="/secret-santa/event/:eventId" element={<Detail/>}/>
          <Route path="*" element={<Page404/>}/>
          {/*</Route>*/}
        </Routes>
      </div>
    </div>
  );
}

export default App;
