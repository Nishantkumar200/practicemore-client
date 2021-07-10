export const session = (joiningInfo = {}, action) => {
  switch (action.type) {
    case "CONNECT_TO_FRND_REQUEST":
      return { loading: true };

    case "CONNECT_TO_FRND_REQUEST_SUCCESS":
      return { loading: false, joiningInfo: action.payload };
    default:
      return joiningInfo;
  }
};
