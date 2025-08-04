import api from '../axios';

export const fetchInventory = () => {
  return api.get('/materails');
};

export const createInventoryItem = (data) => {
  return api.post('/inventory', data);
};

export const updateInventoryItem = (id, data) => {
  return api.put(`/inventory/${id}`, data);
};

export const deleteInventoryItem = (id) => {
  return api.delete(`/inventory/${id}`);
};
