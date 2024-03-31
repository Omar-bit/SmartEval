import { useState } from 'react';
import { Routes, Route, Outlet, Link } from 'react-router-dom';
import Quiz from './pages/Quiz';
import Summarize from './pages/Summarize';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Quiz />} />
        <Route path='/summarize' element={<Summarize />} />
      </Routes>
    </>
  );
}

export default App;
