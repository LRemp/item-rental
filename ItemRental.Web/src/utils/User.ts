const HasRole = (token: string, role: string): boolean => {
  let str = token.split('.')[1];
  str = str.replace(/-/g, '+').replace(/_/g, '/');

  const paddingLength = str.length % 4;
  if (paddingLength) {
    str += '='.repeat(4 - paddingLength);
  }
  const decodedPayload = atob(str);
  const payloadObject = JSON.parse(decodedPayload);

  const { roles } = payloadObject;
  console.log(payloadObject);
  return roles.includes(role);
};

export { HasRole };
