import { useState ,useEffect } from 'react';
import { getProductos } from './services/productosService';
import AgregarProducto from './components/AgregarProducto.jsx';

function App() {
 const [productos, setProductos] = useState([]);

  const cargarProductos = () => {
    getProductos()
      .then(data => setProductos(data))
      .catch(err => console.error(err));
  };

  const [busqueda, setBusqueda] = useState('');
  const [criterio, setCriterio] = useState('todo');

  const productosFiltrados = productos.filter(p => {
  if (criterio === 'todo') {
    return Object.values(p).some(valor =>
      valor.toString().toLowerCase().includes(busqueda.toLowerCase())
    );
  }
    const valor = p[criterio]?.toString().toLowerCase() || '';
    return valor.includes(busqueda.toLowerCase());
  }); 

    useEffect(() => {
    cargarProductos();
  }, []);



return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <AgregarProducto onSuccess={cargarProductos} />
        <div className="flex flex-col md:flex-row md:items-center md:gap-4 mb-6">
          <select
            value={criterio}
            onChange={e => setCriterio(e.target.value)}
            className="border px-3 py-2 rounded w-full md:w-auto"
          >
            <option value="todo">Todo</option>
            <option value="codigo">Codigo</option>
            <option value="nombre">Nombre</option>
            <option value="categoria">Categoria</option>
          </select>

          <input
            type="text"
            placeholder={`Buscar por ${criterio}...`}
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            className="border px-4 py-2 rounded mt-2 md:mt-0 w-full md:w-64"
          />
        </div>        
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Listado de Productos</h1>
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-3">Codigo</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Categoria</th>
              <th className="px-6 py-3">Stock</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((p) => (
              <tr key={p.cedula} className="border-t hover:bg-gray-100">
                <td className="px-6 py-4">{p.codigo}</td>
                <td className="px-6 py-4">{p.nombre}</td>
                <td className="px-6 py-4">{p.categoria}</td>
                <td className="px-6 py-4">{p.stock}</td>
              </tr>
            ))}
            {productos.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-4">
                  No hay productos registradas.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;