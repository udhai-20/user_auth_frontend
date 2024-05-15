import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

export const PrivateRoute=({children})=>{
    const isLoading=useSelector((state)=>state?.user?.currentUser);
    console.log('isLoading:', isLoading);
    if(isLoading){
        return children
    }else{
        return <Navigate to="/login" />
    }


}