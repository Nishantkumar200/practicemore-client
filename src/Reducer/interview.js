export const interview = (interview={}, action) => {
  switch (action.type) {
    case "MEETING_REQUEST":
      return { loading: true ,...interview};

    case "MEETING_REQUEST_SUCCESS":

      return { loading: false, ...interview, interview: action.payload };
    default:
      return interview;
  }
};
