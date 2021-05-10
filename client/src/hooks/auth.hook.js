import {useState, useCallback, useEffect} from 'react'


const storageName='userData'
export const useAuth =()=>{
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId]=useState(null)
    const [role, setUserRole]=useState(null)
    const [email, setUserEmail]=useState(null)

    const login = useCallback((jwtToken, id, role, email)=>{
        console.log('token', token)
        setToken(jwtToken)
        setUserId(id)
        setUserRole(role)
        setUserEmail(email)
        console.log('role', role)
        localStorage.setItem(storageName, JSON.stringify({userId: id,token: jwtToken, role: role, email:email}))
    }, [])
    const logout =useCallback(()=>{
        setToken(null)
        setUserId(null)
        setUserRole(null)
        setUserEmail(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem(storageName))

        if (data && data.token){
            login(data.token, data.userId, data.role, data.email)
        }
        setReady(true)
    },[login])

    return {login, logout, token, userId,ready, role, email}
}