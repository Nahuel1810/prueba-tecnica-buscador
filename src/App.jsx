import './App.css'
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from 'react-router-dom';
import { TeamsProvider } from './contexts/TeamsContext';
import { PlayersProvider } from './contexts/PlayersContext';
import TeamsList from './pages/TeamsList';
import TeamDetail from './pages/TeamDetail';
import Test from './pages/Test';
import { FiltersProvider } from './contexts/FilterContext';

function App() {
  return (
    <>
      <BrowserRouter>
        <TeamsProvider>
          <PlayersProvider>
            <FiltersProvider>
              <Routes>
                <Route key="listado" path="/" element={<TeamsList />} />
                <Route key="detalle-equipo" path="/equipo/:id" element={<TeamDetail />} />
                <Route key="test" path="/test" element={<Test />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </FiltersProvider>
          </PlayersProvider>
        </TeamsProvider>
      </BrowserRouter>
    </>
  )
}

export default App
