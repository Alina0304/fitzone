import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage";
import {ClientPage} from "./pages/ClientPage"
import {TrenersPage} from "./pages/TrenersPage"
import {ZanytiyPage} from "./pages/ZanytiyPage";
import {NotAufPage} from "./pages/NotAufPage";
import {AuthContext} from "./context/AuthContext";
import {NoutingPersonalTrenPage} from "./pages/NoutingPersonalTrenPage";


export const useRoutes = isAuthenticated =>{
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/clientPage" exact>
                    <AuthContext.Consumer>
                        {value =>
                            <ClientPage userId={value.userId}/>
                        }
                    </AuthContext.Consumer>
                </Route>
                <Route path="/trenersPage" exact>
                    <TrenersPage />
                </Route>
                <Route path="/zanytiyPage" exact>
                    <ZanytiyPage />
                </Route>
                <Route path="/noutingpt" exact>
                    <AuthContext.Consumer>
                        {value =>
                            <NoutingPersonalTrenPage userId={value.userId}/>
                        }
                        </AuthContext.Consumer>
                </Route>

            </Switch>
        )
    }
    else {
        return (
            <Switch>
                <Route path="/" exact>
                    <AuthPage />
                </Route>
                <Route path="/fitzone" exact>
                    <NotAufPage />
                </Route>


            </Switch>
        )
    }
}