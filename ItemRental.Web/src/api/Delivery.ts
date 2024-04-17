const get = (id: string, role?: number): ApiRequest => {
  var endpoint = `/api/Orders/${id}/Delivery?`;
  if (role != undefined) {
    endpoint += `role=${role}`;
  }
  return {
    method: 'GET',
    endpoint: endpoint,
    authenticate: true,
  };
};

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
