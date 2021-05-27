import React, {useEffect} from 'react'
import 'materialize-css'
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";
import {Footer} from "./components/Footer";



function App() {
    //Изменение стандартного заголовка на FtZone
    useEffect(() =>{
        document.title = "FitZone"
    },[])

    const {token, login,role, logout, userId,ready, email}=useAuth()
    let isAuthenticated = !!token
    //Подключнеие маршрутов
    const routes = useRoutes(isAuthenticated)
    if(!ready)
    {
        return <Loader />
    }
    return(
        // Старт приложения
    <AuthContext.Provider value={{token, logout, login, userId, role, isAuthenticated, email}}>
    <Router>
        {isAuthenticated && <Navbar/>}
        <div className='container'>
            {routes}
        </div>
        <Footer/>
    </Router>
    </AuthContext.Provider>

)
}
export default App