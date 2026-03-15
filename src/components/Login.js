import React, { useState } from 'react';
import axios from 'axios';
import { ShieldCheck, Lock, Mail, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Conexión directa con Dorothy en el puerto 3000
      const res = await axios.post('http://localhost:3000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token); 
      alert('✅ IDENTIDAD CONFIRMADA: BIENVENIDO AL BÚNKER');
    } catch (err) {
      alert('❌ ERROR: ACCESO DENEGADO AL SISTEMA');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      {/* Fondo con efecto de luz neón */}
      <div className="absolute w-64 h-64 bg-green-500/10 rounded-full blur-[120px] top-1/4 left-1/3"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-[400px]"
      >
        <div className="text-center mb-10">
          <Terminal className="w-10 h-10 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Cyber<span className="text-green-500">Enterados</span>
          </h2>
          <div className="h-1 w-20 bg-green-500 mx-auto mt-2 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Comandante ID</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input 
                type="email" 
                placeholder="email@cyberenterados.com"
                className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/5 rounded-xl text-white focus:border-green-500/50 transition-all outline-none text-sm"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Security Key</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                placeholder="••••••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/5 rounded-xl text-white focus:border-green-500/50 transition-all outline-none text-sm"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full glass-card py-3 rounded-xl font-bold hover:bg-green-500/20 transition-all"
             >INICIAR SECUENCIA
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-gray-600 uppercase tracking-widest">
            Sincronizado con Dorothy v3.0 // Marie Core
        </p>
      </motion.div>
    </div>
  );
};

export default Login;