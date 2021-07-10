export const fetchquestion = (questionDetail = {}, action) => {
  //console.log(action.payload);

  switch (action.type) {
    case "QUESTION_FETCH_REQUEST":
      return { loading: true };

    case "QUESTION_FETCH_REQUEST_SUCCESS":
      return {
          loading: false,
        questionDetail: action.payload,
      };

    default:
      return questionDetail;
  }
};
