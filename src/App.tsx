import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './views/Home/Home';
import Detail from "./views/Detail/Detail";
import Page404 from "./views/404/404";
import Layout from "./shared/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout/>
      <Routes>
        {/*<Route path="/" element={<Layout/>}>*/}
          <Route index element={<Home />} />
          <Route path={`event/:eventId`} element={<Detail/>}/>
          <Route path="*" element={<Page404/>}/>
        {/*</Route>*/}
      </Routes>
    </div>
  );
}

export default App;
