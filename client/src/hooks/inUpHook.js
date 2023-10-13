import {useCallback, useEffect, useState} from "react"

const secret_key = "dontcopylol"
export const useAuth = ()=>{
    const [token,setToken] = useState(null)
    const [userId,setUserId] = useState(null)
    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(
            secret_key,
            JSON.stringify({
                userId: id,
                token: jwtToken,
            })
        );
    }, []);
    const logout = ()=>{
        setToken(null)
        setUserId(null)
        localStorage.removeItem(secret_key)
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(secret_key))
        if(data && data.token){
            login(data.token,data.userId)
        }
    }, [login]);

    return {login,logout,token,userId}
}