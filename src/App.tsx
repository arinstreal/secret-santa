import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './views/Home/Home';
import Detail from "./views/Detail/Detail";
import Page404 from "./views/404/404";
import Layout from "./shared/Layout/Layout";
import DrawingResult from "./views/DrawingResult/DrawingResult";
import { Snowflakes } from "./shared/Snowflakes/Snowflakes";

function App() {
  return (
    <div className="App">
      <div className="bg"/>
      <Snowflakes/>
      <Layout/>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="drawing-result/:drawingId" element={<DrawingResult/>}/>
          <Route path="event/:eventId" element={<Detail/>}/>
          <Route path="*" element={<Page404/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
