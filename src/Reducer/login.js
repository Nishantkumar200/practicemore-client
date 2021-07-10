export const loginAuth = (user = {}, action) => {
  
  switch (action.type) {
   
    case "LOGIN_REQUEST":
      return { loading: true };

    case "LOGIN_REQUEST_SUCCESS":
      // Storing the Data into the localstorage
       localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return { loading: false, userInfo: action.payload };

    case "LOGOUT":
      localStorage.removeItem('userInfo');
      return {userInfo:{}}
    default:
      return user;
  }
};
