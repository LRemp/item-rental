const getAll = (): ApiRequest => ({
  method: 'GET',
  endpoint: '/api/Items/Categories',
});

export default {
  getAll,
};
