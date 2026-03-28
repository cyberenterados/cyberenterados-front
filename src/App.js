import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// 📦 Importación de sus Componentes
import Navbar from './components/Navbar';
import Login from './components/Login';
import PostNews from './components/PostNews'; 
import DashboardLayout from './components/DashboardLayout';
import MisNoticias from './components/MisNoticias'; 
import DashboardHome from './components/DashboardHome'; 
import EditarNoticia from './components/EditarNoticia'; 
import FeedNoticias from './components/FeedNoticias'; 
import NoticiaDetalle from './components/NoticiaDetalle'; 
import Footer from './components/Footer'; // 🎯 ¡NUEVO FOOTER AÑADIDO!

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
            <FeedNoticias /> 
            <Footer /> {/* 🎯 CIERRE VISUAL EN PORTADA */}
          </>
        } />

        {/* 📖 Lectura de Artículo Detallado */}
        <Route path="/noticia/:id" element={
          <>
            <Navbar />
            <NoticiaDetalle />
            <Footer /> {/* 🎯 CIERRE VISUAL EN LA NOTICIA */}
          </>
        } />
        
        <Route path="/login" element={
          <>
            <Navbar />
            <Login />
            <Footer /> {/* 🎯 CIERRE VISUAL EN EL LOGIN */}
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