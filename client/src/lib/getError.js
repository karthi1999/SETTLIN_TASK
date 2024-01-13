export const getError = (error) => {
  const errorMsg = error?.response?.data?.message || error?.response?.data?.document || error?.response?.data?.exception || 'An Error Occured!!';
  return console.log('error', errorMsg);
};
