import { useState } from "react";
import {CustomToast} from "../components/custom-toast/CustomToast";
export const useHttp = ()=>{
    const [error,setError] = useState(null)
    const [wait,setWait] = useState(false)
    const {ErrorToast,LoadingToast,SuccessToast} = CustomToast()

    const request = async(url,method="GET",body=null,headers={})=>{
        setWait(true)

        try{
            if(body){
                body = JSON.stringify(body)
                headers["Content-Type"] = "application/json"
            }
            const response = await fetch(url,{method,body,headers})
            const parsedResponse = await response.json()
            if(!response.ok){
                throw new Error(parsedResponse.message || "something went wrong fetching")
            }
            setWait(false)
            return parsedResponse
        }catch(e){
            // setWait(false)
            setError(e.message || "something went wrong fetching")
            throw e
        }
    }
    const clearError = ()=>{setError(null)}
    return {wait, error, request,clearError}
}