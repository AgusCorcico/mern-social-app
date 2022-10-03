import axios from "axios";

export const loginCall = async (userCredencial,dispatch) => {
    dispatch({type:"LOGIN_START"});
    try{
        const res = await axios.post("/auth/login", userCredencial);
        dispatch({type:"LOGIN_SUCCESS", payload:res.data})
    }catch(err){
        dispatch({type:"LOGIN_FAILURE", payload: err})
    }
}