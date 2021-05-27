import React, {useContext, useEffect, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LockIcon from '@material-ui/icons/Lock';
import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {useHttp} from "../hooks/http.hook";
import {Link} from "react-router-dom";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {Loader} from "../components/Loader";
import {AlertPass} from "../components/AlertPass";
import Grid from "@material-ui/core/Grid";



const useStyles = makeStyles((theme) => ({
    root: {height: '93vh',},
    paper: {
        marginTop: theme.spacing(8),
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

export const ResetPageNewPassword = (props) => {
    const [id, setId] = useState()
    const [tokenLoader, setTokenLoader] = useState(true)
    const {request, loading} = useHttp();
    const [showPassword, setShowPassword] = useState(false)
    const [pass, setPass] = useState()
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleChangePassword = (event) => {
        setPass(event.target.value)
        console.log("event.target.value", event.target.value)
    };

    const newPass = async () => {
        try {
            const data = await request(`/api/reset/inputpass`, 'POST', {pass})
            console.log("Data", data);

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(async () => {
        try {
            const data = await request(`/api/user/token/${props.match.params.token}`, 'GET')
            console.log("Data", data);
            setId(data.id)

        } catch (e) {
            console.log(e)
        }
        finally {
            setTokenLoader(false)
        }
    }, [])

    const classes = useStyles();
    return (
        <>
            {tokenLoader
                ? <Loader/>
                : !id
                    ?
                    <Grid container component="main" className={classes.root}>
                        <AlertPass/>
                    </Grid>
                    : (
                        <Grid container component="main" className={classes.root}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline/>
                            <div className={classes.paper}>
                                <Avatar className={classes.avatar}>
                                    <LockIcon/>
                                </Avatar>
                                <Typography component="h1" variant="h5">
                                    Восстановление пароля
                                </Typography>
                                <form className={classes.form} noValidate>
                                    <div align="center">
                                        <InputLabel htmlFor="standard-adornment-password">Пароль</InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={showPassword ? 'text' : 'password'}
                                            onChange={handleChangePassword}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                    >
                                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    </div>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className={classes.submit}
                                        onClick={newPass}
                                        component={Link} to="/"
                                    >
                                        Восстановить доступ
                                    </Button>
                                </form>
                            </div>
                        </Container>
                        </Grid>
                    )
            }
        </>
    );
}
