import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 📦 Importación de sus Componentes
import Navbar from './components/Navbar';
import Login from './components/Login';
import PostNews from './components/PostNews'; 
import DashboardLayout from './components/DashboardLayout';
import MisNoticias from './components/MisNoticias'; 
import DashboardHome from './components/DashboardHome'; 
import EditarNoticia from './components/EditarNoticia'; // 🎯 ¡NUEVO MÓDULO DE EDICIÓN!

// 🛡️ EL CAMPO DE FUERZA (Guardián de Rutas)
const RutaPrivada = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        
        {/* =========================================
            🌍 SECTOR PÚBLICO (Cualquiera puede entrar)
            ========================================= */}
        <Route path="/" element={
          <>
            <Navbar />
            <div className="p-8 text-center text-white">
               <h1 className="text-3xl font-bold">Feed Público de CyberEnterados</h1>
               <p className="text-neutral-400 mt-4">Aquí irán las noticias para sus lectores...</p>
            </div>
          </>
        } />
        
        <Route path="/login" element={
          <>
            <Navbar />
            <Login />
          </>
        } />


        {/* =========================================
            🔒 SECTOR CLASIFICADO (Solo con Token)
            ========================================= */}
        
        {/* 1. Centro de Inteligencia */}
        <Route path="/panel" element={
          <RutaPrivada>
            <DashboardLayout>
              <DashboardHome /> 
            </DashboardLayout>
          </RutaPrivada>
        } />

        {/* 2. El Arsenal */}
        <Route path="/panel/noticias" element={
          <RutaPrivada>
            <DashboardLayout>
              <MisNoticias /> 
            </DashboardLayout>
          </RutaPrivada>
        } />

        {/* 3. Consola de Transmisión */}
        <Route path="/panel/publicar" element={
          <RutaPrivada>
            <DashboardLayout>
              <PostNews /> 
            </DashboardLayout>
          </RutaPrivada>
        } />

        {/* 4. Módulo de Edición Táctica ✏️ */}
        <Route path="/panel/editar/:id" element={
          <RutaPrivada>
            <DashboardLayout>
              <EditarNoticia /> 
            </DashboardLayout>
          </RutaPrivada>
        } />

      </Routes>
    </Router>
  );
}

export default App;