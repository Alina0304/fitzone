import {useState, useCallback, useEffect} from 'react'


const storageName='userData'
export const useAuth =()=>{
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId]=useState(null)
    const [role, setUserRole]=useState(null)

    const login = useCallback((jwtToken, id, role)=>{
        console.log('token', token)
        setToken(jwtToken)
        setUserId(id)
        setUserRole(role)
        console.log('role', role)
        localStorage.setItem(storageName, JSON.stringify({userId: id,token: jwtToken, role: role}))
    }, [])
    const logout =useCallback(()=>{
        setToken(null)
        setUserId(null)
        setUserRole(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem(storageName))

        if (data && data.token){
            login(data.token, data.userId, data.role)
        }
        setReady(true)
    },[login])

    return {login, logout, token, userId,ready, role}
}