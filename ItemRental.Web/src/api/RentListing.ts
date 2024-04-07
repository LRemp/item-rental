const getListings = (data?: any): ApiRequest => {
  var endpoint = '/api/Rent/Listings?';
  if (data?.searchArgument) {
    endpoint += 'searchArgument=' + data.searchArgument;
  }
  if (data?.category) {
    endpoint += 'category=' + data.category;
  }
  return {
    method: 'GET',
    endpoint: endpoint,
  };
};

const getListingsByOwner = (): ApiRequest => ({
  method: 'GET',
  endpoint: '/api/Rent/Listings',
});

const getListingById = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Rent/Listings/${id}`,
});

const getBusyDates = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Rent/Listings/${id}/BusyDates`,
});

const create = (data: any): ApiRequest => ({
  method: 'POST',
  endpoint: '/api/Rent/Listings',
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
