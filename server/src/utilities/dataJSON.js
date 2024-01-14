const dataJSON = (statusCode, desc, msg, response) => {
  return {
    status: {
      code: statusCode,
      description: desc,
      message: msg
    },
    data: response || null
  };
};

export default dataJSON;
