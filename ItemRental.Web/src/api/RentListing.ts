const getListings = (data?: any): ApiRequest => {
  var endpoint = '/api/Listings?';
  if (data?.searchArgument) {
    endpoint += 'searchArgument=' + data.searchArgument;
  }
  if (data?.category) {
    endpoint += 'category=' + data.category;
  }
  if (data?.page) {
    endpoint += 'page=' + data.page;
  }
  return {
    method: 'GET',
    endpoint: endpoint,
  };
};

const getListingsByOwner = (): ApiRequest => ({
  method: 'GET',
  endpoint: '/api/Listings',
});

const getListingById = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Listings/${id}`,
});

const getBusyDates = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Listings/${id}/BusyDates`,
});

const create = (data: any): ApiRequest => ({
  method: 'POST',
  endpoint: '/api/Listings',
  body: data,
  authenticate: true,
});

export default {
  getListings,
  getListingsByOwner,
  create,
  getListingById,
  getBusyDates,
};
