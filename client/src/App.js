import  React from 'react'
import {makeStyles} from '@material-ui/core/styles';
import 'materialize-css'
import {useRoutes} from "./routes";
import {BrowserRouter as Router} from 'react-router-dom'
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import {Loader} from "./components/Loader";
import {Footer} from "./components/Footer";


const useStyles = makeStyles((theme)=>({

    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    Buttons:{
        position: "center"
    },
    title: {
        flexGrow: 1
    },

    mainFeaturesPost: {
        position: "relative",
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        //backgroundImage: "C:\\Users\\Alina\\WebstormProjects\\fittest\\src\\slider-1.jpg",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "centre"

    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundOverlay: "rgba(0,0,0,0,.3)"
    },
    mainFeaturesPostContent: {
        position: "centre",
        padding: theme.spacing(6),
        marginTop: theme.spacing(8)

    },
    cardMedia: {
        paddingTop: "56.25%"
    },
    cardContent: {
        flexGrow: 1
    },
    cardGrid: {
        marginTop: theme.spacing(4)
    }


}))

function App() {
    const {token, login,role, logout, userId,ready}=useAuth()
    console.log(token)
    console.log('role1', role)
    let isAuthenticated = !!token
    console.log(isAuthenticated)
    const routes = useRoutes(isAuthenticated)
    if(!ready)
    {
        return <Loader />
    }
return(
    <AuthContext.Provider value={{token, logout, login, userId, role, isAuthenticated}}>
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