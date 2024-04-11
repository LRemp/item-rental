const get = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Rent/Orders/${id}/Delivery`,
  authenticate: true,
});

const update = (id: string, data: any): ApiRequest => ({
  method: 'POST',
  endpoint: `/api/Rent/Orders/${id}/Delivery`,
  authenticate: true,
  body: data,
});

export default {
  get,
  update,
};
