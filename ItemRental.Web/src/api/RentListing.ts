const getListings = (): ApiRequest => ({
  method: 'GET',
  endpoint: '/api/RentListings/get',
});

const getListingsByOwner = (): ApiRequest => ({
  method: 'GET',
  endpoint: '/api/RentListings/getByOwner',
});

const getListingById = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/RentListings/get/${id}`,
});

const create = (data: any): ApiRequest => ({
  method: 'POST',
  endpoint: '/api/RentListings/create',
  body: data,
  authenticate: true,
});

export default {
  getListings,
  getListingsByOwner,
  create,
  getListingById,
};
