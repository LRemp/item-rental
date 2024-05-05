const getListings = (data?: any): ApiRequest => {
  let endpoint = '/api/Listings?';
  if (data?.searchArgument) {
    endpoint += `&searchArgument=${data.searchArgument}`;
  }
  if (data?.category) {
    endpoint += `&category=${data.category}`;
  }
  if (data?.page) {
    endpoint += `&page=${data.page}`;
  }
  return {
    method: 'GET',
    endpoint,
  };
};

const getListingsByOwner = (): ApiRequest => ({
  method: 'GET',
  endpoint: '/api/Listings/getByOwner',
  authenticate: true,
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

const getComments = (id: string): ApiRequest => ({
  method: 'GET',
  endpoint: `/api/Listings/${id}/Comments`,
});

const createComment = (id: string, data: any): ApiRequest => ({
  method: 'POST',
  endpoint: `/api/Listings/${id}/Comments`,
  body: data,
  authenticate: true,
});

const deleteComment = (id: string, commentId: string): ApiRequest => ({
  method: 'DELETE',
  endpoint: `/api/Listings/${id}/Comments/${commentId}`,
  authenticate: true,
});

export default {
  getListings,
  getListingsByOwner,
  create,
  getListingById,
  getBusyDates,
  getComments,
  createComment,
  deleteComment,
};
