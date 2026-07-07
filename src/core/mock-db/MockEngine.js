// Helper para simular latencia de red aleatoria entre 300ms y 600ms
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const getLatency = () => Math.floor(Math.random() * (600 - 300 + 1)) + 300;

export const MockEngine = {
  /**
   * Obtiene todos los registros activos de una tabla.
   * @param {string} key - Clave del localStorage (tabla)
   */
  async getAll(key) {
    await delay(getLatency());
    const data = localStorage.getItem(key);
    if (!data) return [];
    try {
      const parsed = JSON.parse(data);
      // Retornar solo elementos que no estén eliminados lógicamente
      return parsed.filter(item => !item.is_deleted);
    } catch (e) {
      console.error(`Error parsing localStorage key: ${key}`, e);
      return [];
    }
  },

  /**
   * Obtiene un registro por su ID.
   * @param {string} key - Clave del localStorage
   * @param {string} id - ID del registro
   */
  async getById(key, id) {
    await delay(getLatency());
    const data = localStorage.getItem(key);
    if (!data) return null;
    try {
      const parsed = JSON.parse(data);
      const item = parsed.find(item => item.id === id);
      if (item && !item.is_deleted) return item;
      return null;
    } catch (e) {
      console.error(`Error parsing localStorage key: ${key}`, e);
      return null;
    }
  },

  /**
   * Crea un nuevo registro con ID único y metadatos.
   * @param {string} key - Clave del localStorage
   * @param {object} item - Datos del nuevo elemento
   */
  async create(key, item) {
    await delay(getLatency());
    const data = localStorage.getItem(key);
    let list = [];
    if (data) {
      try {
        list = JSON.parse(data);
      } catch (e) {
        console.error(`Error parsing localStorage key: ${key}`, e);
      }
    }
    const prefix = key.replace('erp_', '');
    const newItem = {
      ...item,
      id: `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      is_deleted: false
    };
    list.push(newItem);
    localStorage.setItem(key, JSON.stringify(list));
    return newItem;
  },

  /**
   * Actualiza un registro existente.
   * @param {string} key - Clave del localStorage
   * @param {string} id - ID del registro a actualizar
   * @param {object} updatedFields - Campos a modificar
   */
  async update(key, id, updatedFields) {
    await delay(getLatency());
    const data = localStorage.getItem(key);
    if (!data) throw new Error(`Record with id ${id} not found in ${key}`);
    try {
      const list = JSON.parse(data);
      const index = list.findIndex(item => item.id === id);
      if (index === -1 || list[index].is_deleted) {
        throw new Error(`Record with id ${id} not found in ${key}`);
      }
      const updatedItem = {
        ...list[index],
        ...updatedFields,
        updated_at: new Date().toISOString()
      };
      list[index] = updatedItem;
      localStorage.setItem(key, JSON.stringify(list));
      return updatedItem;
    } catch (e) {
      console.error(`Error updating localStorage key: ${key}`, e);
      throw e;
    }
  },

  /**
   * Eliminación lógica (soft delete) de un registro.
   * @param {string} key - Clave del localStorage
   * @param {string} id - ID del registro a eliminar
   */
  async softDelete(key, id) {
    await delay(getLatency());
    const data = localStorage.getItem(key);
    if (!data) throw new Error(`Record with id ${id} not found in ${key}`);
    try {
      const list = JSON.parse(data);
      const index = list.findIndex(item => item.id === id);
      if (index === -1) {
        throw new Error(`Record with id ${id} not found in ${key}`);
      }
      list[index] = {
        ...list[index],
        is_deleted: true,
        updated_at: new Date().toISOString()
      };
      localStorage.setItem(key, JSON.stringify(list));
      return true;
    } catch (e) {
      console.error(`Error deleting from localStorage key: ${key}`, e);
      throw e;
    }
  }
};
