const create = (data: ItemCreateRequest): ApiRequest => ({
  method: 'POST',
  endpoint: '/api/Items',
  authenticate: true,
  body: data,
});

const getAll = (): ApiRequest => ({
  method: 'GET',
  endpoint: '/api/Items/',
  authenticate: true,
});

const get = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Items/${id}`,
  authenticate: true,
});

const deleteItem = (id: string): ApiRequest => ({
  method: 'DELETE',
  endpoint: `/api/Items/${id}`,
  authenticate: true,
});

export default {
  getAll,
  get,
  create,
  deleteItem,
};
