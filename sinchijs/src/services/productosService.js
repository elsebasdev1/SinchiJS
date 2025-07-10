import axios from 'axios';

const API_URL = 'http://localhost:8080/sinchijava/rest/productos';

export const getProductos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    throw error;
  }
};

export const addProducto = async (producto) => {
  try {
    const response = await axios.post(API_URL, producto);
    return response.data;
  } catch (error) {
    console.error('Error al agregar producto:', error);
    throw error;
  }
};

export const updateProducto = async (codigo, productoActualizado) => {
  try {
    const response = await axios.put(`${API_URL}/${codigo}`, productoActualizado);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

export const deleteProducto = async (codigo) => {
  try {
    const response = await axios.delete(`${API_URL}/${codigo}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};