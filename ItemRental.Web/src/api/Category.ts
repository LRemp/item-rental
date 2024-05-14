const getAll = (): ApiRequest => ({
  method: 'GET',
  endpoint: '/api/Items/Categories',
});

const create = (data: any): ApiRequest => ({
  method: 'POST',
  endpoint: '/api/Items/Categories',
  authenticate: true,
  body: data,
});

const update = (id: string, data: any): ApiRequest => ({
  method: 'PUT',
  endpoint: `/api/Items/Categories/${id}`,
  authenticate: true,
  body: data,
});

const remove = (id: string): ApiRequest => ({
  method: 'DELETE',
  endpoint: `/api/Items/Categories/${id}`,
  authenticate: true,
});

export default {
  getAll,
  create,
  update,
  remove,
};
