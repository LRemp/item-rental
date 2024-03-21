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

const createListing = (): ApiRequest => ({
  method: 'POST',
  endpoint: '/api/RentListings/create',
});

export default {
  getListings,
  getListingsByOwner,
  createListing,
  getListingById,
};
