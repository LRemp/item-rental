const create = (data: ItemCreateRequest): ApiRequest => ({
  method: 'POST',
  endpoint: '/api/Items/create',
  authenticate: true,
  body: data,
});

export default {
  create,
};
