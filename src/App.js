import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import PostNews from './components/PostNews';
import Feed from './Feed'; 

// 🛡️ Filtro de Seguridad: Detecta si hay rango de Comandante
const RutaProtegida = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Navbar /> 
            <div style={styles.container}>
                <Routes>
                    {/* 🌍 Portal de Noticias (Público) */}
                    <Route path="/" element={<Feed />} /> 
                    <Route path="/login" element={<Login />} />

                    {/* 🔐 Centro de Publicación (Privado) */}
                    <Route 
                        path="/publicar" 
                        element={
                            <RutaProtegida>
                                <PostNews />
                            </RutaProtegida>
                        } 
                    />

                    {/* 📡 Radar: Redirige cualquier error al Feed */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
}

const styles = {
    container: { 
        padding: '20px', 
        minHeight: 'calc(100vh - 80px)', 
        background: '#050505' // Fondo de búnker profundo
    }
};

export default App;