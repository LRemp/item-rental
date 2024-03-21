const upload = (images: FormData): ApiRequest => ({
  method: 'POST',
  endpoint: '/api/Image',
  authenticate: true,
  body: images,
});

export default {
  upload,
};
