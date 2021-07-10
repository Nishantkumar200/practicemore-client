export const meeting = (usermeetings = [], action) => {
  switch (action.type) {
    case "FETCH_MEETING_REQUEST":
      return { loading: true };
    case "FETCH_MEETING_REQUEST_SUCCESS":
      return {  usermeetings: action.payload, loading: false };

    case "CANCEL_MEETING_REQUEST":
      return { loading: true };

    case "CANCEL_MEETING_REQUEST_SUCCESS":
      return {
        loading: false,
      };

    default:
      return { usermeetings };
  }
};
