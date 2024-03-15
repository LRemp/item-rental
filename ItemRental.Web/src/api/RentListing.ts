const getListings = () => ({
  method: 'GET',
  endpoint: '/api/RentListings/get',
});

const getListingsByOwner = () => ({
  method: 'GET',
  endpoint: '/api/RentListings/getByOwner',
});

const getListingById = (id: string) => ({
  method: 'GET',
  endpoint: `/api/RentListings/get/${id}`,
});

const createListing = () => ({
  method: 'POST',
  endpoint: '/api/RentListings/create',
});

export default {
  getListings,
  getListingsByOwner,
  createListing,
  getListingById,
};
