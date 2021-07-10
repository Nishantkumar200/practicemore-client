
export const register = (userSignup ={},action) =>{

    switch(action.type){

        case "REGISTER_USER_REQUEST":
            return { loading: true };
      
          case "REGISTER_USER_SUCCESS":
            return { loading: false, userSignup: action.payload };

            default: return userSignup;
      
    }
}