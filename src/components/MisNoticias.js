import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 🎯 Importación clave para navegar
import { Edit, Trash2, Terminal } from 'lucide-react';
import axios from 'axios';

const MisNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 📡 Función táctica para contactar a Marie
  useEffect(() => {
    const obtenerNoticias = async () => {
      try {
        const respuesta = await axios.get('https://cyberenteradosnews.onrender.com/api/noticias');
        setNoticias(respuesta.data);
        setCargando(false);
      } catch (error) {
        console.error("❌ Falla en el radar:", error);
        setCargando(false);
      }
    };

    obtenerNoticias();
  }, []);

  // 💥 PROTOCOLO DE PURGA
  const eliminarRegistro = async (id, titulo) => {
    const confirmar = window.confirm(`⚠️ ADVERTENCIA DE PURGA:\n\n¿Está absolutamente seguro de querer destruir el registro:\n"${titulo}"?\n\nEsta acción es irreversible en Atlas DB.`);
    
    if (confirmar) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://cyberenteradosnews.onrender.com/api/noticias/${id}`, {
          headers: { 'x-auth-token': token }
        });
        setNoticias(noticias.filter(noticia => noticia._id !== id));
        alert('💥 ¡OBJETIVO DESTRUIDO CON ÉXITO!');
      } catch (error) {
        console.error("❌ Error al purgar:", error);
        alert('❌ Falla en el sistema de armas. No se pudo destruir el registro.');
      }
    }
  };

  return (
    <div className="bg-black border border-green-500/30 p-6 rounded-lg shadow-[0_0_15px_rgba(0,255,0,0.1)] font-mono relative z-10">
      
      {/* 🟢 Encabezado Terminal */}
      <div className="flex items-center gap-3 mb-6 border-b border-green-500/30 pb-4">
        <Terminal className="w-8 h-8 text-green-500 animate-pulse" />
        <h2 className="text-2xl font-bold text-green-500 tracking-widest uppercase">
          &gt; ARSENAL_DE_NOTICIAS.exe
        </h2>
      </div>

      {cargando ? (
        <div className="text-green-500 animate-pulse text-lg tracking-widest">
          &gt; Escaneando base de datos Atlas...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-green-400">
            <thead className="bg-green-950/30 border-y border-green-500/30 text-green-300">
              <tr>
                <th className="p-4 font-semibold uppercase tracking-wider">&gt; ID_Ref</th>
                <th className="p-4 font-semibold uppercase tracking-wider">&gt; Titulo</th>
                <th className="p-4 font-semibold uppercase tracking-wider">&gt; Categoría</th>
                <th className="p-4 font-semibold uppercase tracking-wider">&gt; Fecha_Registro</th>
                <th className="p-4 font-semibold uppercase tracking-wider text-center">&gt; Comandos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-green-900/30">
              {noticias.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-green-600/50 uppercase tracking-widest">
                    &gt; No hay registros en el radar.
                  </td>
                </tr>
              ) : (
                noticias.map((noticia, index) => (
                  <tr key={noticia._id} className="hover:bg-green-900/10 transition-colors">
                    <td className="p-4 text-green-600">#{index + 1}</td>
                    <td className="p-4 font-medium text-green-300 max-w-xs truncate" title={noticia.titulo}>
                      {noticia.titulo}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-green-950/50 text-green-400 text-[10px] uppercase border border-green-800 rounded tracking-widest">
                        {noticia.categoria || 'GENERAL'}
                      </span>
                    </td>
                    <td className="p-4 text-green-600">
                      {new Date(noticia.fecha).toLocaleDateString()}
                    </td>
                    <td className="p-4 flex justify-center gap-3">
                      
                      {/* ✏️ Botón Editar (AHORA ACTIVO CON LINK) */}
                      <Link 
                        to={`/panel/editar/${noticia._id}`}
                        className="p-2 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 rounded transition-all border border-transparent hover:border-yellow-500/50" 
                        title="Modificar Registro"
                      >
                        <Edit className="w-5 h-5" />
                      </Link>
                      
                      {/* 💥 Botón Eliminar */}
                      <button 
                        onClick={() => eliminarRegistro(noticia._id, noticia.titulo)}
                        className="p-2 text-red-500 hover:bg-red-900/40 hover:text-red-400 rounded transition-all border border-transparent hover:border-red-500/50 hover:shadow-[0_0_10px_rgba(255,0,0,0.3)]" 
                        title="Purgar Registro"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MisNoticias;