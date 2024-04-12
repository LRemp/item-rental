const get = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Orders/${id}/Delivery`,
  authenticate: true,
});

const update = (id: string, data: any): ApiRequest => ({
  method: 'POST',
  endpoint: `/api/Orders/${id}/Delivery`,
  authenticate: true,
  body: data,
});

const confirm = (id: string): ApiRequest => ({
  method: 'POST',
  endpoint: `/api/Orders/${id}/Delivery/Confirm`,
  authenticate: true,
});

export default {
  get,
  update,
  confirm,
};
