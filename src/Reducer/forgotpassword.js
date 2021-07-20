export const forgotPassword = (result = {}, action) => {
  switch (action.type) {
    case "EMAIL_REQUEST":
      return {
        loading: true,
      };
    case "EMAIL_REQUEST_SUCCESS":
      return {
        loading: false,
        result: action.payload,
      };

    default:
      return result;
  }
};
