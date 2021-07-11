import axios from "axios";
import { URL } from "../URL/url";

export const SIGNUP =
  ({ username, email, password, confirmPassword }, history) =>
  async (dispatch) => {
    dispatch({
      type: "REGISTER_USER_REQUEST",
      payload: {
        username,
        email,
        password,
        confirmPassword,
      },
    });

    try {
      const { data } = await axios.post(`${URL}/user/signup`, {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

      //console.log("signup", data);

      dispatch({
        type: "REGISTER_USER_SUCCESS",
        payload: data,
      });
      if (data?.token) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        history.push("/dashboard");
      } else {
        history.push("/signup");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

export const SIGNIN =
  ({ email, password }, history) =>
  async (dispatch) => {
    // console.log(email, password);

    dispatch({ type: "LOGIN_REQUEST", payload: { email, password } });

    try {
      const { data } = await axios.post(`${URL}/user/login`, {
        email,
        password,
      });

      // console.log("login",data)

      dispatch({
        type: "LOGIN_REQUEST_SUCCESS",
        payload: data,
      });

      // if (data?.token) {
      //   localStorage.setItem("userInfo", JSON.stringify(data));
      //   history.push("/dashboard");
      // } else {
      //   history.push("/login");
      // }
    } catch (error) {
      console.log(error.message);
    }
  };

export const Logout = (history) => async (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
  history.push("/login");
};

export const scheduleMeeting =
  (id, language, selectedDate) => async (dispatch) => {
    console.log(id, language, selectedDate);
    dispatch({
      type: "MEETING_REQUEST",
      payload: {
        id,
        language,
        selectedDate,
      },
    });

    try {
      const { data } = await axios.post(`${URL}/user/meeting`, {
        id,
        language,
        selectedDate,
      });

      dispatch({
        type: "MEETING_REQUEST_SUCCESS",
        payload: data,
      });

      console.log("Meeting Data", data);

      localStorage.setItem("meetings", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

// Code for getting question
export const FetchQuestion = (questionId) => async (dispatch) => {
  // console.log("Getting question id ", questionId);
  dispatch({
    type: "QUESTION_FETCH_REQUEST",
    payload: questionId,
  });

  try {
    const { data } = await axios.get(`${URL}/challenge/question/${questionId}`);
    console.log("Question Detail", data);
    dispatch({
      type: "QUESTION_FETCH_REQUEST_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// Find All the meeting

export const findAllMeeting = (id) => async (dispatch) => {
  dispatch({
    type: "FETCH_MEETING_REQUEST",
    payload: id,
  });

  try {
    const { data } = await axios.get(`${URL}/user/allmeeting/${id}`);
    dispatch({
      type: "FETCH_MEETING_REQUEST_SUCCESS",
      payload: data,
    });

    localStorage.setItem("meetings", data);
  } catch (error) {
    console.log(error);
  }
};

export const cancelmeeting = (meetingId, userId) => async (dispatch) => {
  console.log(meetingId, userId);

  dispatch({
    type: "CANCEL_MEETING_REQUEST",
    payload: meetingId,
  });

  try {
    const { data } = await axios.delete(
      `${URL}/user/delete/meeting/${meetingId}/${userId}`
    );

    console.log("Canceled meeting data", data);

    dispatch({
      type: "CANCEL_MEETING_REQUEST_SUCCESS",
      payload: meetingId,
    });
  } catch (error) {
    console.log(error);
  }
};

// Reschedule meeting

export const rescheduleMeeting =
  (userId, meetingId, newRescheduleTime) => async (dispatch) => {
    console.log(userId, meetingId, newRescheduleTime);

    dispatch({
      type: "CANCEL_MEETING_REQUEST",
      payload: meetingId,
    });

    try {
      const { data } = await axios.put(
        `${URL}/user/meeting/reschedule/${userId}/${meetingId}`,
        { newRescheduleTime }
      );

      console.log(data);

      dispatch({
        type: "CANCEL_MEETING_REQUEST_SUCCESS",
        payload: meetingId,
      });
    } catch (error) {
      console.log(error);
    }
  };

// execute code or compile

export const executeProgram = (code, language, input) => async (dispatch) => {
  console.log(code, language, input);

  dispatch({
    type: "EXECUTE_PROGRAM_REQUEST",
    payload: { code, language, input },
  });

  try {
    const { data } = await axios.post(`${URL}/code/executeCode`, {
      code,
      language,
      input,
    });

    dispatch({
      type: "EXECUTE_PROGRAM_REQUEST_SUCCESS",
      payload: data,
    });

    console.log("Executed", data);
  } catch (error) {
    console.log(error);
  }
};

//join the meeting

export const joinMeeting = (mail,meetLink) => async (dispatch) => {
  
  dispatch({
    type: "CONNECT_TO_FRND_REQUEST",
    payload: { mail },
  });


  //  Here I was doing wrong, i was calling asyn function without await
  try {

    const  {data}  = await axios.post(`${URL}/session/join`, { mail,meetLink });

    dispatch({
      type: "CONNECT_TO_FRND_REQUEST_SUCCESS",
      payload: { data },
    });

  
  } catch (error) {
    console.log(error);
  }
};
