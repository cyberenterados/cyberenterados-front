import React, { useEffect } from 'react'; // ✅ Importado useEffect para el pulso inicial
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // ✅ Añadido useLocation
import { HelmetProvider } from 'react-helmet-async';

// 📡 INYECCIÓN: Importación del Radar de Inteligencia
import { initRadar, sendPulse } from './analytics';

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
import Footer from './components/Footer';

// 🛡️ EL CAMPO DE FUERZA (Guardián de Rutas)
const RutaPrivada = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// 🕵️‍♂️ COMPONENTE ESPÍA (RadarTracker)
// Escucha cada cambio de ruta y envía la señal al satélite de Google
const RadarTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Envía el pulso con la ruta actual (ej: /noticia/123)
    sendPulse(location.pathname + location.search);
  }, [location]);

  return null; // El espía opera en las sombras, es invisible
};

function App() {
  
  // ⚡ INICIALIZACIÓN: Encendiendo los escáneres al arrancar la App
  useEffect(() => {
    initRadar();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        {/* 📡 ACTIVACIÓN: El rastreador debe estar dentro del Router para funcionar */}
        <RadarTracker /> 

        <Routes>
          
          {/* =========================================
              🌍 SECTOR PÚBLICO
              ========================================= */}
          <Route path="/" element={
            <>
              <Navbar />
              <FeedNoticias /> 
              <Footer />
            </>
          } />

          {/* 📖 Lectura de Artículo Detallado */}
          <Route path="/noticia/:id" element={
            <>
              <Navbar />
              <NoticiaDetalle />
              <Footer />
            </>
          } />
          
          <Route path="/login" element={
            <>
              <Navbar />
              <Login />
              <Footer />
            </>
          } />

          {/* =========================================
              🔒 SECTOR CLASIFICADO (Solo con Token)
              ========================================= */}
          
          <Route path="/panel" element={
            <RutaPrivada>
              <DashboardLayout>
                <DashboardHome /> 
              </DashboardLayout>
            </RutaPrivada>
          } />

          <Route path="/panel/noticias" element={
            <RutaPrivada>
              <DashboardLayout>
                <MisNoticias /> 
              </DashboardLayout>
            </RutaPrivada>
          } />

          <Route path="/panel/publicar" element={
            <RutaPrivada>
              <DashboardLayout>
                <PostNews /> 
              </DashboardLayout>
            </RutaPrivada>
          } />

          <Route path="/panel/editar/:id" element={
            <RutaPrivada>
              <DashboardLayout>
                <EditarNoticia /> 
              </DashboardLayout>
            </RutaPrivada>
          } />

        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App; // Forzando despliegue de motor 01


// cambiando page en git hub
