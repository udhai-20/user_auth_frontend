import axios from "axios"
import { getUserFailure, getUserStart, getUserSuccess, loginFailure, loginStart, loginSuccess,logout,registerFailure,registerStart, registerSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "../../Feature/UserSlice/user-slice"

export const LoginAction = async (payload ,dispatch) => {
    try{
      dispatch(loginStart())
        const res=await axios.post("https://voosh-food-backend-assignemn.onrender.com/api/v1/auth/login", payload,{ withCredentials: true });
        // console.log('res:', res);
        dispatch(loginSuccess(res?.data?.data));
    }catch(error){
        dispatch(loginFailure(error))
        alert(error?.response?.data?.message||"Something went wrong")
    }
}


export const RegisterAction = async (payload ,dispatch) => {
    try{
      dispatch(registerStart())
        const res=await axios.post("https://voosh-food-backend-assignemn.onrender.com/api/v1/user", payload);
        console.log('res:', res);
        dispatch(registerSuccess());
    }catch(error){
        dispatch(registerFailure(error));
        alert(error?.response?.data?.message||"Something went wrong")
    }
}


export const getAllUsers = async (dispatch,navigate,userId) => {
    try{
      dispatch(getUserStart())
     await getSingleUser(userId,dispatch)
        const res=await axios.get("https://voosh-food-backend-assignemn.onrender.com/api/v1/user",{ withCredentials: true });
        console.log('res:', res.data);
     
        //   const getUserAllDetails= res.data.filter((user)=>user._id===userId)
        
        // console.log('getUserAllDetails:', getUserAllDetails)
        // dispatch(loginSuccess(getUserAllDetails))
        dispatch(getUserSuccess(res.data));
    }catch(error){
        dispatch(getUserFailure(error));
        
        alert(error?.response?.data?.message||"Something went wrong")

        if(error?.response?.data?.statusCode===401){
            dispatch(logout())
           return  navigate("/login");
        }
    }
}


export const profileUpload = async (payload ,dispatch) => {
    try{
      // dispatch(loginStart())
      const formData = new FormData();
    formData.append('file', payload); // Assuming payload.profilePicture is the file object

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true, // Send cookies along with the request if using authentication
    };
        const res=await axios.post("https://voosh-food-backend-assignemn.onrender.com/api/v1/user/upload", formData,
        config);
        console.log('res:', res.data);
        return res.data;
        // dispatch(loginSuccess(res?.data?.data));
    }catch(error){
        // dispatch(loginFailure(error))
        alert(error?.response?.data?.message||"Something went wrong")
    }
}


export const logoutAction = async (dispatch) => {
    try{
      // dispatch(loginStart())
        const res=await axios.get("https://voosh-food-backend-assignemn.onrender.com/api/v1/auth/logout",{ withCredentials: true });
        console.log('res:', res);
        // dispatch(loginSuccess(res?.data?.data));
        dispatch(logout());
    }catch(error){
        // dispatch(loginFailure(error))
        alert(error?.response?.data?.message||"Something went wrong")
    }
}


export const updateUser = async (benId,payload ,dispatch) => {

    try{
        const { password, ...restPayload } = payload;
        const requestBody = password ? { ...restPayload, password } : { ...restPayload };
      dispatch(updateUserStart())
        const res=await axios.patch(`https://voosh-food-backend-assignemn.onrender.com/api/v1/user/${benId}`, requestBody,{ withCredentials: true });
        console.log('res:', res);

        dispatch(updateUserSuccess(res?.data));
    }catch(error){
        dispatch(updateUserFailure(error))
        alert(error?.response?.data?.message||"Something went wrong")
    }
}


const getSingleUser=async(userId,dispatch)=>{
    
    try{
        
        const res=await axios.get(`https://voosh-food-backend-assignemn.onrender.com/api/v1/user/${userId}`,{ withCredentials: true });
        console.log('res:--------', res);
        dispatch(loginSuccess(res?.data));


    }catch(error){
        alert(error?.response?.data?.message||"Something went wrong")
    }
}

