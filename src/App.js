import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 📦 Importación de sus Componentes
import Navbar from './components/Navbar';
import Login from './components/Login';
import PostNews from './components/PostNews'; 
import DashboardLayout from './components/DashboardLayout';
import MisNoticias from './components/MisNoticias'; 
import DashboardHome from './components/DashboardHome'; // 🎯 ¡NUEVO CENTRO DE INTELIGENCIA!

// 🛡️ EL CAMPO DE FUERZA (Guardián de Rutas)
const RutaPrivada = ({ children }) => {
  // Buscamos el pase VIP en la memoria de Ada
  const token = localStorage.getItem('token');
  
  // Si hay token, renderizamos el componente (children). Si no, de vuelta al Login.
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
        
        {/* 1. Centro de Inteligencia (Home del Panel) */}
        <Route path="/panel" element={
          <RutaPrivada>
            <DashboardLayout>
              <DashboardHome /> {/* 🎯 WIDGETS DE TELEMETRÍA ACTIVADOS */}
            </DashboardLayout>
          </RutaPrivada>
        } />

        {/* 2. El Arsenal (Gestor de Noticias) */}
        <Route path="/panel/noticias" element={
          <RutaPrivada>
            <DashboardLayout>
              <MisNoticias /> 
            </DashboardLayout>
          </RutaPrivada>
        } />

        {/* 3. Consola de Transmisión (Su PostNews.js) */}
        <Route path="/panel/publicar" element={
          <RutaPrivada>
            <DashboardLayout>
              <PostNews /> 
            </DashboardLayout>
          </RutaPrivada>
        } />

      </Routes>
    </Router>
  );
}

export default App;