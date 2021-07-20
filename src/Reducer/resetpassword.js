export const resetpassword = (message = {}, action) => {
    switch (action.type) {
      case "RESET_PASSWORD_REQUEST":
        return {
          loading: true,
        };
      case "RESET_PASSWORD_REQUEST_SUCCESS":
        return {
          loading: false,
          message: action.payload,
        };
  
      default:
        return message;
    }
  };
  