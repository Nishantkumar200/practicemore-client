import { combineReducers } from "redux";
import { loginAuth } from "./login";
import { executeCode } from "./executeCode";
import { fetchquestion } from "./fetchquestion";
import { interview } from "./interview";
import { meeting } from "./meeting";
import { session } from "./sessionjoin";
import { register } from "./register";
import { forgotPassword } from "./forgotpassword";
import { resetpassword } from "./resetpassword";


export default combineReducers({
  loginauth: loginAuth,
  registerauth:register,
  interview: interview,
  questionInfo:fetchquestion,
  allMeetings:meeting,
  executeCode,
  joinSession:session,
  forgotPassword,
  resetpassword
  
});
