import React from "react";
import {Switch, Route} from 'react-router-dom'
import {AuthPage} from "./pages/AuthPage";
import {ClientPage} from "./pages/ClientPage"
import {TrenersPage} from "./pages/TrenersPage"
import {ZanytiyPage} from "./pages/ZanytiyPage";
import {NotAufPage} from "./pages/NotAufPage";
import {AuthContext} from "./context/AuthContext";
import {NoutingPersonalTrenPage} from "./pages/NoutingPersonalTrenPage";
import {ResetPage} from "./pages/ResetPage";
import {ResetPageNewPassword} from "./pages/ResetPageNewPassword";
import {LongingAbonPage} from "./pages/LongingAbonPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import {PayInfo} from "./pages/PayInfo";
import {NoutPage} from "./pages/NoutPage";
import {ChangePage} from "./pages/ChangePage";


//Модуль маршрутизации

export const useRoutes = isAuthenticated => {
    //Страницы доступнаые авторизованному пользователю
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/clientPage" exact>
                    {/*Передача props странице*/}
                    <AuthContext.Consumer>
                        {value =>

                            <ClientPage userId={value.userId} role={value.role}/>
                        }
                    </AuthContext.Consumer>
                </Route>

                <Route path="/trenersPage" exact>
                    <AuthContext.Consumer>
                        {value =>
                            <TrenersPage role={value.role}/>
                        }
                    </AuthContext.Consumer>
                </Route>
                <Route path="/zanytiyPage" exact>
                    <AuthContext.Consumer>
                        {value =>
                            <ZanytiyPage role={value.role}/>
                        }
                    </AuthContext.Consumer>
                </Route>
                <Route path="/noutingpt" exact>
                    <AuthContext.Consumer>
                        {value =>
                            <NoutingPersonalTrenPage userId={value.userId} email={value.email}/>
                        }
                    </AuthContext.Consumer>
                </Route>
                <Route path="/longingabon" exact>
                    <AuthContext.Consumer>
                        {value =>
                            <LongingAbonPage userId={value.userId} role={value.role}/>
                        }
                    </AuthContext.Consumer>
                </Route>
                <Route path="/registration" exact>
                    <AuthContext.Consumer>
                        {value =>
                            <RegistrationPage role={value.role}/>
                        }
                    </AuthContext.Consumer>
                </Route>
                <Route path="/offlinepay" exact>
                    <AuthContext.Consumer>
                        {value =>
                            <PayInfo role={value.role} userId={value.userId}/>
                        }
                    </AuthContext.Consumer>
                </Route>
                <Route path="/nout" exact>
                    <NoutPage/>
                </Route>
                <Route path="/change" exact>
                    <AuthContext.Consumer>
                        {value =>
                            <ChangePage userId={value.userId}/>
                        }
                    </AuthContext.Consumer>
                </Route>
                <Route path="/changepassword" exact>
                    <ResetPage/>
                </Route>
                <Route path="/reset/:token" exact render={(props) => <ResetPageNewPassword {...props}/>}>
                </Route>
            </Switch>
        )
    }
    //Страницы, доступные неавторизованному пользователю
    else {
        return (
            <Switch>
                <Route path="/login" exact>
                    <AuthPage/>
                </Route>
                <Route path="/fitzone" exact>
                    <NotAufPage/>
                </Route>
                <Route path="/resetpassword" exact>
                    <ResetPage/>
                </Route>
                <Route path="/reset/:token" exact render={(props) => <ResetPageNewPassword {...props}/>}>
                </Route>
                <Route path="/" exact>
                    <NotAufPage/>
                </Route>
                <Route path="/registration" exact>
                    <RegistrationPage/>
                </Route>
            </Switch>
        )
    }
}