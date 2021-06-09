import React, {useContext, useEffect, useState} from 'react';
import Paper from "@material-ui/core/Paper";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import Box from '@material-ui/core/Box';
import {makeStyles} from '@material-ui/core/styles';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";
import {AlertPass} from "../components/AlertPass";


//Стили
const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(/img/fitnes_1.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }, paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const AuthPage = () => {
    //подключение контекста
    const auth = useContext(AuthContext)
    const message = useMessage();
    //подключение хука
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])
    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    const classes = useStyles();
    //POST-запрос на регистрацию
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log("Data", data);

        } catch (e) {

        }
    }
    //POST-запрос на авторизацию
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId, data.role, data.email)
        } catch (e) {

        }
    }
    //Отображение страницы
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline/>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>

                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Инстинкт быть первым
                    </Typography>

                    <form className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Электронная почта"
                            name="email"
                            autoFocus

                            onChange={changeHandler}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            id="password"

                            onChange={changeHandler}
                        />
                        {auth.token == null ? (<Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={loading}
                                onClick={loginHandler}
                                component={Link} to="/message"
                            >
                                Войти
                            </Button>) :
                            (<Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={loading}
                                onClick={loginHandler}
                                component={Link} to="/trenersPage"
                            >
                                Войти
                            </Button>)
                        }
                        <Grid container>
                            <Grid item xs>
                                <Button
                                    component={Link} to="/resetpassword" variant="body2">
                                    Забыли пароль?
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    component={Link} to="/registration"
                                    variant="body2"
                                    onClick={registerHandler}
                                    disabled={loading}>
                                    "Нет учетной записи? Регистрация"
                                </Button>
                            </Grid>
                        </Grid>
                        <Box mt={5}>

                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}