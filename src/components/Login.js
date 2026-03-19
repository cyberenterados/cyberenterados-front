import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Terminal } from 'lucide-react'; // ShieldCheck eliminado
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await api.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token); 
      console.log("📡 IDENTIDAD CONFIRMADA");
      navigate('/'); 
    } catch (err) {
      console.error("❌ Acceso denegado:", err.response?.data || err.message);
      alert('❌ ERROR: CREDENCIALES INVÁLIDAS.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black overflow-hidden">
      <div className="absolute w-96 h-96 bg-green-500/5 rounded-full blur-[150px] -top-10 -left-10"></div>
      <div className="absolute w-64 h-64 bg-green-500/10 rounded-full blur-[120px] bottom-1/4 right-1/3"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] w-full max-w-[400px] mx-4"
      >
        <div className="text-center mb-10">
          <Terminal className="w-10 h-10 text-green-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Cyber<span className="text-green-500">Enterados</span>
          </h2>
          <div className="h-1 w-20 bg-green-500 mx-auto mt-2 rounded-full opacity-50"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-widest">Comandante ID</label>
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
            <label className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-widest">Security Key</label>
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
            disabled={loading}
            className={`w-full py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 border border-green-500/20 
              ${loading ? 'bg-gray-800 text-gray-500' : 'bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-black'}`}
          >
            {loading ? 'AUTENTICANDO...' : 'INICIAR SECUENCIA'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em]">
             Protocolo Dorothy v3.0 // Marie Core Engaged
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;