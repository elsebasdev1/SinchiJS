import { useState } from 'react';
import { addProducto } from '../services/productosService.js';
import { toast } from 'react-hot-toast';

function AgregarProducto({ onSuccess }) {
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    categoria: '',
    stock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProducto(formData);
      toast.success('Producto agregado correctamente');
      setFormData({ codigo: '', nombre: '', categoria: '', stock: ''});
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
      toast.error('Error al agregar producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="codigo"
          placeholder="Código"
          value={formData.codigo}
          onChange={handleChange}
          className="border rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="border rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="categoria"
          placeholder="Categoría"
          value={formData.categoria}
          onChange={handleChange}
          className="border rounded px-4 py-2"
          required
        />
        <input
          type="text"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="border rounded px-4 py-2"
          required
        />        
      </div>
      <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Agregar
      </button>
    </form>
  );
}

export default AgregarProducto;